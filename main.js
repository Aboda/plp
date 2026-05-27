const fs = require("fs");
const https = require("https");

let environment

try {
  environment = fs.readFileSync("./din/environment.txt", "utf8");
  environment = "prod";
  console.log("loaded gvss supra router");
} catch (error) {
  environment = "dev";
  console.log("loaded demian supra router");
}

console.log("assigned env", { environment });

let suprarouter

if (environment == "prod") {
  suprarouter = require("./install/gvss/suprarouter.js");
  console.log("loaded production router");
} else {
  suprarouter = require("./install/demian/suprarouter.js");
  console.log("loaded development router");
}

console.log("supra router loaded tools", console.log(Object.keys(suprarouter)));

async function main() {
  const tls_path = String(await fs.promises.readFile("./din/tls_path.txt")).trim();
  const opts = {
    key: await fs.promises.readFile(tls_path + "/privkey.pem"),
    cert: await fs.promises.readFile(tls_path + "/fullchain.pem"),
    maxCachedSessions: 10,
    keepAliveTimeout: 10000,
    headersTimeout: 3000,
    maxHeadersCount: 15,
    requestTimeout: 240000,
    timeout: 0,
  };
  const server = https.createServer(opts, async (req, res) => {
    try {
      console.log("serving",req.url);
      await suprarouter(req, res, environment);
    } catch (err) {
      console.error("Serve catch", err);
    }
  });
  server.listen(443);
}
main();
