/*
    This is for testing purposes, you just update the endpoint and run in your 
    dev environment to test the calls to the backend of your choice. Vs going
    trough the actual server. At the time of creation is only to do analysis of
    development scripts. 
*/

const http = require("http")
const https = require("https")

const current_backend_url = "https://script.google.com/macros/s/AKfycbxkEoU9MjYxXpda8jRrTO9f1RGQFTQ_AL1s8dAVhPPPQBeO91Eqs5xZzF4X4wDciJ1O/exec"

const server_request = {
    "command":"fetch_server_configuration",
    "type":"gcp-compute-engine-plp.js"
}

let service_no = 0


let core = {}

let startup_report = {
    "version":"manual_http_tester",
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
    console.log("raw backend reply",complete_server_config_text)
    core = eval(complete_server_config_text)
    start_the_http_server()
}

startup_report.backend_request_time = new Date()

basic_text_fetch(current_backend_url,"POST",server_request,process_initial_configuration)

const server_conf = {
    maxCachedSessions: 5,
    keepAliveTimeout: 300,
    headersTimeout: 300,
    maxHeadersCount: 15,
    requestTimeout: 2000,
    timeout:3000
}

startup_report.local_read_ready = new Date()

function start_the_http_server(){
    startup_report.server_start_time = new Date()
    http.createServer(server_conf, (req, res) => {
        let report = create_report(req)
        try {
            core.serve(req,res,report,core)
         } catch (err) {
            report.endcode = 500
            report.error = err.stack
            report.headers = req.headers
            res.writeHead(report.endcode)
            res.end()
        }
    }).listen(3000)
}

console.log(startup_report)

const clean_ipv6_trail_if_present = (address_to_eval) => {
    let processed_adress
    address_to_eval.startsWith("::ffff:") ? processed_adress = address_to_eval.substring(7) : processed_adress = address_to_eval
    return processed_adress;
}

function create_report(req) {
    service_no++
    let report = {
        "service_no":service_no,
        "timestamp":new Date(),
        "caller_ip":clean_ipv6_trail_if_present(req.connection.remoteAddress),
        "method":req.method,
        "url":req.url,
        "host":req.headers.host
    }

    if (req.headers.host.indexOf("www.") == 0){
         report.domain = report.host.slice(4)
         report.subdomain = "www"
    }else{
        report.domain = report.host
        report.subdomain = "/"
    }
    if (req.headers.referer != undefined) {
        report.referer = req.headers.referer;
    }
    return report
}