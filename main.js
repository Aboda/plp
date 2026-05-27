const fs = require("fs").promises;
const https = require("https");
let suprarouter
let environment

try {
  suprarouter = require("./din/suprarouter.js");
  console.log("loaded supra router from din");
  environment = "prod";
} catch (error) {
  console.log(error.message, error.stack);
  suprarouter = require("./utilities/suprarouter.js");
  console.log("loaded supra router from base")
  environment = "dev";
}

async function main() {
  const tls_path = String(await fs.readFile("./din/tls_path.txt")).trim();
  const opts = {
    key: await fs.readFile(tls_path + "/privkey.pem"),
    cert: await fs.readFile(tls_path + "/fullchain.pem"),
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
