// Administra sistema de archivos del sistema operativo
const fs = require("fs");
// Habilita herramientas de comunicación vía https
const https = require("https");
// Contiene datos específicos a dominios servidos
const crocia = require("./crocia.js");
// Genera o procura los contenidos solicitados
const akhenon = require("./akhenon.js");
// Configuración del output general de loggeo a un archivo en el SO, está en su propia carpeta y es de escritura pública
const do_log = true;
const log_file = fs.createWriteStream("../../din/server_log.txt", {flags : "a"});
/*
    Configuración del servidor https
    modo "poca paciencia" no recuerda sesiones y ofrece restricciónes de 1 2 y 3 segundos para transmitir headers, contenido y para considerar una conexión muerta respectivamente
    Lo anterior sumado a un modelo de entrega de pocas llamadas pretende reducir la huella de memoria que es el recurso más limitado de la computadora gratuita
*/
const server_options = {
    key: fs.readFileSync("../../tls/privkey.pem"),
    cert: fs.readFileSync("../../tls/fullchain.pem"),
    maxCachedSessions: 0,
    keepAliveTimeout: 0,
    headersTimeout: 1000,
    maxHeadersCount: 10,
    requestTimeout: 2000,
    timeout:3000
};
// Seriador del número de llamadas recibidas desde el arranque del servidor
var simple_counter = 0;

var cache = {
    "favicon":{
        "blog":fs.readFileSync("./mnemnis/blog.ico"),
        "casa":fs.readFileSync("./mnemnis/casa.ico"),
        "desk":fs.readFileSync("./mnemnis/desk.ico")
    },
    "css":{
        "plp":fs.readFileSync("./mnemnis/plp.css").toString(),
        "ren":fs.readFileSync("./mnemnis/ren.css").toString(),
        "sidemenu":fs.readFileSync("./mnemnis/sidemenu.css").toString()
    },
    "js":{
        "blog":fs.readFileSync("./mnemnis/blog.js").toString(),
        "ren":fs.readFileSync("./mnemnis/ren.js").toString(),
        "plp":fs.readFileSync("./mnemnis/plp.js").toString(),
        "framework":fs.readFileSync("./mnemnis/framework.js").toString()
    }
}

crocia.set_cache_n_init(cache);
// Este es el servidor en si, maneja la solicitud y se apoya en las otras funciones para entregar el contenido solicitado
https.createServer(server_options, (req, res) => {
        //Abre el try global para avisar de cualquier error si no hay un catch más específico
    try {
        //Cuenta la acción
        simple_counter++
        //Procesa la solicitud
        crocia.gatekeep(req,res,akhenon,simple_counter);
        //Cacha errores y los loggea
    } catch (err) {
        //se avisa de un error interno en el servidor
        res.writeHead(500);
        //se devuelve el reporte junto con el error
        res.end(akhenon.html({"title":"500","robot":false,"html":["<h1>Error 500</h1><br><p>Report of the error has been stored for future analisis</p>"]}));
        log_JSON({
            "service_no":simple_counter,
            "error":err,
            "timestamp":new Date().getTime(),
            "caller_ip":akhenon.clean_ipv6_trail_if_present(req.connection.remoteAddress),
            "host":req.headers.host,
            "url":req.url,
            "method":req.method,
            "headers":req.headers
        })
    };
}).listen(443);
// Si el parámetro global do_log está activado loggea un JSON recibido a un archivo en el SO y hace console.log
function log_JSON (log_stringifieable) {
    if (do_log == true) {
        log_file.write(JSON.stringify(log_stringifieable)+ ",\n");
        console.log(log_stringifieable);
    };
};