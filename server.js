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
    "demian.app": function (req,res,rep) {
        call_report.allowed_touch = "demian.app";
        log_JSON(call_report);
        /* single page apps domain, check specific and send */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
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
    "profesional.demian.app": function (req,res,rep) {
        call_report.allowed_touch = "profesional.demian.app";
        log_JSON(call_report);
        /* self promotion page possible employer especific flair */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
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
    "www.demian.app": function (req,res,rep) {
        call_report.allowed_touch = "www.demian.app";
        log_JSON(call_report);
        /* general blog pertaining to the domain applications */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
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
    "remansonocturno.com": function (req,res,rep) {
        call_report.allowed_touch = "remansonocturno.com";
        log_JSON(call_report);
        /* sideblog main domain, perhaps the members section */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
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
    "www.remansonocturno.com": function (req,res,rep) {
        call_report.allowed_touch = "www.remansonocturno.com";
        log_JSON(call_report);
        /* sideblog blog */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
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
    "34.123.254.52": function (req,res,rep) {
        call_report.allowed_touch = "34.123.254.52";
        log_JSON(call_report);
        /* send links to proper fronts */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end("datos recibidos en GET:\n"+JSON.stringify(rep));
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
        
        //assert caller ip address if knowable
        var ip_found_in;
        var caller_ip;
        if (req.connection.remoteAddress != undefined) {
            caller_ip = req.connection.remoteAddress;
            ip_found_in = "connection.remoteAddress";
        }else if (req.headers["x-forwarded-for"] != undefined) {
            caller_ip = req.headers["x-forwarded-for"];
            ip_found_in = "headers[x-forwarded-for]";
        };
       
        var service_kit = allowed_hosts[req.headers.host];

        var call_report = {
            "ip":caller_ip,
            "ip_found_in": ip_found_in,
            "method": req.method,
            "url": req.url,
            "headers": req.headers
        };

        if (service_kit != undefined) {
            try{
                call_report.sk_found = true;
                service_kit(req,res,call_report);
            }catch(err){
                call_report.sk = "error disparado intentando service_kit:\n";
                log_JSON(call_report);

                res.writeHead(500);
                res.end("error disparado intentando service_kit:\n"+JSON.stringify({"error":err,"call_report":call_report}));
            }            
        }else{
            call_report.sk_found = false;
            log_JSON(call_report);

            res.writeHead(500);
            res.end("solicitud de host desoconocido:\n"+JSON.stringify(call_report));    
        }
    } catch (err) {
        //catch and send errors back to caller
        res.writeHead(500);
        res.end("error disparado en main server try:\n"+JSON.stringify({"error":err,"call_report":call_report}));
    };
}).listen(443);