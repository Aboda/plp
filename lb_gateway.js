/*
  lb_gateway.js — the reception layer between the load balancer and the
  suprarouter. Zero third-party dependencies, per the Compute Engine tier rule.

  WHY THIS FILE EXISTS. The Global External ALB now fronts the four subdomains
  and forwards them to a plain-HTTP listener on the internal IP. That listener
  is a different trust context from the direct 443 listener:

    - On the LB port, req.socket.remoteAddress is a Google front end, identical
      for every caller. The real client is inside X-Forwarded-For.
    - On the direct port, X-Forwarded-For is client-forgeable junk and
      remoteAddress IS the client.

  Mixing those two up is how an IP throttle gets bypassed or collapses into a
  single bucket. So the trust decision is made exactly once, here, at the edge,
  and everything downstream reads the result from req.gvss instead of touching
  the socket or the headers again.

  WHAT IT DOES, in order, for every request:
    1. Answers gateway-owned paths (/healthz) before any routing.
    2. On the LB port, rejects sources that are not Google front ends or
       loopback — the firewall already enforces this at the VPC edge; this is
       the belt to that braces, and it is what makes trusting X-Forwarded-For
       sound rather than hopeful.
    3. Annotates req.gvss = { via_lb, client_ip, scheme, host }.
    4. Delegates to the suprarouter, with a guaranteed 500 close on a thrown
       error (the previous top-level catch logged the error but never ended the
       response, so the client hung until timeout).

  DOWNSTREAM CONTRACT. Any code that keys on client identity — throttling,
  call_report logging, session auditing — should prefer req.gvss.client_ip
  when present. req.gvss.via_lb distinguishes the path taken. The gvss
  router's existing behaviour is unchanged until it opts in.

  GOOGLE FRONT END SOURCE RANGES. Health probes and proxied data-plane
  connections for a global external ALB both originate from these two blocks.
  They are Google-published constants, not project configuration:
      130.211.0.0/22   35.191.0.0/16
*/

const GFE_RANGES = [
  { base: ip4_to_int("130.211.0.0"), bits: 22 },
  { base: ip4_to_int("35.191.0.0"), bits: 16 },
];

// -------------------------- address helpers ----------------------------------

function ip4_to_int(ip) {
  const p = ip.split(".");
  if (p.length !== 4) return null;
  let n = 0;
  for (const part of p) {
    const v = Number(part);
    if (!Number.isInteger(v) || v < 0 || v > 255) return null;
    n = n * 256 + v;
  }
  return n;
}

/*
  Node reports IPv4 peers on a dual-stack socket as IPv4-mapped IPv6
  ("::ffff:130.211.0.9"). Normalize to the dotted form so one code path
  handles both.
*/
function normalize_ip(addr) {
  if (!addr) return "";
  if (addr.startsWith("::ffff:")) return addr.slice(7);
  return addr;
}

function is_loopback(addr) {
  const a = normalize_ip(addr);
  return a === "::1" || a.startsWith("127.");
}

function is_gfe_source(addr) {
  const n = ip4_to_int(normalize_ip(addr));
  if (n === null) return false;
  for (const r of GFE_RANGES) {
    const shift = 32 - r.bits;
    // >>> forces unsigned 32-bit arithmetic; plain >> corrupts high addresses.
    if (n >>> shift === r.base >>> shift) return true;
  }
  return false;
}

// --------------------------- client identity ---------------------------------

/*
  The ALB appends ", <client-ip>, <lb-ip>" to whatever X-Forwarded-For the
  client supplied. The real client is therefore the SECOND-TO-LAST entry.
  The first entries are attacker-controlled and must never be used.
*/
function client_ip_from_xff(xff_header) {
  if (!xff_header) return "";
  const parts = String(xff_header)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) return normalize_ip(parts[parts.length - 2]);
  if (parts.length === 1) return normalize_ip(parts[0]);
  return "";
}

