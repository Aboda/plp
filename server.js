const fs = require("fs");
const https = require("https");
const url = require("url");

const do_log = true;
var log_file = fs.createWriteStream("/home/andthenbeyond/din/server_log.txt", {flags : "a"});

const log_JSON = function (log_stringifieable) {
    if (do_log == true) {
        log_file.write(JSON.stringify(log_stringifieable)+ ",\n");
    };
};

const options = {
    key: fs.readFileSync("/home/andthenbeyond/tls/privkey.pem"),
    cert: fs.readFileSync("/home/andthenbeyond/tls/fullchain.pem")
};

var allowed_hosts = {
    "demian.app": function (req,res) {
        /* single page apps domain, check specific and send */
        if (method == "GET") {
            switch (url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(incomming_params));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/favicon.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    },
    "profesional.demian.app": function (req,res) {
        /* self promotion page possible employer especific flair */
        if (method == "GET") {
            switch (url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(incomming_params));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/favicon.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    },
    "www.demian.app": function (req,res) {
        /* general blog pertaining to the domain applications */
        if (method == "GET") {
            switch (url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(incomming_params));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/favicon.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    },
    "remansonocturno.com": function (req,res) {
        /* sideblog main domain, perhaps the members section */
        if (method == "GET") {
            switch (url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(incomming_params));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/favicon.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    },
    "www.remansonocturno.com": function (req,res) {
        /* sideblog blog */
        if (method == "GET") {
            switch (url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(incomming_params));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/favicon.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    },
    "34.123.254.52": function (req,res) {
        /* send links to proper fronts */
        if (method == "GET") {
            switch (url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(incomming_params));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/favicon.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    }
}


https.createServer(options, (req, res) => {
    try {
        //easy bindings to request elements
        const { method, url, headers, connection } = req;
        
        //assert caller ip address if knowable
        var ip_found_in;
        var caller_ip;
        if (connection.remoteAddress != undefined) {
            caller_ip = connection.remoteAddress;
            ip_found_in = "connection.remoteAddress";
        }else if (headers["x-forwarded-for"] != undefined) {
            caller_ip = headers["x-forwarded-for"];
            ip_found_in = "headers[x-forwarded-for]";
        };

        var incomming_params = {
            "ip":caller_ip,
            "ip_found_in": ip_found_in,
            "method": method,
            "url": url,
            "headers": headers,
            "smart_url": new URL(url,incomming_params.headers.host)
        };
        log_JSON(incomming_params);
        var service_kit = allowed_hosts[incomming_params.headers.host];
        if (service_kit != undefined) {
            try{
                service_kit(req,res);
            }catch(err){
                res.writeHead(500);
                res.end("error disparado intentando service_kit:\n"+JSON.stringify({err,incomming_params}));
            }
            
        }else{
            res.writeHead(500);
            res.end("solicitud de host desoconocido:\n"+JSON.stringify(incomming_params));    
        }
    } catch (err) {
        //catch and send errors back to caller
        res.writeHead(500);
        res.end("error disparado en main server try:\n"+JSON.stringify(err));
    };
}).listen(443);