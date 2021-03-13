//Carga de modulos usados por el servidor
const fs = require("fs");
const https = require("https");
const url = require("url");

//Configuración del output general de loggeo a un archivo en el SO
const do_log = true;
const log_file = fs.createWriteStream("/home/andthenbeyond/din/server_log.txt", {flags : "a"});
const log_JSON = function (log_stringifieable) {
    if (do_log == true) {
        log_file.write(JSON.stringify(log_stringifieable)+ ",\n");
    };
};

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

/*
    Esta herramienta construye el html a entregar en función de parámetros optativos
    de ser invocado sin parámetros, devuelve un 404
*/
const html_base_creator = function (options) {
    var ph = "<!DOCTYPE html>";

    //decides the languaje in which the page will be presented
    if (options.languaje == "es") {
        ph =  ph +"<html lang='es-MX'></html>";
    } else {
        ph =  ph + "<html lang='en-US'></html>";          
    }

    ph = ph + "<head>";

    //decides wheter to add google analytics tracking to the html
    if (options.ganalytics == true) {
        //requires the google tag for the property to be provided
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
    ph = ph + "<link href='https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap' rel='stylesheet'></link>";
    ph = ph + "</head>";
    
    //decides the css file that will be served with the page
    if (options.css == undefined) {options.css = "404";}
    ph = ph + "<style>"+fs.readFileSync("/home/andthenbeyond/sitiopersonal/css/"+options.css+".css")+"</style>";
    ph = ph + "<body>";

    //decides wheter to add facebook sdk to the html
    if (options.facebooksdk == true) {
        //requires the facebook app code
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

    /*
        builds the initial body html, this is the answer to the SPAP sharing issue and why we came to node instead of a only browser solution.
        i am under the impression that the service worker will do what is currently done by node. and we will have the best of both worlds.
    */
    if (options.html == undefined) {options.html = "404";}
    ph = ph + fs.readFileSync("/home/andthenbeyond/sitiopersonal/html/"+options.html+".html");

    ph = ph + "</body>";

    //decides the homebrew javascript added to the page
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

//Este es el ruteador, considera el dominio/subdominio primero y luego la URL antes de tomar acción
var allowed_hosts = {
    "demian.app": function (req,res,rep) {
        rep.allowed_touch = "demian.app";
        log_JSON(rep);
        /* single page apps domain, check specific and send */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/other/uni/plp.ico"));
                break;
                default:               
                    var options = {
                        "title":"PLP:Demian",
                        "ganalytics":true,
                        "gtag":"G-6MEPN29LZG",
                        "facebooksdk":true,
                        "fbid":"2076681439269297",
                        "css":"demian",
                        "html":"demian",
                        "js":"demian",
                        "languaje":assert_lng(req.headers["accept-language"])
                    };
                    res.writeHead(200);
                    
                    res.end(html_base_creator(options));
            };
        };
    },
    "profesional.demian.app": function (req,res,rep) {
        rep.allowed_touch = "profesional.demian.app";
        log_JSON(rep);
        /* self promotion page possible employer especific flair */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/general/escritorio.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    },
    "www.demian.app": function (req,res,rep) {
        rep.allowed_touch = "www.demian.app";
        rep.path = "/home/andthenbeyond/sitiopersonal/www/";
        log_JSON(rep);
        /* general blog pertaining to the domain applications */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/general/blog.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    },
    "remansonocturno.com": function (req,res,rep) {
        rep.allowed_touch = "remansonocturno.com";
        rep.path = "/home/andthenbeyond/sitiopersonal/remansonocturno/";
        log_JSON(rep);
        /* sideblog main domain, perhaps the members section */
        if (req.method == "GET") {
            switch (req.url) {
                case "/whoscalling/":
                    res.writeHead(200);
                    res.end ("datos recibidos en GET:\n"+JSON.stringify(rep));
                break;
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/general/remanso.ico"));
                break;
                default:
                    res.writeHead(200);
                    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
            };
        };
    },
    "www.remansonocturno.com": function (req,res,rep) {
        rep.allowed_touch = "www.remansonocturno.com";
        rep.path = "/home/andthenbeyond/sitiopersonal/remansonocturno/www/";
        log_JSON(rep);
        /* sideblog blog */
        if (req.method == "GET") {
            switch (req.url) {
                case "/favicon.ico":
                    res.writeHead(200);
                    res.end(fs.readFileSync(rep.path + "remanso.ico"));
                break;
                case "/":
                    var crafted_html = html_base_creator({
                        "title":"Blog:Remanso Nocturno",
                        "path":rep.path,
                        "page":"Index",
                        "languaje":assert_lng(req.headers["accept-language"])
                    });
                    res.writeHead(200);
                    res.end(crafted_html);
                break;
                default:
                    var crafted_html = html_base_creator({
                        "title":"404:Remanso Nocturno",
                        "page":"404",
                        "languaje":assert_lng(req.headers["accept-language"])
                    });
                    res.writeHead(200);
                    res.end(crafted_html);
            };
        };
    },
    "34.123.254.52": function (req,res,rep) {
        log_JSON(rep);
        /* send links to proper fronts */
        if (req.method == "GET") {
            switch (req.url) {
                default:
                    var options = {"languaje":assert_lng(req.headers["accept-language"])};
                    res.writeHead(404);
                    res.end(html_base_creator(options));
            };
        };
    }
}

// este es el servidor en si, maneja la solicitud y se apoya en las otras funciones para entregar el contenido solicitado
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
            "time":new Date().toNumber(),
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
                call_report.sk = "error disparado intentando service_kit:";
                call_report.error = err;
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
        //cacha errores y los reenvía al invocador
        res.writeHead(500);
        var report = "error disparado en main server try, reporte:\n"+JSON.stringify(rep)+"\nerror:\n"+JSON.stringify(rep);
        res.end(report);
    };
}).listen(443);

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
