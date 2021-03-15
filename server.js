//Carga de modulos usados por el servidor
const fs = require("fs");
const https = require("https");
const url = require("url");

//Configuración del output general de loggeo a un archivo en el SO
const do_log = true;
const log_file = fs.createWriteStream("/home/andthenbeyond/din/server_log.txt", {flags : "a"});

/*
Configuración del servidor https
Configurado a "tener poca paciencia" no recuerda sesiones y ofrece restricciónes de 5 10 y 20 segundos para transmitir headers, contenido y para considerar una conexión muerta respectivamente
Lo anterior sumado a un modelo de entrega de pocas llamadas pretende reducir la huella de memoria que es el recurso más limitado de la computadora gratuita
*/
const options = {
    key: fs.readFileSync("/home/andthenbeyond/tls/privkey.pem"),
    cert: fs.readFileSync("/home/andthenbeyond/tls/fullchain.pem"),
    maxCachedSessions: 0,
    headersTimeout: 5000,
    requestTimeout: 10000,
    timeout:20000
};

// este es el servidor en si, maneja la solicitud y se apoya en las otras funciones para entregar el contenido solicitado
https.createServer(options, (req, res) => {
    try {
        var rep = {
            "step":"creation",
            "host":req.headers.host,
            "url":req.url,
            "ip":req.connection.remoteAddress
        }

        try{
            rep.step = "sk_assignation";
            var service_kit = allowed_hosts[req.headers.host];
        } catch (err) {
            rep.error = "error asignando service kit";
            log_JSON(rep);
            res.writeHead(500);
            res.end(rep);
        }

        if (service_kit == undefined) {
            rep.error = "el servidor no cuenta con un paquete de atención para el host solicitado";
            log_JSON(rep);
            res.writeHead(404);
            res.end(rep);
        }else{
            try{
                rep.step = "sk_execution";
                log_JSON(rep);
                service_kit(req,res,rep);
            }catch(err){
                rep.error = "ejecutando service kit";
                log_JSON(rep);
                res.writeHead(500);
                res.end(rep);
            }            
        }
    } catch (err) {
        //cacha errores y los reenvía al invocador
        rep.error = "error disparado en main server try";
        res.writeHead(500);
        res.end(rep);
    };
}).listen(443);

function log_JSON (log_stringifieable) {
    if (do_log == true) {
        log_file.write(JSON.stringify(log_stringifieable)+ ",\n");
    };
};

function assert_lng(acclngstr) {
    //procesar header "accept-language":"en-US,en;q=0.9,es;q=0.8,gl;q=0.7"
    var es_pos = acclngstr.indexOf("es");
    var en_pos = acclngstr.indexOf("en");
    if (en_pos != -1 && en_pos < es_pos){
        return "en";
    }else if (es_pos != -1 && es_pos < en_pos) {
        return "es";
    }
}

