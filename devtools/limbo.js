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

  
function sidemenu_toggle() {
  let content_animation = {
    "target":"from_home",
    "type":"slide_y",
    "initial":2,
    "final":13,
    "unit":"em",
    "fps":50,
    "duration":.8
  }
  aint_got_no_id(content_animation);
  let sidemenu_animation = {
    "target":"sidemenu",
    "type":"slide_y",
    "initial":-13,
    "final":2,
    "unit":"em",
    "fps":50,
    "duration":.8
  }
  aint_got_no_id(sidemenu_animation);
  let sidemenu = ao.simple.sidemenu;
  if (sidemenu.config.state == "collapsed") {
    sidemenu_animation.direction = "right";
    manual_animator(sidemenu_animation);
    content_animation.direction = "right";
    manual_animator(content_animation);
    sidemenu.config.state = "expanded";
    for (var ma_me_op in ao.main_menu) {
      let buttons_animation = {
        "target":ma_me_op,
        "type":"fade_color",
        "direction":"up",
        "fps":30,
        "duration":1
      };
      aint_got_no_id(buttons_animation);
      manual_animator(buttons_animation);
    };
  }else if (sidemenu.config.state == "expanded"){
    sidemenu_animation.direction = "left";
    manual_animator(sidemenu_animation);
    content_animation.direction = "left";
    manual_animator(content_animation);
    sidemenu.config.state = "collapsed"
    for (var ma_me_op in ao.main_menu) {
      let simple = ao.main_menu[ma_me_op];
      let computed = window.getComputedStyle(simple.node);
      simple.config.original_color = peel_rgb(computed.color);
      simple.config.original_backgroundColor = peel_rgb(computed.backgroundColor);
      let buttons_animation = {
        "target":ma_me_op,
        "type":"fade_color",
        "direction":"down",
        "fps":30,
        "duration":1
      };
      aint_got_no_id(buttons_animation);
      manual_animator(buttons_animation);
    };
  };
}
function manual_animator (animator) {
  ost(ao,"anima",{});
  ao.anima[animator.id] = animator;
  animator.handler = ao.simple[animator.target];
  animator.start = Date.now();
  switch (animator.type) {
    case "slide_y":
      switch (animator.direction) {
        case "right":
          animator.run = (time,id) => {
            let power = ao.anima[id];
            let go = check_duration(time,power);
            if (go) {
              linear_displacer(time,power);
              power.position = (power.initial + (power.current_frame * power.d_per_frame)).toString()+power.unit;
              power.handler.node.style.left = power.position;
            }
          }
        break;
        case "left":
          animator.run = (time,id) => {
            let power = ao.anima[id];
            let go = check_duration(time,power);
            if (go) {
              linear_displacer(time,power);
              power.position = (power.final - (power.current_frame * power.d_per_frame)).toString()+power.unit;
              power.handler.node.style.left = power.position;
            }
          }
        break;
      }
    break;
    case "fade_color":
      switch (animator.direction) {
        case "up":
          animator.run = function (time,id) {
            let power = ao.anima[id];
            let go = check_duration(time,power);
            if (go) {
              from_to_gray(time,power);
              power.current = {};
              for (let entries in power.originals){
                let t = "rgb(";
                for (let values of power.originals[entries]){
                  power.current[entries] = power.current[entries] ;
                }
                power.current[entries] = t;
              }
            }
          }
        break;
        case "down":
          animator.run = (time,id) => {
            let power = ao.anima[id];
            let go = check_duration(time,power);
            if (go) {
              from_to_gray(time,power);
            }
          }
        break;
      }  
    break;
  }
  path_timer(animator);
}
/*
  Devuelve el número de milisegundos por frame
  a los fps´s solicitados
*/
function framerate(fps){
  if (fps == undefined || fps == 0 || fps > 60) {
    fps = 60;
  }
  return 1000/fps
}
/*
  Coloca a animator en un ciclo cada n milisegundos 
  entre mil y 16 deacuerdo al fps solicitado
*/
function path_timer(animator){
  ost(ao,"render",{});
  ao.render[animator.id] = setInterval(function(){
    animator.run(Date.now(),animator.id);
  }, framerate(animator.fps),animator);
}
function check_duration (time,animator) {
  if (time - animator.start > animator.duration*1000) {
    clearInterval(ao.render[animator.id]);
    delete ao.render[animator.id];
    delete ao.anima[animator.id];
    return false;
  }else{return true}
};
function linear_displacer(time,animator){
  animator.duration_ms = animator.duration * 1000;
  animator.frame_duration = framerate(animator.fps);
  animator.predicted_frames = Math.floor(animator.duration_ms/animator.frame_duration);
  animator.total_change = animator.final - animator.initial;
  animator.d_per_frame = animator.total_change/animator.predicted_frames;
  animator.current_frame = Math.floor((time - animator.start)/animator.frame_duration);
}

function from_to_gray (time,animator) {
  animator.duration_ms = animator.duration * 1000;
  animator.frame_duration = framerate(animator.fps);
  animator.predicted_frames = Math.floor(animator.duration_ms/animator.frame_duration);
  let originals = {
    "color":animator.handler.config.original_color,
    "backgroundColor":animator.handler.config.original_backgroundColor
  };
  animator.total_change = {}
  for (let areas in originals) {
    animator.total_change[areas] = [];
    for (let value of originals[areas]){
      if (value == 180) {
        animator.total_change[areas].push(0);
      }else if (value > 180) {   
        animator.total_change[areas].push(value - 180);
      }else if (value < 180) {   
        animator.total_change[areas].push(180 - value);
      }
    }
  };
  animator.d_per_frame = {};
  for (let areas in animator.total_change) {
    animator.d_per_frame[areas] = []
    for (let value of animator.total_change[areas]){
      animator.d_per_frame[areas].push(value/animator.predicted_frames);
    }
  }  
  animator.current_frame = Math.floor((time - animator.start)/animator.frame_duration);
};

function peel_rgb(rgbstring){
  let process;
  let processed = [];  
  process = rgbstring.slice(rgbstring.indexOf("("));
  process = process.slice(0,process.length);
  process = process.split(",");
  for (let items of process) {
    processed.push(items.trim());
  }
  return processed;
}

function send_to_collection () {
  //Este es para enviar cosas directamente a un gscript, el problema es cors
  let test_data = {
      "timestamp":Date.now().toString(),
      "message":"hola"
  }
  let collectos = "https://script.google.com/macros/s/AKfycbzIePzuXLQWFslJv03RzQDQWGC9zMNRQt2_63cw7BaEUSQqQPZwFvSDszK5yI7WZFaa/exec";
  ao.fe("POST",collectos,console.log,JSON.stringify(test_data));
}

    /*
    Este parece ser solopara la autenticación de oauth2, vs el client que es la librería sdk completa
    document.getElementsByTagName('head')[0].appendChild(ao.qq({
        "nodetype":"script",
        "async":true,
        "defer":true,
        "src":"https://apis.google.com/js/platform.js"
    }));
    */  