const infra = require("../../utilities/infra.js");
const path = require("path");
const metadata = [
  {
    desc: "Inventory Management Tool",
    service_type: "application",
    service_name: "gvss",
    serve_as: "gvssgroup.com",
    source_folder: "../../din/gvss",
  }
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

async function suprarouter(req, res, env) {
  let call_report = infra.gate_guard(req);
  call_report.env = env;
  if (!call_report.a) {
    infra.reply_request_throttled(req, res);
    return;
  }
  let host;
  try {
    host = req.headers.host.split(":")[0]; // remove port if any
  } catch (e) {
    host = "";
  }
  call_report.host = host;
  if (host in apps) {
    try {
      await apps[host].router(req, res, infra, call_report);
    } catch (err) {
      console.error("Application router error", host, err);
    }
    console.log(JSON.stringify(call_report));
  } else {
    /*
      This patches the calls that come from a subdomain for gvss
    */
    let is_gvssgroup_subdomain = false;
    const split_host = host.split(".")
    const domain_check = split_host[split_host.length - 2] + "." + split_host[split_host.length - 1]
    if (domain_check == "gvssgroup.com") {
      is_gvssgroup_subdomain = true;
    }
    if (is_gvssgroup_subdomain) {
      try {
        await apps["gvssgroup.com"].router(req, res, infra, call_report);
      } catch (err) {
        console.error("Application router error", host, err);
      }
      console.log(JSON.stringify(call_report));
    } else {
      call_report.reply_code = "404";
      call_report.served = true;
      infra.reply_resource_not_found(req, res);
    }
  }
}

module.exports = suprarouter;
