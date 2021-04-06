/*
  This section is the global housemade framework
*/
var ao = {};
ao.lng = document.documentElement.lang.slice(0,2);
function zyx(tag,thing,show){
    var default_history_length_limit = 100;
    ost(ao,"history",[]);
    ao.history.push([tag,thing,show]);
    if (show){console.log(tag,thing);};
    while (ao.history.length > default_history_length_limit) {
      ao.history.shift();
    }
};
function ost(object,newkey,content){if(object[newkey] == undefined){object[newkey] = content;return true;}else{return false;};}
function fetch_file(resource,callback) {
  var negotiator = new XMLHttpRequest();
  negotiator.open("GET",resource);
  negotiator.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          callback(this.responseText);
      };
  };
  negotiator.send();
}
function make_node(qq,container) {
    zyx("node requested",qq,false);
    ost(ao,"simple",{});
    aint_got_no_id(qq);
    var homogenizador = {
      "a":true,
      "button":"input",
      "checkbox":"input",
      "date":"input",
      "div":true,
      "file":"input",
      "h1":true,
      "h2":true,
      "h3":true,
      "h4":true,
      "h5":true,
      "h6":true,
      "input":true,
      "label":true,
      "option":true,
      "p":true,
      "path":true,
      "select":true,
      "span":true,
      "sub":true,
      "textarea":true,
      "table":true,
    };
    var node;
    var type;
    if (homogenizador[qq.nodetype] == true) {
        node = qq.nodetype;
    }else{
        node = homogenizador[qq.nodetype];
        type = qq.nodetype;
    };
    node = document.createElement(node);
    if (type != undefined) {node.type = type;};
    let pass = {
      "id":true,
      "innerText":true,
      "value":true,
      "for":true,
      "order":true,
      "width":true,
      "maxWidth":true,
      "title":true
    }
    for (let items in pass){
      if (qq[items] != undefined) {node[items] = qq[items];};  
    }
    if (qq.styles != undefined) {dress(node,qq.styles,true)};
    if (qq.path != undefined) {node.setAttribute("d", qq.path)};
    if (qq.nodetype == "a") {
      if (qq.link_text != undefined) {
        node.append(document.createTextNode(qq.link_text));
      }else{
        node.append(document.createTextNode(qq.target));
      };
      node.href = qq.target;
    };
    ost(ao.simple,qq.id,{"config":qq,"node":node,"kill":function() {
      let that_who_will_die = this.node.id;
      this.node.remove();
      delete ao.simple[that_who_will_die];
    }});
    if (container != undefined){container[qq.id] = ao.simple[qq.id];};
    zyx("node created",ao.simple[qq.id],false);
    return node;
}
function aint_got_no_id(some_config_obj){
  ost(ao,"counters",{});
  ost(ao.counters,"id",0);
  if (some_config_obj.id == undefined){
    some_config_obj.id = "aid-"+ao.counters.id;
    ao.counters.id++;
  };
}
function dress(htmlelement,classarray,trueaddfalseremove){
  for (var a = 0; a < classarray.length;a++) { 
    if (trueaddfalseremove){
      htmlelement.classList.add(classarray[a]);
    };
    if (trueaddfalseremove == false){
      htmlelement.classList.remove(classarray[a]);
    };
  };
}
function toggle_vis(element) {
    var default_initial_display_state = "flex";
    var target_handler = ao.simple[element.id];
  if (element.style.display === "none") {
      if (target_handler.config.prevdisplay != undefined) {
        element.style.display = target_handler.config.prevdisplay;
      }else{
        element.style.display = default_initial_display_state;
      }    
  } else {
    target_handler.config.prevdisplay = element.style.display;
    element.style.display = "none";
  }
}
function left_hand_menu(details) {
  var crafted_device = make_node({
    "id":"sidemenu",
    "nodetype":"div",
    "styles":["menu_container"],
    "state":"collapsed"
  });  
  let men = {
    "en":"Menu",
    "es":"Menú"
  };
  let icon = make_node({
    "id":"sidemenu_icon",
    "nodetype":"div",
    "innerText":men[ao.lng],
    "styles":["menubut"]
  });
  icon.addEventListener("click",() => {sidemenu_toggle()});
  crafted_device.append(icon);
  for (let buttons of details) {
    let entry = make_node({
      "id":"smbo-"+buttons[ao.lng],
      "nodetype":"div",
      "innerText":buttons[ao.lng],
      "styles":["menu_button"]
    });
    ost(ao,"main_menu",{});
    ost(ao.main_menu,buttons[ao.lng],ao.simple["smbo-"+buttons[ao.lng]]);
    entry.addEventListener("click",buttons.go);
    crafted_device.append(entry);
  };  
  document.body.append(crafted_device);
  integrate_home_html();
}
function sidemenu_toggle() {
  let sidemenu = ao.simple.sidemenu;
  let sidemenu_animation = {
    "target":"sidemenu",
    "type":"slide_y",
    "initial":0,
    "final":-13,
    "unit":"em",
    "fps":24,
    "duration":2
  }
  aint_got_no_id(sidemenu_animation);
  let content_animation = {
    "target":"from_home",
    "type":"slide_y",
    "initial":2,
    "final":13,
    "unit":"em",
    "fps":24,
    "duration":2
  }
  aint_got_no_id(content_animation);
  if (sidemenu.config.state == "collapsed"){
    sidemenu_animation.direction = "right";
    manual_animator(sidemenu_animation);
    content_animation.direction = "right";
    manual_animator(content_animation);
    sidemenu.config.state = "expanded";
    for (var ma_me_op in ao.main_menu) {
      let buttons_animation = {
        "target":ma_me_op,
        "type":"fade_down",
        "direction":"forward",
        "fps":12,
        "duration":2
      }
      aint_got_no_id(buttons_animation);
      //manual_animator(buttons_animation);
    }
  }else if (sidemenu.config.state == "expanded"){
    sidemenu_animation.direction = "left";
    manual_animator(sidemenu_animation);
    content_animation.direction = "left";
    manual_animator(content_animation);
    sidemenu.config.state = "collapsed"
    for (var ma_me_op in ao.main_menu) {
      let buttons_animation = {
        "target":ma_me_op,
        "type":"fade_down",
        "direction":"backward",
        "fps":12,
        "duration":2
      }
      aint_got_no_id(buttons_animation);
      //manual_animator(buttons_animation);
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
            console.log("running right");
            console.log(power);
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
            console.log("running left");
            console.log(power);
            let go = check_duration(time,power);
            if (go) {
              linear_displacer(time,power);
              power.position = (power.initial + (power.current_frame * power.d_per_frame)).toString()+power.unit;
              power.handler.node.style.left = power.position;
            }
          }
        break;
      }
    break;
    case "fade_down":
      switch (animator.direction) {
        case "forward":break;
        case "backward":break;
      }  
    break;
  }
  console.log("at_build");
  console.log(animator);
  animator.run(Date.now(),animator.id);
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
function integrate_home_html(){
  ao.simple.from_home = {"config":{"nodetype":"div"},"node":document.getElementById("from_home"),"kill":function() {
    let that_who_will_die = this.node.id;
    this.node.remove();
    delete ao.simple[that_who_will_die];
  }}
}
function linear_displacer(time,animator){
  animator.duration_ms = animator.duration * 1000;
  animator.frame_duration = framerate(animator.fps);
  animator.predicted_frames = Math.floor(duration_ms/frame_duration);
  animator.total_change = animator.final - animator.initial;
  animator.d_per_frame = total_change/predicted_frames;
  animator.current_frame = Math.floor((time - animator.start)/frame_duration);
}
function check_duration (time,animator) {
  if (time - animator.start > animator.duration*1000) {
    clearInterval(ao.render[animator.id]);
    delete ao.render[animator.id];
    return false;
  }else{return true}
};