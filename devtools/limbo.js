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
var html_error_reporter = porter.spawn();
html_error_reporter.start(rep);
var found = false;
for (domain in valid_domains) {
    if (req.headers.host.indexOf(domain) != -1) {
        found = true;
        rep.step = "out_to_router";
        html_error_reporter.tag("out_to_router");
        valid_domains[domain].route(req,res,rep,rf,fs,html_error_reporter);
        rep.step = "complete_without_errors";
        tag_out(rep);
        break;
    }
}
if (found == false) {
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
        "html":html_langopts[rep.languaje],
        "robo":false
    }
    res.writeHead(300);
    res.end(rf.craft(options));
    rep.step = "no_domain_match_redirect";
    rep.headers = req.headers;
    tag_out(rep);
}



let plane_manager = {
    "holder":{},
    "cre_pla":(resus) => {
      let new_plane = {
        "parts":{},
        "para":resus
      }
      new_plane.node = make_node({"nodetype":div,"styles":["facet"]},new_plane.parts);
      this.holder[resus.device] = new_plane;
      return new_plane;
    },
    "pla_han":()=>{let count;for (let items in holder) {count++;};return count;},
    "set_pos":(device_name,position)=>{
      this.holder[device_name].para.z = position;
      this.holder[device_name].node.style.zIndex = position;
    },
    "kil_vis":(device_name)=>{
      this.holder[device_name].para.vis = "transparent";
      this.holder[device_name].node.style.backgroundColor = rgb(0,0,0,0);
      this.holder[device_name].node.style.color = rgb(0,0,0,0);
    },
    "res_vis":(device_name)=>{
      this.holder[device_name].para.vis = "reset";
      this.holder[device_name].node.style.backgroundColor = null;
      this.holder[device_name].node.style.color = null;
    }
  };
  
  function make_shapes (placehere,start,end) {
    let contenedor = document.createElement("div");
    contenedor.classList.add("shapes_cont");
    placehere.append(contenedor);
    for (let i = start; i < end; i++) {
        let bloque = document.createElement("div");
        bloque.innerText = String.fromCharCode(i);
        contenedor.append(bloque);    
    }
  }