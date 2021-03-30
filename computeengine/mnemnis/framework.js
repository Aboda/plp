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
    if (qq.id != undefined) {node.id = qq.id;};
    if (qq.innerText != undefined) {node.innerText = qq.innerText;};
    if (qq.value != undefined) {node.value = qq.value;};
    if (qq.for != undefined) {node.for = qq.for;};
    if (qq.order != undefined) {node.style.order = qq.order;};
    if (qq.width != undefined) {node.style.width = qq.width;};
    if (qq.maxWidth != undefined) {node.style.maxWidth = qq.maxWidth;};
    if (qq.styles != undefined) {dress(node,qq.styles,true)};
    if (qq.path != undefined) {node.setAttribute("d", qq.path)};
    if (qq.nodetype == "a") {
      if (qq.link_text != undefined) {
        node.append(document.createTextNode(qq.link_text));
      }else{
        node.append(document.createTextNode(qq.target));
      };
      node.href = qq.target;
      if (qq.title != undefined) {node.title = qq.title;};
    };
    ost(ao.simple,qq.id,{"config":qq,"node":node,"kill":function() {
      let that_who_will_die = this.node.id;
      ao.simple[that_who_will_die].node.remove();
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
  var chosen_lng = document.documentElement.lang.slice(0,2);
  var crafted_device = make_node({
    "id":"sidemenu",
    "nodetype":"div",
    "styles":["sidemenu_container_collapsed"],
    "state":"collapsed"
  })
  document.body.append(crafted_device);
  var icon = make_node({
    "id":"sidemenu_icon",
    "nodetype":"p",
    "innerText":" "+String.fromCharCode("9965")+" ",
    "styles":["big_letter","color_contrast_2"]
  })
  crafted_device.append(icon);
  for (var buttons of details) {
    var entry = make_node({
      "id":"smbo-"+buttons[chosen_lng],
      "nodetype":"div",
      "innerText":buttons[chosen_lng],
      "styles":["disappear","color_contrast_1"]
    })
    ost(ao,"main_menu",{});
    ost(ao.main_menu,buttons[chosen_lng],ao.simple["smbo-"+buttons[chosen_lng]]);
    entry.addEventListener("click",buttons.go);
    crafted_device.append(entry);
  }
  icon.addEventListener("click",() => {sidemenu_toggle()});
}
function sidemenu_toggle() {
  var sidemenu = ao.simple.sidemenu;
  var big_letter = ao.simple.sidemenu_icon;
  big_letter.node.classList.toggle("color_contrast_2");
  big_letter.node.classList.toggle("color_contrast_3");
  if (sidemenu.config.state == "collapsed"){
    sidemenu.config.state = "expanded";
    sidemenu.node.classList.toggle("sidemenu_container_collapsed");
    sidemenu.node.classList.toggle("sidemenu_container_expanded");
    for (var ma_me_op in ao.main_menu) {
      let affected = ao.main_menu[ma_me_op].node;
      affected.classList.toggle("disappear");
      affected.classList.toggle("shown_sidemenu_option");
    }
  }else if (sidemenu.config.state == "expanded"){
    sidemenu.config.state = "collapsed"
    sidemenu.node.classList.toggle("sidemenu_container_expanded");
    sidemenu.node.classList.toggle("sidemenu_container_collapsed");
    for (var ma_me_op in ao.main_menu) {
      let affected = ao.main_menu[ma_me_op].node;
      affected.classList.toggle("shown_sidemenu_option");
      affected.classList.toggle("hidden_sidemenu_option");
      setTimeout(function(){
        if (affected.classList.contains("hidden_sidemenu_option")){
          affected.classList.toggle("hidden_sidemenu_option");
          affected.classList.toggle("disappear");
        }
      }, 999,affected);
    };
  };
};
