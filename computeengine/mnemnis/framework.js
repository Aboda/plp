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
        "button":"input",
        "checkbox":"input",
        "date":"input",
        "file":"input",
        "div":true,
        "input":true,
        "select":true,
        "option":true,
        "textarea":true,
        "label":true,
        "table":true,
        "p":true,
        "a":true,
        "span":true,
        "sub":true,
        "h1":true,
        "h2":true,
        "h3":true,
        "h4":true,
        "h5":true,
        "h6":true,
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
    "styles":["sidemenu_collapsed"]
  })
  document.body.append(crafted_device);
  var icon = make_node({
    "id":"sidemenu_icon",
    "nodetype":"div"
  })
  crafted_device.append(icon);
  icon.innerHTML = '<path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path>';
  for (var buttons of details) {
    var entry = make_node({
      "id":"smbo-"+buttons[chosen_lng],
      "nodetype":"div",
      "innerText":buttons[chosen_lng],
      "styles":["menu_option_collapsed"]
    })
    crafted_device.append(entry);
  }
  crafted_device.addEventListener("click",console.log(this.id));
}

left_hand_menu(details);