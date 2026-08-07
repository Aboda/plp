const fs = require("fs");
const http = require("http");
const https = require("https");
const lb_gateway = require("./lb_gateway.js");

/*
  Two listeners, one process, one suprarouter:

    :8080  plain HTTP, internal — the load balancer's origin. The firewall
           admits only Google front-end ranges; lb_gateway re-checks in-app.
           Starts UNCONDITIONALLY: the LB path must never depend on TLS files.
    :443   TLS, internet-facing — serves the apex directly, exactly as before.
           Starts best-effort: a certbot failure now degrades the apex instead
           of killing the process (and the LB path with it).

  A second process was considered and rejected: the in-memory state downstream
  (search indexes, embeddings, mtime caches, debounce timers) would either
  duplicate — the e2-micro does not have the RAM to hold it twice — or need
  IPC, which is a lot of machinery to avoid ten lines of http.createServer.
  Same process, same handler, different trust context per port; the trust
  decision lives in lb_gateway.js.
*/

const INTERNAL_PORT = 8080; // matches CE_PORT in subdomains/scripts/lib/common.sh
const DIRECT_PORT = 443;

/*
  Environment selection is EXISTENCE-based, exactly as it always was: a
  readable ./din/environment.txt selects prod. The file's content is logged
  for visibility but deliberately NOT authoritative — the previous code
  overwrote the read value with "prod" unconditionally, so no deployment ever
  depended on the content, and making it authoritative now would be a silent
  behaviour change on the live box. If content should govern one day, this is
  the block to change, on purpose.
*/
let environment;
try {
  const marker = fs.readFileSync("./din/environment.txt", "utf8").trim();
  environment = "prod";
  console.log("loaded gvss supra router", { marker });
} catch (error) {
  environment = "dev";
  console.log("loaded demian supra router");
}

console.log("assigned env", { environment });

let suprarouter;

if (environment == "prod") {
  suprarouter = require("./install/gvss/suprarouter.js");
  console.log("loaded production router");
} else {
  suprarouter = require("./install/demian/suprarouter.js");
  console.log("loaded development router");
}

const handler = lb_gateway.wrap(suprarouter, environment, {
  internal_port: INTERNAL_PORT,
});

/*
  Timeout tuning is per listener because the peers are different animals.

  The previous options object set these as https.createServer options, where
  most of them are silently ignored (they are server PROPERTIES, and
  maxCachedSessions is a client-side Agent option with no server meaning) —
  so the process has been running on Node defaults all along. Assigning the
  properties after creation is what actually takes effect.

  INTERNAL listener — the peer is the Google front end:
    keepAliveTimeout 620s   The GFE holds idle connections to the origin for
                            up to ~10 minutes and reuses them. If Node closes
                            an idle socket first (default: 5s!) the GFE can
                            write a request into a closing socket → sporadic
                            502 backend_connection_closed_before_data_sent.
                            The origin must outlast the LB: 620s > 600s.
    headersTimeout   625s   Must exceed keepAliveTimeout — on Node versions
                            where the headers timer spans the keep-alive gap,
                            a smaller value kills idle sockets early, which is
                            the same 502 by another route. Slow-header abuse
                            is not a concern here: only the GFE (which buffers
                            complete headers) and loopback can reach the port.
    requestTimeout     0    The LB is the timeout authority on this path — it
                            gives up at the backend service's 120s. A second,
                            shorter server-side clock would just race it.

  DIRECT listener — the peer is any browser on the internet:
    keepAliveTimeout  10s   The original intent (was set, never applied).
    headersTimeout    15s   Above keepAliveTimeout; tight is fine facing
                            browsers.
    requestTimeout   240s   The original intent, now actually in effect.

  maxHeadersCount: the previous value of 15 was never applied — and would
  break behind the LB if it were, since the ALB adds X-Forwarded-For,
  X-Forwarded-Proto, X-Cloud-Trace-Context and Via on top of a browser's
  usual dozen. 64 is roomy without being the 2000 default.
*/
function tune(server, opts) {
  server.keepAliveTimeout = opts.keep_alive;
  server.headersTimeout = opts.headers;
  server.requestTimeout = opts.request;
  server.maxHeadersCount = 64;
}

function start_internal() {
  const server = http.createServer(handler);
  tune(server, { keep_alive: 620000, headers: 625000, request: 0 });
  server.on("error", (err) => {
    console.error("internal listener error — LB path is DOWN", err.message);
  });
  // 0.0.0.0, not the internal IP literal: the firewall is the admission
  // control (GFE ranges only from outside), lb_gateway re-checks inside, and
  // loopback stays reachable for local curl and the SSH verification probe.
  server.listen(INTERNAL_PORT, "0.0.0.0", () => {
    console.log("internal listener up", { port: INTERNAL_PORT });
  });
  return server;
}

async function start_direct() {
  try {
    const tls_path = String(
      await fs.promises.readFile("./din/tls_path.txt"),
    ).trim();
    const opts = {
      key: await fs.promises.readFile(tls_path + "/privkey.pem"),
      cert: await fs.promises.readFile(tls_path + "/fullchain.pem"),
    };
    const server = https.createServer(opts, handler);
    tune(server, { keep_alive: 10000, headers: 15000, request: 240000 });
    server.on("error", (err) => {
      console.error("direct listener error — apex is dark, LB path unaffected", err.message);
    });
    server.listen(DIRECT_PORT, () => {
      console.log("direct listener up", { port: DIRECT_PORT });
    });
    return server;
  } catch (err) {
    // Do not take the process down: certbot trouble now costs the apex only,
    // while the four subdomains keep serving through the LB on :8080.
    console.error(
      "direct 443 listener NOT started — apex is dark, LB path unaffected",
      err.message,
    );
    return null;
  }
}

process.on("unhandledRejection", (reason) => {
  console.error(
    "Unhandled promise rejection:",
    reason && reason.message ? reason.message : reason,
  );
});

start_internal();
start_direct();
