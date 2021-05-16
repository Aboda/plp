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
// Caché de recursos del servidor, todo se carga a memoria desde el arranque
var cache = {
    "favicon":{
        "blog":fs.readFileSync("./mnemnis/blog.ico"),
        "casa":fs.readFileSync("./mnemnis/casa.ico"),
        "desk":fs.readFileSync("./mnemnis/desk.ico")
    },
    "css":{
        "edg":fs.readFileSync("./mnemnis/edg.css").toString(),
        "plp":fs.readFileSync("./mnemnis/plp.css").toString(),
        "prh":fs.readFileSync("./mnemnis/prh.css").toString(),
        "ren":fs.readFileSync("./mnemnis/ren.css").toString(),
        "sdb":fs.readFileSync("./mnemnis/sdb.css").toString(),
        "sph":fs.readFileSync("./mnemnis/sph.css").toString()
    },
    "js":{
        "alpha":fs.readFileSync("./realmiu/alpha.js").toString(),
        "demian_app_aboutme":fs.readFileSync("./realmiu/demian_app_aboutme.js").toString(),
        "demian_app_drawio":fs.readFileSync("./realmiu/demian_app_drawio.js").toString(),
        "demian_app_faq":fs.readFileSync("./realmiu/demian_app_faq.js").toString(),
        "demian_app_info":fs.readFileSync("./realmiu/demian_app_info.js").toString(),
        "demian_app_narrar":fs.readFileSync("./realmiu/demian_app_narrar.js").toString(),
        "demian_app_msg":fs.readFileSync("./realmiu/demian_app_msg.js").toString(),
        "demian_app_privacypolicy":fs.readFileSync("./realmiu/demian_app_privacypolicy.js").toString(),
        "demian_app_requirements":fs.readFileSync("./realmiu/demian_app_requirements.js").toString(),
        "demian_app_somema":fs.readFileSync("./realmiu/demian_app_somema.js").toString(),
        "demian_app_termsofservice":fs.readFileSync("./realmiu/demian_app_termsofservice.js").toString(),
        "demian_app":fs.readFileSync("./realmiu/demian_app.js").toString(),
        "demian_basic_nav":fs.readFileSync("./realmiu/demian_basic_nav.js").toString(),
        "en_construc":fs.readFileSync("./realmiu/en_construc.js").toString(),
        "oa2landing":fs.readFileSync("./realmiu/oa2landing.js").toString(),
        "profesional_demian_app":fs.readFileSync("./realmiu/profesional_demian_app.js").toString(),
        "www_demian_app":fs.readFileSync("./realmiu/www_demian_app.js").toString(),
    }
}
// Se proveen los recursos de caché a la función de confirucación de crocia
crocia.set_cache_n_init(cache);
// Este es el servidor en si, maneja la solicitud y se apoya en las otras funciones para entregar el contenido solicitado
https.createServer(server_options, (req, res) => {
        //Abre el try global para avisar de cualquier error si no hay un catch más específico
    try {
        //Cuenta la acción
        simple_counter++
        //Genera un reporte de entrada
        let action_report = {
            "service_no":simple_counter,
            "timestamp":new Date(),
            "caller_ip":akhenon.clean_ipv6_trail_if_present(req.connection.remoteAddress),
            "host":req.headers.host,
            "url":req.url,
            "method":req.method,
        }
        //Agrega al reporte el dato del dominio que refiere
        if (req.headers.referer != undefined) {
            action_report.referer = req.headers.referer;
        }
        //Loggea la comunicación entrante
        log_JSON(action_report);
        //Procesa la solicitud
        crocia.gatekeep(req,res,akhenon,simple_counter,log_JSON);
        //Cacha errores
    } catch (err) {
        //Loggea el stack del error y los headers, asociar con primer loggeo con el service_no
        log_JSON({
            "service_no":simple_counter,
            "error_stack":err.stack,
            "headers":req.headers
        })
        //se avisa de un error interno en el servidor
        res.writeHead(500);
        //Se envia un html indicando que hubo un error en el proceso, 
        res.end(akhenon.html({"title":"500","robot":false,"html":["<h1>Error 500</h1><br><p>Report of the error has been stored for future analisis</p>"]}));
    };
}).listen(443);
// Si el parámetro global do_log está activado loggea un JSON recibido a un archivo en el SO
function log_JSON (log_stringifieable) {
    if (do_log == true) {
        log_file.write(JSON.stringify(log_stringifieable)+ ",\n");
    };
};

/*
    Modificaciones pendientes en servidor
    
    Integrar un módulo de defensa ante solicitudes maliciosas que:
        1.- Pueda limitar el número de solicitudes que se atienden de una
        IP dada en función de reglas prescritas:

            *Esto es ambiguo porque el handshake HTTPS acontece antes de conocer los
            parámetros de la comunicación, de forma que ya está usando recursos 
            escasos al atender a una solicitud al punto de hacer disponible la IP
            para su evaluación

            *Creo que podemos checar la interacción de la VM con el firewall para ver si se pueden bloquear agentes
            de forma dinámica antes de su llegada a nuestro equipo. 
                -Existe google firewall manejando el tráfico a este servidor, de forma que podemos
                construir una cloud function que reciba el mensaje de alarma desde este cliente para bloquear
                temporal o permanentemente a cualquier agresor y conservar operabilidad. 

            ej. Si una IP realiza más de 10 solicitudes por segundo, 100 por minuto ó 1000 por hora se dejará de contestar
            a la IP en cuestión.

            esto para disuadir un uso inadecuado, se pueden instalar whitelists de ser legítimas las llamadas

        2.- Si la suma de consultas en un margen de tiempo supera un umbral máximo, se apagará el servidor.
            
            esto para generar un cost breaker interno por el tema de poder superar el
            limite gratuito proveído por google. 

            tambien hay que trabajar la limitación de costos de google cloud
*/