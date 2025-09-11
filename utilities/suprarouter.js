/*
    Each application migh have its own logic to be served, there is no default exploration of the source data other than the attempt to load a router.js file

    this is what the service_type in metadata is for

    applications are complex tools that often require authentication and user management
    websites are more static and simple, often just a presentation layer

    service name is the preferred internal identifier

    serve_as is the domain or subdomain where the application will be served

    source_folder is the path to the application folder root

    shorthand is a short identifier for the application, used in internal routing and tools
*/

const infra = require("./infra.js");
const path = require("path");
/*
    Paths use the __dirname, ad start at utilities
*/
const metadata = [
    {
        desc:"Inventory Management Tool",
        service_type: "application",
        service_name: "gvss",
        serve_as: "gvss.demian.app",
        source_folder:"../din/gvss"
    },
    /*
    {
        desc:"Social Media Management Tool",
        service_type: "application",
        service_name: "soma",
        serve_as: "soma.demian.app",
        source_folder:"../din/soma"
    },
    {
        desc:"Admin interface for the platform",
        service_type: "application",
        service_name: "admin",
        serve_as: "demian.app",
        source_folder:"../din/adm"
    },
    {
        desc:"Homesite, about me and my services",
        service_type: "website",
        service_name: "demian",
        serve_as: "www.demian.app",
        source_folder: "../din/demian"
    },
    {
        desc:"Internet stories in 5 minutes",
        service_type: "website",
        service_name: "historiasen5minutos",
        serve_as: "historiasen5minutos.com",
        source_folder: "../din/historiasen5minutos"
    },
    {
        desc:"Artist Blog and Portfolio",
        service_type: "website",
        service_name: "neorrey",
        serve_as: "neorrey.art",
        source_folder: "../din/neorrey"
    },
    {
        desc:"Fiction Site",
        service_type: "website",
        service_name: "remansonocturno",
        serve_as: "remansonocturno.com",
        source_folder: "../din/remansonocturno"
    },
    {
        desc:"Personal Integration Site",
        service_type: "website",
        service_name: "senderoholistico",
        serve_as: "senderoholistico.com",
        source_folder: "../din/senderoholistico",
    }
    */
]


/*
    each path is only meant to connect a subdomain+domain in the server to the proper application
    each application will have its own "manager" and or general presentation tools based on the server
*/
let apps = {};

for(let app of metadata) {
    try{
        const router_path = path.join(__dirname,app.source_folder,"router.js");
        console.log("attempting load of router for "+router_path)
        apps[app.serve_as] = require(router_path);
    }catch(e) {
        console.error("No router found for " + app.serve_as,e);
        apps[app.serve_as] = {router:infra.default_router}
    }    
}

async function suprarouter(req,res) {
    /*
        Gate guard is only meant to defend against ddos, and brute force trough rate limiting
        it is not meant to be a security layer, that is the responsibility of each application
        this is just to avoid unnecessary load on the server from malicious or disfunctional sources

        At some point the gate guard will be expanded to enable the google firewall service against repeated offenders
        and to manage an automatic cool timeout for ips to be de-blacklisted
    */
    let call_report = infra.gate_guard(req);
    if(!call_report.a) {
        infra.reply_request_throttled(req,res);
        return;
    }

    /*
        Step 1, to assert the router to use we will use the subdomain + domain
        the domain demian.app, can have a website running while www.demian.app can have an application and so on
        this way we can have multiple services running in the same domain, which can be easily severed and run on their own if needed
        we will use direct comparison with the strings used above as serve_as:

        eg: www.demian.app -> admin application
            gvss.demian.app -> gvss application
            demian.app -> demian.app website
    */

    let host = req.headers.host.split(":")[0]; // remove port if any
    call_report.host = host;
    if(host in apps) {
        // we should have a router for this domain/subdomain
        await apps[host].router(req,res,infra,call_report);
    } else {
        // no router found for this domain/subdomain
        call_report.reply_code = "404"
        infra.reply_resource_not_found(req,res);
    } 
    console.log(call_report);
}

module.exports = suprarouter;