//Este es el ruteador, considera el dominio/subdominio primero y luego la URL antes de tomar acción
var allowed_hosts = {
    "demian.app": function (req,res,rep) {
        /* single page apps domain, check specific and send */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/other/uni/casa.ico"));
                break;
                case "/":
                    var options = {
                        "title":"Aplicacion:Demian",
                        "ganalytics":true,
                        "gtag":"G-6MEPN29LZG",
                        "facebooksdk":true,
                        "fbid":"2076681439269297",
                        "css":"demian",
                        "html":"demian",
                        "js":"demian"
                    };
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(200);
                    res.end(html_base_creator(options));
                break;
                default: 
                    rep.error = "no case for url in domain";
                    rep.action = "logging and sending 404";
                    rep.headers = req.headers;
                    log_JSON(rep);
                    var options = {
                        "title":"404:Demian",
                        "html":"404_demian",
                        "css":"404"
                    }
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(404);
                    res.end(html_base_creator(options));
            };
        };
    },
    "profesional.demian.app": function (req,res,rep) {
        /* self promotion page possible employer especific flair */
        if (req.method == "GET") {
            switch (req.url) {
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/other/uni/escritorio.ico"));
                break;
                case "/":
                    var options = {
                        "title":"Blog:Demian",
                        "ganalytics":true,
                        "gtag":"G-6MEPN29LZG",
                        "facebooksdk":true,
                        "fbid":"2076681439269297",
                        "css":"demian",
                        "html":"demian",
                        "js":"demian"
                    };
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(200);
                    res.end(html_base_creator(options));
                break;
                default:
                    rep.error = "no case for url in domain";
                    rep.action = "logging and sending 404";
                    rep.headers = req.headers;
                    log_JSON(rep);
                    var options = {
                        "title":"404:Demian",
                        "html":"404_demian",
                        "css":"404"
                    }
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(404);
                    res.end(html_base_creator(options));
            };
        };
    },
    "www.demian.app": function (req,res,rep) {
        /* general blog pertaining to the domain applications */
        if (req.method == "GET") {
            switch (req.url) {
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/other/uni/blog.ico"));
                break;
                case "/":
                    var options = {
                        "title":"Blog:Demian",
                        "ganalytics":true,
                        "gtag":"G-6MEPN29LZG",
                        "facebooksdk":true,
                        "fbid":"2076681439269297",
                        "css":"demian",
                        "html":"demian",
                        "js":"demian"
                    };
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(200);
                    res.end(html_base_creator(options));
                break;
                default:
                    rep.error = "no case for url in domain";
                    rep.action = "logging and sending 404";
                    rep.headers = req.headers;
                    log_JSON(rep);
                    var options = {
                        "title":"404:Demian",
                        "html":"404_demian",
                        "css":"404"
                    };
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(404);
                    res.end(html_base_creator(options));
            };
        };
    },
    "remansonocturno.com": function (req,res,rep) {
        /* sideblog main domain, perhaps the members section */
        if (req.method == "GET") {
            switch (req.url) {
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/other/uni/remanso.ico"));
                break;
                case "/":
                    var options = {
                        "title":"Miembros: Remanso Nocturno",
                        "css":"remanso",
                        "html":"remanso",
                        "js":"remanso"
                    };
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(200);
                    res.end(html_base_creator(options));    
                break;
                default:
                    rep.error = "no case for url in domain";
                    rep.action = "logging and sending 404";
                    rep.headers = req.headers;
                    log_JSON(rep);
                    var options = {
                        "title":"404:Remanso Nocturno",
                        "html":"404_remanso",
                        "css":"404"
                    };
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(404);
                    res.end(html_base_creator(options));
            };
        };
    },
    "www.remansonocturno.com": function (req,res,rep) {
        /* sideblog blog */
        if (req.method == "GET") {
            switch (req.url) {
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/other/uni/remanso.ico"));
                break;
                case "/":
                    var options = {
                        "title":"Blog:Remanso Nocturno",
                        "css":"remanso",
                        "html":"remanso",
                    };
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(200);
                    res.end(html_base_creator(options));
                break;
                default:
                    rep.error = "no case for url in domain";
                    rep.action = "logging and sending 404";
                    rep.headers = req.headers;
                    log_JSON(rep);
                    var options = {
                        "title":"404:Remanso Nocturno",
                        "html":"404_remanso",
                        "css":"404"
                    }
                    if (req.headers["accept-language"] != undefined) {
                        options.languaje = assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(404);
                    res.end(html_base_creator(options));
            };
        };
    },
    "34.123.254.52": function (req,res,rep) {
        rep.error = "call to public ip without domain";
        rep.action = "logging and closing";
        rep.headers = req.headers;
        log_JSON(rep);
        res.writeHead(400);
        res.end({"error":{
            "cause":"call addressed to server public ip with no indication of target host, this ip serves múltiple domains",
            "solution":"address domains demian.app or remansonocturno.com to be serviced"}
        });
    }
}


function html_base_creator (options) {
    log_JSON(options);
    var ph = "<!DOCTYPE html>";

    if (options.languaje == "es") {
        ph =  ph +"<html lang='es-MX'></html>";
    } else {
        ph =  ph + "<html lang='en-US'></html>";          
    }
    ph = ph + "<head>";
    if (options.ganalytics == true) {
        ph = ph + "<script async src='https://www.googletagmanager.com/gtag/js?id='"+options.gtag+"'></script>";
        ph = ph + "<script>";
        ph = ph + "window.dataLayer = window.dataLayer || [];";
        ph = ph + "function gtag(){dataLayer.push(arguments);}";
        ph = ph + "gtag('js', new Date());";
        ph = ph + "gtag('config', '"+options.gtag+"');";
        ph = ph + "</script>";
    }
    if (options.title == undefined) {options.title = "No Especificado"}
    ph = ph + "<title>"+options.title+"</title>";
    ph = ph + "<base target='_top'><meta charset='UTF-8'>";
    ph = ph + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    if (options.robo != false) {
        ph = ph + "<link href='https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap' rel='stylesheet'></link>";
    }
    ph = ph + "</head>";
    if (options.css == undefined) {options.css = "404";}
    ph = ph + "<style>"+fs.readFileSync("/home/andthenbeyond/sitiopersonal/css/"+options.css+".css")+"</style>";
    ph = ph + "<body>";
    if (options.facebooksdk == true) {
        ph = ph + "<script>";
        ph = ph + "window.fbAsyncInit = function() {";
        ph = ph + "FB.init({";
        ph = ph + "appId            : '"+options.fbid+"',";
        ph = ph + "autoLogAppEvents : true,";
        ph = ph + "xfbml            : true,";
        ph = ph + "version          : 'v10.0'";
        ph = ph + "});";
        ph = ph + "};";
        ph = ph + "</script>";
        ph = ph + "<script async defer crossorigin='anonymous' src='https://connect.facebook.net/en_US/sdk.js'></script>";
    }
    if (options.html == undefined) {options.html = "404";}
    ph = ph + fs.readFileSync("/home/andthenbeyond/sitiopersonal/html/"+options.html+".html");
    ph = ph + "</body>";
    if (options.js != undefined) {
        ph = ph + "<script>";
        for (modules of options.js) {
            ph = ph + fs.readFileSync("/home/andthenbeyond/sitiopersonal/js/"+options.js+".js");
        }
        ph = ph + "</script>";
    }
    ph = ph + "</html>";
    return ph;
}