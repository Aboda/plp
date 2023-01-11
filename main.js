/*
    This is intended to be deployed on the single terminal that handles all
    domains traffic, it will have iterations. In the future, this
    server will be expanded to be used as a container deployed in cloud run

    the idea is to roll initial proyects here, and once any of those pick up
    either grow vertically or horizontally. 
*/

const fs = require("fs")
const https = require("https")
const url = require("url")

/*
    These are manual parameters that may change continually as new apps script server scripts are published.

    A server could be set to be served by any of the continually active published URLs, this is something to keep
    present in all considerations as it entails flexibility and a different margin for error than the non versioned
    publishment strategy. 
*/

const current_backend_url = "https://script.google.com/macros/s/AKfycbxo9f22XvkLovf6Fu_Doc7gViVlyxcOFWk2aJtKj2NfW3Vgw7NZKrQ_HjWpM6AW9E9d/exec"

const server_request = {
    "command":"fetch_server_configuration",
    "type":"gcp-compute-engine-plp.js"
}

let log_stream = fs.createWriteStream("../din/log.txt", {flags:'a'})
let service_no = 0
let core = {}


let startup_report = {
    "version":"prealpha_modeling",
    "start_time":new Date(),
    "start_command":server_request
}

function basic_text_fetch(url,method,message,callback) {
    let options = {
        "method":method
    }
    let req = https.request(url,options, (res) => {
        if (res.statusCode == 302 || res.statusCode == 307){
            basic_text_fetch(res.headers.location,"GET",null,callback)
        }else{
            let data = ""
            res.on('data', (d) => {
                data = data + d
            });
            res.on('end', () => {
                callback(data)
            });
        }
    });
    req.on('error', (e) => {
      throw e
    });
    if (message != undefined){
        req.write(JSON.stringify(message))
    }
    req.end();
}

function process_initial_configuration(complete_server_config_text){
    console.log("received",{complete_server_config_text})
    core = eval(complete_server_config_text)
    start_the_https_server(core)
}

basic_text_fetch(current_backend_url,"POST",server_request,process_initial_configuration)

const server_conf = {
    key: fs.readFileSync("/etc/letsencrypt/live/demian.app/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/demian.app/fullchain.pem"),
    maxCachedSessions: 0,
    keepAliveTimeout: 0,
    headersTimeout: 1000,
    maxHeadersCount: 10,
    requestTimeout: 2000,
    timeout:3000
}

/*
    Here we start the server with the already available resources
*/
function start_the_https_server(core){
    https.createServer(server_conf, (req, res) => {
        let report = create_report(req)
        try {
            core.serve(req,res,report,toolbox)
         } catch (err) {
            report.endcode = 500
            report.error = err.stack
            report.headers = req.headers
            loc_log(report)
            res.writeHead(report.endcode)
            res.end()
        }
    }).listen(443)
}


/*
    General tooling
*/

const loc_log = (thing_to_log) => {
    log_stream.write(JSON.stringify(thing_to_log, null, 2)+",\n")
}

const clean_ipv6_trail_if_present = (address_to_eval) => {
    let processed_adress
    address_to_eval.startsWith("::ffff:") ? processed_adress = address_to_eval.substring(7) : processed_adress = address_to_eval
    return processed_adress;
}

const eval_and_serve_item = (req,res,report,toolbox) => {
    break_url(req,report)
    report.lng = assert_lng(req.headers["accept_languaje"],report.query)
    if (report.query != undefined) {
        read_commands(report)
    }
    if (report.retool == true) {
        get_or_update_toolbox()
    }
    loc_log(report)
    if (toolbox.domains[report.host] != undefined) {
        let reply = toolbox.tasks.route(req,report,toolbox)
        res.writeHead(reply.code)
        res.end(reply.content)   
    }else{
        res.writeHead(418)
        res.end()
    }
}

const break_url = (req,report) => {
    let split_loc = req.url.indexOf("?")
    if (split_loc !=  -1) {
        report.path = req.url.substring(0,split_loc);
        report.query = req.url.substring(split_loc);
    }else{
        report.path = req.url
    }
    if (report.path == "/") {
        report.s1 = report.path
    }else{
        report.s1 = report.path.split("/")[1]
    }
}

const assert_lng = (acclngstr,searchstring) => {
    var default_lang = "en";
    var chosen_lang;
    if (acclngstr != undefined) {
        var es_pos = acclngstr.indexOf("es");
        var en_pos = acclngstr.indexOf("en");
        if (es_pos != -1 && en_pos == -1) {chosen_lang = "es"} else
        if (en_pos != -1 && es_pos == -1) {chosen_lang = "en"} else
        if (en_pos != -1 && en_pos < es_pos && es_pos != -1){chosen_lang = "en";}else 
        if (es_pos != -1 && es_pos < en_pos && en_pos != -1){chosen_lang = "es";}
    }    
    if (searchstring != undefined) {
        if (searchstring.includes("lng")) {
            var required_languaje = searchstring.substring(searchstring.indexOf("lng")+4,searchstring.indexOf("lng")+6);
            if (required_languaje == "en" || required_languaje == "es") {
                chosen_lang = required_languaje
            }
        }  
    }
    if (chosen_lang == undefined) {chosen_lang = default_lang}
    return chosen_lang;
}

const read_commands  = (report) => {
    if(report.query.includes("reload")){
        let commandloc = report.query.indexOf("reload")
        let commandinput = report.query.substring(commandloc+7,commandloc+10)
        if (commandinput == "all"){
            report.retool = true
            report.repage = true
        }
        if (commandinput == "roo"){
            report.retool = true
        }
        if (commandinput == "pag"){
            report.repage = true
        }
    }
}

function create_report(req) {
    service_no++
    let report = {
        "service_no":service_no,
        "timestamp":new Date(),
        "caller_ip":clean_ipv6_trail_if_present(req.connection.remoteAddress),
        "host":req.headers.host,
        "url":req.url,
        "method":req.method,
    }

    if (req.headers.referer != undefined) {
        report.referer = req.headers.referer;
    }

    return report
}

/*
    Run at end of startup
*/
loc_log(startup_report)