// Carga de modulos usados por el servidor
const fs = require("fs");
const https = require("https");
const plp = require("./routerplp.js");
const ren = require("./routerren.js");
const rf = require("./resourcefaker.js");
// Configuración del output general de loggeo a un archivo en el SO, está en su propia carpeta y es de escritura pública
const do_log = true;
const log_file = fs.createWriteStream("/home/andthenbeyond/din/server_log.txt", {flags : "a"});
/*
    Configuración del servidor https
    modo "poca paciencia" no recuerda sesiones y ofrece restricciónes de 1 2 y 3 segundos para transmitir headers, contenido y para considerar una conexión muerta respectivamente
    Lo anterior sumado a un modelo de entrega de pocas llamadas pretende reducir la huella de memoria que es el recurso más limitado de la computadora gratuita
*/
const server_options = {
    key: fs.readFileSync("/home/andthenbeyond/tls/privkey.pem"),
    cert: fs.readFileSync("/home/andthenbeyond/tls/fullchain.pem"),
    maxCachedSessions: 0,
    keepAliveTimeout: 0,
    headersTimeout: 1000,
    maxHeadersCount: 10,
    requestTimeout: 2000,
    timeout:3000
};
// Usado para asociar la solicitud con su ruteador de dominio correcto
const valid_domains = {"demian.app":plp,"remansonocturno.com":ren};
console.log(valid_domains);
// Cuenta el número de llamadas recibidas desde el arranque del servidor
var simple_counter = 0;
// Este es el servidor en si, maneja la solicitud y se apoya en las otras funciones para entregar el contenido solicitado
https.createServer(server_options, (req, res) => {
        //Cuenta la acción
        simple_counter++
        //Abre el try global para avisar de cualquier error si no hay un catch más específico
    try {
        //Parsea la url relativa al host llamado y la coloca en un objeto fácil de manipular
        const sectionedurl = new URL(req.url, "https://"+req.headers.host+"/");
        //Este es un reporte interno de la comunicación para tener a la mano datos cruciales y debuggear
        var rep = {
            "service_no":simple_counter,
            "timestamp":new Date().getTime(),
            "step":"rep_creation",
            "caller_ip":clean_ipv6_trail_if_present(req.connection.remoteAddress),
            "languaje":assert_lng(req.headers["accept-language"],sectionedurl.search),
            "host":req.headers.host.toLowerCase(),
            "url":req.url.toLowerCase(),
            "method":req.method,
            "search": sectionedurl.search.toLowerCase(),
            "pathname": sectionedurl.pathname.toLowerCase()
        }
        var found = false;
        for (domain in valid_domains) {
            if (req.headers.host.indexOf(domain) != -1) {
                found = true;
                rep.step = "out_to_router";
                valid_domains[domain].route(req,res,rep,rf);
                rep.step = "complete_without_errors";
                tag_out(rep);
                break;
            }
        }
        if (found == false) {
            rep.no_service = true;
            rep.headers = req.headers;
            const html_langopts = {
                "es":"<p>Si no eres redirigido en cinco segundos, <a href='https://profesional.demian.app/'>haz click aqui</a>.</p>",
                "en":"<p>If you are not redirected in five seconds, <a href='https://profesional.demian.app/'>click here</a>.</p>"
            }
            const options = {
                "type":"html",
                "title":"Redirect",
                "dynamic":"redirect",
                "delay":5,
                "target":"https://profesional.demian.app",
                "languaje":rep.languaje,
                "html":html_langopts[rep.languaje]
            }
            res.writeHead(300);
            res.end(rf(options));
            rep.step = "redirect_to_property";
            tag_out(rep);
        }        
        //cacha errores y los reenvía al invocador
    } catch (err) {
        //se agrega el error al reporte de loggeo
        rep.error = err;
        //se agregan los cabezales al reporte de loggeo
        rep.headers = req.headers;
        //indica paso para fácil búsqueda
        rep.step = "";
        //marca duración de la atención y loggea en os de ser verdadera la variable do_log
        tag_out(rep);
        //para alimentar stdout o cuando se está ejecutando el proceso manualmente    
        console.log(rep);
        //se avisa de un error interno en el servidor
        res.writeHead(500);
        //se devuelve el reporte junto con el error
        res.end(JSON.stringify(rep));
    };
}).listen(443);
//loggea JSON a un archivo en el os si el parámetro global está activado
function log_JSON (log_stringifieable) {
    if (do_log == true) {
        log_file.write(JSON.stringify(log_stringifieable)+ ",\n");
    };
};
//Checa el tiempo de atención y loggea un reporte
function tag_out (rep) {
    rep.duration = new Date().getTime() - rep.timestamp;
    log_JSON(rep);
}
//decide entre en y es basado en search params o bien preferencia de headers en ese orden
function assert_lng (acclngstr,searchstring) {
    var default_lang = "en";
    var chosen_lang;
    //procesar header "accept-language":"en-US,en;q=0.9,es;q=0.8,gl;q=0.7"
    if (acclngstr != undefined) {
        var es_pos = acclngstr.indexOf("es");
        var en_pos = acclngstr.indexOf("en");
        if (es_pos != -1 && en_pos == -1) {chosen_lang = "es"} else
        if (en_pos != -1 && es_pos == -1) {chosen_lang = "en"} else
        if (en_pos != -1 && en_pos < es_pos && es_pos != -1){chosen_lang = "en";}else 
        if (es_pos != -1 && es_pos < en_pos && en_pos != -1){chosen_lang = "es";}
    }    
    //procesar parámetro ?lng=es
    if (searchstring != "") {
        if (searchstring.includes("lng")) {
            var required_languaje = searchstring.substring(searchstring.indexOf("lng")+4,searchstring.indexOf("lng")+6);
            if (required_languaje == "en" || required_languaje == "es") {
                chosen_lang = required_languaje;
            }
        }  
    }
    if (chosen_lang == undefined) {chosen_lang = default_lang;};
    return chosen_lang;
}
//solo pone bonitas las direcciones ipv4 expresadas en formato ipv6
function clean_ipv6_trail_if_present(ipv6stringshowingipv4) {
    var ipv6_trail_position = ipv6stringshowingipv4.indexOf("::ffff:");
    if (ipv6_trail_position != -1) {
        return ipv6stringshowingipv4.substr(7);
    }else{
        return ipv6stringshowingipv4;
    }
}