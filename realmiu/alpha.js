/*
  Homemade framework
*/
const ao = {
  "lng":document.documentElement.lang.slice(0,2),
  "history":[],
  "default_history_length_limit":100,
  zyx (tag,thing,show) {
    this.history.push([tag,thing,show]);
    if (show){console.log(tag,thing);};
    while (this.history.length > this.default_history_length_limit) {
      this.history.shift();
    };
  },
  ost (object,newkey,content) {
    if(object[newkey] == undefined){
      object[newkey] = content;return true;
    }else{return false;};
  },
  fe (method,resource,callback,information) {
    var negotiator = new XMLHttpRequest();
    negotiator.open(method,resource);
    negotiator.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    negotiator.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        };
    };
    if (information != undefined) {
      negotiator.send(information);
    }else{
      negotiator.send();
    }    
  },
  "simple":{},
  "homogenizador":{
    "a":true,
    "button":"input",
    "checkbox":"input",
    "date":"input",
    "div":true,
    "email":"input",
    "file":"input",
    "h1":true,
    "h2":true,
    "h3":true,
    "h4":true,
    "h5":true,
    "h6":true,
    "img":true,
    "input":true,
    "label":true,
    "option":true,
    "p":true,
    "password":"input",
    "path":true,
    "script":true,
    "select":true,
    "span":true,
    "sub":true,
    "textarea":true,
    "table":true
  },
  "pass":{
    "onload":true,
    "alt":true,
    "async":true,
    "crossorigin":true,
    "defer":true,
    "id":true,
    "innerText":true,
    "value":true,
    "for":true,
    "title":true,
    "order":"style",
    "height":"style",
    "width":"style",
    "top":"style",
    "left":"style",
    "right":"style",
    "display":"style",
    "position":"style",
    "src":true,
    "alignSelf":"style",
    "fontSize":"style",
    "overflowX":"style",
    "transition":"style"
  },
  qq (qq,container) {
    this.aint_got_no_id(qq);
    var node;
    var type;
    if (this.homogenizador[qq.nodetype] == true) {
        node = qq.nodetype;
    }else{
        node = this.homogenizador[qq.nodetype];
        type = qq.nodetype;
    };
    node = document.createElement(node);
    if (type != undefined) {node.type = type;};
    for (let items in qq){
      if (this.pass[items] !=  undefined) {
        if (this.pass[items] == true) {
          node[items] = qq[items];
        }else {
          node[this.pass[items]][items] = qq[items];
        };

      };
    };
    if (qq.styles != undefined) {this.dress(node,qq.styles,true)};
    if (qq.path != undefined) {node.setAttribute("d", qq.path)};
    if (qq.nodetype == "a") {
      if (qq.link_text != undefined) {
        node.append(document.createTextNode(qq.link_text));
      }else{
        node.append(document.createTextNode(qq.target));
      };
      node.href = qq.target;
    };
    if (qq.triggers != undefined) {
      for(let items of qq.triggers){
        node.addEventListener(items[0],items[1]);
      };
    };
    this.ost(this.simple,qq.id,{"config":qq,"node":node,kill() {
      let that_who_will_die = this.node.id;
      this.node.remove();
      delete ao.simple[that_who_will_die];
    }});
    if (container != undefined){container[qq.id] = ao.simple[qq.id];};
    return node;
  },
  "counters":{
    "id":0
  },
  aint_got_no_id(some_config_obj){
    if (some_config_obj.id == undefined){
      some_config_obj.id = "aid-"+this.counters.id;
      this.counters.id++;
    };
  },
  dress(htmlelement,classarray,trueaddfalseremove){
    for (var a = 0; a < classarray.length;a++) { 
      if (trueaddfalseremove){
        htmlelement.classList.add(classarray[a]);
      };
      if (trueaddfalseremove == false){
        htmlelement.classList.remove(classarray[a]);
      };
    };
  },
  "ms":{
    "tgt":360,
    "sid":300
  },
  "adjust_list":{},
  screen_adjust() {
    this.ms.height = window.innerHeight;
    this.ms.width = window.innerWidth;  
    this.ms.columns = Math.floor(this.ms.height / this.ms.tgt);
    this.ms.rows = Math.floor(this.ms.width / this.ms.tgt);
    this.ms.c_extra = this.ms.width - (this.ms.tgt * this.ms.columns);
    this.ms.r_extra = this.ms.height - (this.ms.tgt * this.ms.rows);
    this.ms.center = [this.ms.height/2,this.ms.width/2];
    for (let things in this.adjust_list) {
      this.adjust_list[things].adjust();
    };
  },
  interface(details){
    if (ao.simple.top_bar_true == undefined) {
      let top_bar = this.qq({
        "id":"top_bar_true",
        "nodetype":"div",
        "styles":["top_bar","color_contrast_1"]
      });
      let top_button = this.qq({
        "id":"top_button",
        "nodetype":"div",
        "innerText":String.fromCharCode(9776),
        "triggers":[["click",(e)=>{
          openNav();
        }]]
      });
      top_bar.append(top_button);
      document.body.append(top_bar);
      let sidenav = this.qq({
        "id":"sidenav",
        "nodetype":"div",
        "styles":["sidenav","color_contrast_2"]
      });
      let close_area = this.qq({
        "id":"sliding_closer",
        "nodetype":"div",
        "innerText":String.fromCharCode(9776),
        "styles":["second_bar","color_contrast_1"],
        "triggers":[["click",(e)=>{
          closeNav();
        }]]
      });
      sidenav.append(close_area);
      let spacer_entry = this.qq({
        "id":"spacer_entry",
        "nodetype":"div",
        "styles":["side_opt"]
      });
      sidenav.append(spacer_entry);
      for (let buttons of details) {
        let entry = this.qq({
          "id":"smbo-"+buttons[this.lng],
          "nodetype":"div",
          "innerText":buttons[this.lng],
          "styles":["side_opt"],
          "triggers":[["click",buttons.go]]
        });
        sidenav.append(entry);
      };  
      document.body.append(sidenav);
    }else{
      let sidenav = ao.simple.sidenav.node;
      for (let buttons of details) {
        let entry = this.qq({
          "id":"smbo-"+buttons[this.lng],
          "nodetype":"div",
          "innerText":buttons[this.lng],
          "styles":["side_opt","smaller","color_contrast_5"],
          "triggers":[["click",buttons.go]]
        });
        sidenav.append(entry);
      };
    }
  },
  "flow":{}
};
function openNav() {
  document.getElementById("sidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}
function controller_simple_delete(node) {
  for (let content in node) {
    node[content].kill();
  }
}