/*
  Builds the annotation for one request. via_lb is decided by which local port
  the connection arrived on — the one fact a client cannot influence.
*/
function annotate(req, internal_port) {
  const via_lb = req.socket.localPort === internal_port;
  let client_ip;
  let scheme;

  if (via_lb) {
    client_ip =
      client_ip_from_xff(req.headers["x-forwarded-for"]) ||
      normalize_ip(req.socket.remoteAddress);
    // The browser-to-LB leg is always TLS; the header states it explicitly.
    scheme = String(req.headers["x-forwarded-proto"] || "https");
  } else {
    // Direct listener: the socket is the truth, forwarded headers are junk.
    client_ip = normalize_ip(req.socket.remoteAddress);
    scheme = "https";
  }

  req.gvss = {
    via_lb,
    client_ip,
    scheme,
    host: String(req.headers.host || ""),
  };
  return req.gvss;
}

// --------------------------- gateway-owned paths -----------------------------

/*
  Paths answered at the gateway on the INTERNAL listener only, after the
  source gate, before the suprarouter ever sees the request. Keep these CHEAP: /healthz runs every few seconds from several Google probers
  at once, forever. No filesystem reads, no bucket calls, no logging per hit —
  probe chatter is exactly what the signal-only logging discipline excludes.

  Attach future internal endpoints here rather than in main.js; this table is
  the allowlist for the reception layer, the same way application_paths is the
  allowlist for the gvss application.
*/
const gateway_paths = {
  "/healthz": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
  },
};

// ------------------------------- the wrapper ---------------------------------

/*
  wrap(suprarouter, environment, { internal_port }) -> request handler shared
  by both listeners. main.js stays a bootstrap; the per-request policy lives
  here.
*/
function wrap(suprarouter, environment, options) {
  const internal_port = options && options.internal_port;
  if (!Number.isInteger(internal_port)) {
    throw new Error("lb_gateway.wrap: options.internal_port is required");
  }

  return async function gateway_handler(req, res) {
    try {
      const pathname = String(req.url || "/").split("?")[0];
      const info = annotate(req, internal_port);

      // 1. The LB port accepts Google front ends and loopback (local curl,
      //    the SSH verification probe) and NOTHING else — not even /healthz.
      //    The firewall already guarantees this from outside the VPC; this
      //    closes the inside, and it runs before anything answers so the
      //    policy has no exceptions to reason about.
      if (info.via_lb) {
        const peer = req.socket.remoteAddress;
        if (!is_gfe_source(peer) && !is_loopback(peer)) {
          console.warn("lb port rejected non-GFE source", {
            peer: normalize_ip(peer),
            url: req.url,
          });
          res.writeHead(403, { "Content-Type": "text/plain" });
          res.end("Forbidden");
          return;
        }
      }

      // 2. Gateway-owned paths are INTERNAL-listener-only: they are the
      //    reception layer's endpoints, not the application's. On the direct
      //    443 listener the same path falls through to the suprarouter and
      //    404s like any other unknown route — the public surface is
      //    unchanged by this file.
      if (info.via_lb) {
        const owned = gateway_paths[pathname];
        if (owned) {
          owned(req, res);
          return;
        }
      }

      console.log("serving", req.url, {
        via_lb: info.via_lb,
        client: info.client_ip,
        host: info.host,
      });

      // 3. Same suprarouter, both listeners. Host-based dispatch stays inside
      //    it — one file decides what each hostname means.
      await suprarouter(req, res, environment);

      // 4. A router branch that matched nothing and returned without replying
      //    would otherwise hang the client until the LB's timeout.
      if (!res.headersSent) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
      }
    } catch (err) {
      console.error("Serve catch", err);
      // The old catch logged and left the response open; the client then hung
      // for the full timeout. Always close.
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal error");
      } else {
        res.end();
      }
    }
  };
}

module.exports = {
  wrap,
  annotate,
  is_gfe_source,
  is_loopback,
  normalize_ip,
  client_ip_from_xff,
  gateway_paths,
};
