/*
  Proven base framework
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
  fe (resource,callback) {
    var negotiator = new XMLHttpRequest();
    negotiator.open("GET",resource);
    negotiator.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        };
    };
    negotiator.send();
  },
  "simple":{},
  "homogenizador":{
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
    "table":true
  },
  "pass":{
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
    "alignSelf":"style",
    "fontSize":"style",
    "overflowX":"style",
    "transition":"style"
  },
  qq (qq,container) {
    this.aint_got_no_id(qq);
    console.log(qq)
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
        console.log("items: ",items);
        if (this.pass[items] == true) {
          console.log("transmision limpia");
          node[items] = qq[items];
        }else {
          console.log("transmision de estilo");
          console.log("qq[items]: ",qq[items]);
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
    if (qq.color_set != undefined && color_sets != undefined){
      node.style.color = color_sets[qq.color_set].color;
      node.style.backgroundColor = color_sets[qq.color_set].background;
    } 
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
  "facets":{},
  make_facet(simple){
    this.ost(simple,"superstatus",{});
    simple.superstatus.facet = "";
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
  "if":{
    "top":{},
    "top_button":{},
    "slider":{},
    "buttons":{}
  },
  interface(details){
    document.getElementById("from_home").remove();
    document.body.classList.add("background");
    let top_bar = this.qq({
      "id":"top_bar",
      "nodetype":"div",
      "styles":["top_bar","color_contrast_1"]
    });
    let top_button = this.qq({
      "id":"top_button",
      "nodetype":"div",
      "innerText":String.fromCharCode(9776),
      "fontSize":"150%",
      "triggers":[["click",(e)=>{
        openNav();
        console.log(e);
        console.log(this);
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
      "color_set":5,
      "styles":["color_contrast_1","closebtn"],
      "triggers":[["click",(e)=>{
        console.log(e);
        console.log(this);
      }]]
    });
    sidenav.append(close_area);
    for (let buttons of details) {
      let entry = this.qq({
        "id":"smbo-"+buttons[this.lng],
        "nodetype":"div",
        "innerText":buttons[this.lng],
        "styles":["color_contrast_3"],
        "triggers":[["click",buttons.go]]
      },this.if.options);
      sidenav.append(entry);
    };  
    document.body.append(sidenav);
  },

  "motor":{},
  animate(animator) {
    this.aint_got_no_id(animator);
    this.motor[animator.id] = animator;
    animator.sid = requestAnimationFrame(animator.go());
  }
};
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

function openNav() {
  document.getElementById("sidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}