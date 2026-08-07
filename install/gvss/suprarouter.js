const infra = require("../../utilities/infra.js");
const path = require("path");

const metadata = [
  {
    desc: "Inventory Management Tool",
    service_type: "application",
    service_name: "gvss",
    serve_as: "gvssgroup.com",
    source_folder: "../../din/gvss",
  },
];

let apps = {};
for (let app of metadata) {
  try {
    const router_path = path.join(__dirname, app.source_folder, "router.js");
    apps[app.serve_as] = require(router_path);
  } catch (e) {
    console.error("No router found for " + app.serve_as, e);
    apps[app.serve_as] = { router: infra.default_router };
  }
}

/*
  Resolves the Host header to an application, or null.

  Exact matches first. Anything whose last two labels are gvssgroup.com falls
  through to the gvss application — cdn/app/auth/api and the apex all share one
  path table by design (the load balancer forwards every host to this origin
  with no per-host routing of its own; keeping the host decision here means one
  file to read). Hosts are lowercased first: browsers send lowercase, but curl
  and scripts are free not to, and `host in apps` is case-sensitive.
*/
function resolve_app(host) {
  if (host in apps) {
    return apps[host];
  }
  const domain_check = host.split(".").slice(-2).join(".");
  if (domain_check == "gvssgroup.com") {
    return apps["gvssgroup.com"];
  }
  return null;
}

async function suprarouter(req, res, env) {
  let call_report = infra.gate_guard(req);
  call_report.env = env;

  /*
    lb_gateway.js (main.js's reception layer) annotates every request with the
    trust decision made at the edge: which listener it arrived on, the real
    client behind the load balancer, and the original scheme. Fold that into
    call_report so the per-request log line carries the actual client instead
    of a Google front-end address. The guard keeps this file working on a box
    still running the pre-gateway main.js, where req.gvss does not exist.

    NOTE the ordering: gate_guard has already run against this same req, so
    once infra keys its throttle on req.gvss.client_ip (see the one-line
    contract in utilities/infra.js), nothing here needs to change again.
  */
  if (req.gvss) {
    call_report.client_ip = req.gvss.client_ip;
    call_report.via_lb = req.gvss.via_lb;
    call_report.scheme = req.gvss.scheme;
  }

  if (!call_report.a) {
    infra.reply_request_throttled(req, res);
    return;
  }

  let host;
  try {
    host = req.headers.host.split(":")[0].toLowerCase(); // remove port if any
  } catch (e) {
    host = "";
  }
  call_report.host = host;

  const app = resolve_app(host);

  if (!app) {
    call_report.reply_code = "404";
    call_report.served = true;
    infra.reply_resource_not_found(req, res);
    return;
  }

  try {
    await app.router(req, res, infra, call_report);
  } catch (err) {
    console.error("Application router error", host, err);
    /*
      The previous version logged and returned here, leaving the response
      open — the client then hung until a timeout somewhere closed it (and
      behind the load balancer, that shows up as a slow 502 rather than a
      clean error). Always close: 500 if nothing was sent yet, a bare end()
      if the router died mid-stream.
    */
    call_report.reply_code = 500;
    call_report.served = true;
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal error");
    } else {
      res.end();
    }
  }
  console.log(JSON.stringify(call_report));
}

module.exports = suprarouter;
