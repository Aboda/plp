/*
    This is intended to be deployed on the single terminal that handles all
    domains traffic, it will have iterations. In the future, this
    server will be expanded to be used as a container deployed in cloud run

    the idea is to roll initial proyects here, and once any of those pick up
    either grow vertically or horizontally. 
*/

const fs = require("fs")
const https = require("https")

/*
    These are manual parameters that may change continually as new apps script server scripts are published.

    A server could be set to be served by any of the continually active published URLs, this is something to keep
    present in all considerations as it entails flexibility and a different margin for error than the non versioned
    publishment strategy. 
*/

const current_backend_url = "https://script.google.com/macros/s/AKfycbx3l06egInWNfh9hAiiwDjRrzdLJ3qBpcpSdc5gVL2WUr6Ob147FBuH-MpHnFMXUV_Z/exec"

/*
    Initial version loads a single large javascript file that has been prepared with serving tools and written content worked by sections in google drive, altough future iterations might have a plethora of calls to allow for on the fly reload of parts of the content.
*/

const server_request = {
    "command":"fetch_server_configuration",
    "type":"gcp-compute-engine-plp.js"
}

/*
    This is a basic compute engine hard drive log for troubleshooting, it logs an event at startup and at each serviced call. 
*/
let log_stream = fs.createWriteStream("../din/log.txt", {flags:'a'})
const loc_log = (thing_to_log) => {
    log_stream.write(JSON.stringify(thing_to_log, null, 2)+",\n")
}

/*
    Global service counter from server startup, used in reporting
*/
let service_no = 0

/*
    This is the global object that contains the entirety of the programmed server. 

    Serve function - Main function driver, this is executed on each request
    Tools - Tools to parse requests and build different content types
    Templates - HTML commonly used text blocks
    Domains - Served website basic structure, homepage and L1 calls are routed here
    Assets - Served website general media relationship sheet (web surface loads an asset from a google backend specified by entry)
*/
let core = {}

/*
    Per startup report
*/
let startup_report = {
    "version":"prealpha_modeling",
    "start_time":new Date(),
    "start_command":server_request
}

/*
    Fully fetchs the contents of the target url after https request
*/
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

/*
    Here is the exposed core of the deathstar, if an attacker can MiM the source
    of the code to execute it can steal the server.
    
    Risk is minimal since all the information held by the server is public, and
    the emulated environment has 0 rights outside of itself.

    Greatest risk comes from access to the web certificates. 

    Otherwise we have a secure server. So we will have to trust TLS on this one.
*/
function process_initial_configuration(complete_server_config_text){
    core = eval(complete_server_config_text)
    start_the_https_server()
}

/*
    Report timetag
*/
startup_report.backend_request_time = new Date()

/*
    Actual moment of call for initial main configuration. 
*/
basic_text_fetch(current_backend_url,"POST",server_request,process_initial_configuration)

/*
    Certificates are handled locally at the time via certbot, in the future, with horizontal growth projections certificate updates have to propagate and trigger a server reset.
*/
const server_conf = {
    key: fs.readFileSync("/etc/letsencrypt/live/demian.app/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/demian.app/fullchain.pem"),
    maxCachedSessions: 5,
    keepAliveTimeout: 300,
    headersTimeout: 300,
    maxHeadersCount: 15,
    requestTimeout: 2000,
    timeout:3000
}

/*
    Timetag after local read is finished
*/
startup_report.local_read_ready = new Date()

/*
    Here we start the server with the already available resources
*/
function start_the_https_server(){
    startup_report.server_start_time = new Date()
    https.createServer(server_conf, (req, res) => {
        let report = create_report(req)
        try {
            core.serve(req,res,report,core)
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
    Run at end of startup
*/
loc_log(startup_report)

/*
    For Event reporting
*/
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

    /*
        For now we only serve www and base domain
        this can be expanded
    */
    if (req.headers.host.indexOf("www.") == 0){
         report.domain = report.host.slice(4)
         report.subdomain = "www"
    }else{
        report.domain = report.host
        report.subdomain = "/"
    }
    /*
        Report if referred
    */
    if (req.headers.referer != undefined) {
        report.referer = req.headers.referer;
    }
    return report
}