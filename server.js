var fs = require("fs");
var https = require("https");
var querystring = require("querystring");

var do_log = true;
var log_file = fs.createWriteStream("/home/andthenbeyond/din/server_log.txt", {flags : "w"});

const log_JSON = function (log_stringifieable) {
    if (do_log == true) {
        log_file.write(JSON.stringify(log_stringifieable)+ ",\n");
    };
};

const options = {
    key: fs.readFileSync("/home/andthenbeyond/tls/privkey.pem"),
    cert: fs.readFileSync("/home/andthenbeyond/tls/fullchain.pem")
};

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
            "data": querystring.parse(url)
        };

        log_JSON(incomming_params);
        var final_reply;

        if (method == "GET") {
            switch (url) {
                case "/":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
                break;
                case "/fb-app-contenidospuma-terms-of-service/":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
                break;
                case "/fb-app-contenidospuma-privacy-policy/":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/favicon.ico"));
                break;
                default: 
                    final_reply = "404: el recurso no ha sido localizado:\n"+JSON.stringify(incomming_params);
                    res.writeHead(404);
                    res.end (final_reply);
            };
        };
        
    } catch (err) {
        //catch and send errors back to caller
        res.writeHead(500);
        res.end("error disparado en main server try: "+JSON.stringify(err));
    };
}).listen(443);