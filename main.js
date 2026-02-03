const fs = require("fs").promises;
const https = require("https");
const suprarouter = require("./utilities/suprarouter.js");
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
      await suprarouter(req, res);
    } catch (err) {
      console.error("Serve catch", err);
    }
  });
  server.listen(443);
}
main();
