/*
  This section is the global housemade framework
*/
var ao = {};
function zyx(tag,thing,show){
    var default_history_length_limit = 100;
    ost(ao,"history",[]);
    ao.history.push([tag,thing,show]);
    if (show){console.log(tag,thing);};
    while (ao.history.length > default_history_length_limit){
      ao.history.shift();
    }
};
function ost(object,newkey,content){if(object[newkey] == undefined){object[newkey] = content;return true;}else{return false;};}
function fetch_file(filename,callback) {
  var negotiator = new XMLHttpRequest();
  negotiator.open("GET",filename);
  negotiator.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          callback(this.responseText);
      };
  };
  negotiator.send();
}
function make_node(qq) {
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
    if (qq.id != undefined) {node.id = qq.id;};
    if (qq.innerText != undefined) {node.innerText = qq.innerText;};
    if (qq.value != undefined) {node.value = qq.value;};
    if (qq.for != undefined) {node.for = qq.for;};
    if (qq.order != undefined) {node.style.order = qq.order;};
    if (qq.width != undefined) {node.style.width = qq.width;};
    if (qq.maxWidth != undefined) {node.style.maxWidth = qq.maxWidth;};
    if (qq.styles != undefined) {dress(node,qq.styles,true)};
    if (qq.path != undefined) {node.setAttribute("d", qq.path)};
    ost(ao.simple,qq.id,{"config":qq,"node":node,"kill":function(){
      var handler = ao.simple[this.config.id].node.remove();
      delete ao.simple[this.config.id];
    }});
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

let details = [
  {
    "es":"Entretenimiento",
    "en":"Entertainment"
  },
  {
    "es":"Reflexión",
    "en":"Reflection"
  },
  {
    "es":"Trabajo",
    "en":"Work"
  },
  {
    "es":"Preferencias",
    "en":"Preferences"
  },
  {
    "es":"Perfil",
    "en":"Profile"
  },
  {
    "es":"Ayuda",
    "en":"Help"  
  }
]

function left_hand_menu(details){
  var chosen_lng = document.documentElement.lang.slice(0,2);
  var crafted_device = make_node({
    "id":"sidemenu",
    "nodetype":"div",
    "styles":["sidemenu_displayed"]
  })
  document.body.append(crafted_device);
  var icon = make_node({
    "id":"sidemenu_icon",
    "nodetype":"p",
    "innerText":"&#9965;",
    "styles":["sidemenu_icon"]
  })
  crafted_device.append(icon);
  for (var buttons of details) {
    var entry = make_node({
      "id":"smbo-"+buttons[chosen_lng],
      "nodetype":"div",
      "innerText":buttons[chosen_lng],
      "styles":["menu_option_displayed"]
    })
    crafted_device.append(entry);
  }
  crafted_device.addEventListener("click",console.log(this.id));
}


left_hand_menu(details);