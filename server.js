const fs = require("fs").promises;
const https = require("https");
const suprarouter = require("./utilities/suprarouter.js");
async function main(){
    const tls_path = String(await fs.readFile("./din/tls_path.txt")).trim();
    const opts = {
        key: await fs.readFile(tls_path +"/privkey.pem"),
        cert: await fs.readFile(tls_path + "/fullchain.pem"),
        maxCachedSessions: 5,
        keepAliveTimeout: 300,
        headersTimeout: 300,
        maxHeadersCount: 15,
        requestTimeout: 2000,
        timeout:3000
    };
    const server = https.createServer(opts,async(req,res)=>{try{suprarouter(req,res)}catch(err){console.error("Serve catch",err)}});
    server.listen(443);
};
main();