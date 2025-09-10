const fs = require("fs").promises;
const https = require("https");
const suprarouter = require("./utilities/suprarouter.js");
async function main(){
    let tls_path = await fs.readFile("./din/tls_path.txt");
    tls_path = tls_path.trim();
    const opts = {
        key: await fs.readFile(tls_path +"/privkey.pem"),
        cert: await fs.readFile(tls_path + "/fullchain.pem")
    };
    const server = https.createServer(opts,async(req,res)=>{try{suprarouter(req,res)}catch(err){console.error("Serve catch",err)}});
    server.listen(443);
};
main();