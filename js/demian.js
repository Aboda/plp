
var d = {};

window.onload = function () {
  check_load_params ();
  if (d.lng == undefined) {
    elige_lenguaje();
  }else{
    page_base();
    plp();
  }
}

function check_load_params () {
  zyx("loaded url",window.location,true);
  if (window.location.search.length > 0) {
    zyx("check_load_params search string:",window.location.search,true);
    if (window.location.search.includes("lng")) {
      var required_languaje = window.location.search.substring(window.location.search.indexOf("lng")+4,window.location.search.indexOf("lng")+6);
      zyx("check_load_params languaje requested:",required_languaje,true);
      if (required_languaje == "en" || required_languaje == "es") {
        d.lng = required_languaje;
      }
    }  
  }else{
    zyx("check_load_params:","no search string",true);
  }
}

function elige_lenguaje () {
  var modulo = {
    "Pick Languaje":{
      "elclas":"simple_div",
      "styles":["main_adaptive_options_container"],
      "order":0,
      "cnt":{
        "Pick English":{
          "elclas":"adaptive_option",
          "styles":["one_of_two_opts"],
          "innerText":"English",
          "order":0,
          "dynamics":{
            "type":"set_languaje",
            "value":"en"
          }
        },
        "Elige Español":{
          "elclas":"adaptive_option",
          "styles":["one_of_two_opts"],
          "innerText":"Español",
          "order":1,
          "dynamics":{
            "type":"set_languaje",
            "value":"es"
          }
        }
      }
    }
  }
  render(modulo,document.body);
}

function page_base () {
  var modulo = {
    "Lienzo General":{
      "elclas":"simple_div",
      "order":0,
      "styles":["default_scroll"],
      "cnt":{
        "Título Página":{
          "elclas":"languajed_div",
          "styles":["title"],
          "texts":{
            "es":"portafolio laboratorio personal",
            "en":"personal laboratory portfolio"
          },
          "order":0
        },
        "Area Interacción":{
          "elclas":"simple_div",
          "styles":["default_scroll"],
          "order":1,
        },
        "Nota al Pie":{
          "elclas":"languajed_div",
          "styles":["footnote"],
          "texts":{
            "es":"Este sitio está programadoen HTML/CSS/Javascript sin frameworks y hecho disponible a travez de los servicios de nube de Google",
            "en":"This site is made in HTML/CSS/Javascript without frameworks and made available trough Google Cloud Services"
          },
          "order":2,
        }
      }
    }
  }
  render(modulo,document.body);
}

function plp () {
  var modulo = {
    "Organizador Inicial":{
      "elclas":"simple_div",
      "order":0,
      "styles":["default_scroll"],
      "cnt":{

        "Acerca de mi":{
          "elclas":"main_opt_card",
          "order":0,
          "texts":{
            "es":"Acerca de mi",
            "en":"About me"
          },
          "dynamics":{
            "type":"expand_main_opt",
            "styles":["card_space"],
            "texts":{
              "es":"¿Quién soy?,¿Qué es esto?,¿Porque lo hago?",
              "en":"Who am I?, What is this?, Why am I doing it?"
            }
          },

          "cnt":{

            "Presentación general":{
              "elclas":"sub_opt_card",
              "order":0,
              "texts":{
                "es":{
                  "title":"Presentación Personal",
                  "descrip":"Carta abierta al público"
                },
                "en":{
                  "title":"Self introduction",
                  "descrip":"Open letter to the reader"
                }
              },
              "dynamics":{
                "type":"local_reader",
                "data":"carta_abierta.txt"
              }
            },
            "Historial Laboral":{
              "elclas":"sub_opt_card",
              "order":1,
              "texts":{
                "es":{
                  "title":"Experiencia Laboral",
                  "descrip":"Linea de tiempo profesional"
                },
                "en":{
                  "title":"Work Experience",
                  "descrip":"Professional timeline"
                }
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            },
            "Contacto":{
              "elclas":"sub_opt_card",
              "order":2,
              "texts":{
                "es":{
                  "title":"Contacto",
                  "descrip":"Envíame un mensaje con tu consulta y método de contacto"
                },
                "en":{
                  "title":"Contact",
                  "descrip":"Send me a message with your inquiry and contact method"
                }
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            }
          }
        },
        "Contenidos y Redes Sociales":{
          "elclas":"main_opt_card",
          "order":0,
          "texts":{
            "es":"Contenidos y Redes Sociales",
            "en":"Content and Social Networks",
          },
          "dynamics":{
            "type":"expand_main_opt",
            "styles":["card_space"],
            "texts":{
              "es":"Creación de contenidos contextuales a la plataforma y audiencia",
              "en":"Creation of platform/audience appropiate contents"
            }
          },
          "cnt":{
            "Sendero Holístico":{
              "elclas":"sub_opt_card",
              "order":0,
              "texts":{
                "es":{
                  "title":"Sendero Holístico",
                  "descrip":"Entorno de reflexión y exploración personal"
                },
                "en":{
                  "title":"Holistic Path",
                  "descrip":"Personal exploration and self-reflection space"
                },
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            },
            "Remanso Nocturno":{
              "elclas":"sub_opt_card",
              "order":1,
              "texts":{
                "es":{
                  "title":"Remanso Nocturno",
                  "descrip":"Ficción, fantasía y conversación."
                },
                "en":{
                  "title":"Night Haven",
                  "descrip":"Fiction, fantasy and conversation"
                }
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            },
            "Facebook":{
              "elclas":"sub_opt_card",
              "order":2,
              "texts":{
                "es":{
                  "title":"Facebook",
                  "descrip":"Manejo de Red Social." 
                },
                "en":{
                  "title":"Facebook",
                  "descrip":"Social Media Management."
                }
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            }
          }
        },
        "Web: Desarrollo, Hosting, Apps y Analytics":{
          "elclas":"main_opt_card",
          "order":1,
          "texts":{
            "es":"Web: Desarrollo, Hosting, Apps y Analytics",
            "en":"Web: Development, Hosting and Analytics",
            "innerText":"Full stack web page development, hosting, and constant analytics evaluation"
          },
          "dynamics":{
            "type":"expand_main_opt",
            "styles":["card_space"],
            "texts":{
              "es":"Desarrollo de páginas web y operación de infraestructura habilitante",
              "en":"Full stack web page development, hosting, and constant analytics evaluation"
            }
          },
          "cnt":{
            "Contenidos Estáticos":{
              "elclas":"sub_opt_card",
              "order":0,
              "texts":{
                "es":{
                  "title":"Contenidos Estaticos",
                  "descrip":"Uso de los servicios de Cloud Bucket, Load Balancer y Google Domains para entrega de bajo costo." 
                },
                "en":{
                  "title":"Static Content",
                  "descrip":"Google Cloud Bucket, Load Balancer and Domains used for low cost simple page distribution" 
                }
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            },
            "Contenidos Dinámicos":{
              "elclas":"sub_opt_card",
              "order":1,
              "texts":{
                "es":{
                  "title":"Contenidos Dinámicos",
                  "descrip":"Uso de los servicios de Virtual Machine, Static IP Address y Google Domains para montar un servidor Debian/NodeJS" 
                },
                "en":{
                  "title":"Dynamic Content",
                  "descrip":"Google Virtual Machine, Static IP Address and Domains to deliever a Debian|Node server backend" 
                }
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            }
          }
        },
        "Automatización y Programación":{
          "elclas":"main_opt_card",
          "order":2,
          "texts":{
            "es":"Automatización y Desarrollo",
            "en":"Automation and Development",
          },
          "dynamics":{
            "type":"expand_main_opt",
            "styles":["card_space"],
            "texts":{
              "es":"Soluciones digitales enfocadas a necesidades específicas",
              "en":"Digital solutions focused to solve specific needs"
            }
          },
          "cnt":{
            "Javascript":{
              "elclas":"sub_opt_card",
              "order":0,
              "texts":{
                "es":{
                  "title":"Javascript",
                  "descrip":"Alcances de experiencia con lenguaje" 
                },
                "en":{
                  "title":"Javascript",
                  "descrip":"Languaje experience so far" 
                }
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            },
            "Entorno Google":{
              "elclas":"sub_opt_card",
              "order":0,
              "texts":{
                "es":{
                  "title":"Entorno Google",
                  "descrip":"Explotación de Google Apps Scripts para generar flujos automatizados que puedan hacer uso de Gmail, Docs, Maps, Mail, Calendar con automatización."
                },
                "en":{
                  "title":"Google Environment",
                  "descrip":"Integration of automatization with Apps Scripts to use Google´s Gmail, Docs, Maps, Mail, Calendar services"
                }
              },
              "dynamics":{
                "type":"nav_to",
                "target":""
              }
            }
          }
        }
      }
    }
  }
  render(modulo,document.getElementById("Area Interacción"));
}

function render(structure,output,parent) {
  zyx("render input",{structure,output,parent},false);

  for (var name in structure) {
    var item = structure[name];
    var built;
    switch(item.elclas) {

      case "simple_div":
        built = make_node({
          "nodetype":"div",
          "id":name,
          "order":item.order,
          "styles":item.styles});
      break;

      case "adaptive_option":
        built = make_node({
          "nodetype":"div",
          "id":name,
          "order":item.order,
          "styles":item.styles,
          "innerText":item.innerText,
          "dynamics":item.dynamics});
      break;

      case "languajed_div":
        built = make_node({
          "nodetype":"div",
          "id":name,
          "order":item.order,
          "styles":item.styles,
          "innerText":item.texts[d.lng]});
      break;

      case "main_opt_card":

        built = make_node({
          "nodetype":"div",
          "id":name,
          "order":item.order,
          "styles":["default_card","card_space"],
          "innerText":item.texts[d.lng],
          "dynamics":item.dynamics
        });
        
      break;

      case "sub_opt_card":
        built = make_node({
          "nodetype":"div",
          "id":name,
          "order":item.order,
          "styles":[
            "sub_opt_card",
            "card_space",
            "clickable"]});

        built.append(make_node({
          "nodetype":"h3",
          "innerText":item.texts[d.lng].title}));

        built.append(make_node({
          "nodetype":"div",
          "innerText":item.texts[d.lng].descrip}));
        
        toggle_vis(built);
      break;
      

      default:
        throw {"error":"unknown elclas "+item.elclas}
    };

    if (item.dynamics != undefined) {

      if (item.dynamics.type == "set_languaje") {
        built.addEventListener("click",function(){
          var item = d.simple[this.id];
          d.lng = item.config.dynamics.value;
          var section_cont = d.simple[item.node.parentNode.id]
          section_cont.kill();
          page_base();
          plp();
        });
      }

      if (item.dynamics.type == "expand_main_opt") {
        var expanded_text = make_node({
          "nodetype":"div",
          "id":name+"-extra_content",
          "styles":item.dynamics.styles,
          "innerText":item.dynamics.texts[d.lng]
        });
        toggle_vis(expanded_text);
        built.append(expanded_text);
        built.addEventListener("click",function(e) {
            if(e.target !== e.currentTarget) return;
            for (var i = 1; i < this.childNodes.length ; i++) {
                toggle_vis(this.childNodes[i]);
            };
          var position = Array.from(this.parentNode.children).indexOf(this);
          zyx("son number:",{position},true);

          for (var j = 0; j < this.parentNode.childNodes.length ; j++) {
            if (j != position) {
                toggle_vis(this.parentNode.childNodes[j]);
            }else{
                zyx("ignored:",this.parentNode.childNodes[j],true);  
            };
          };

          var this_handler = d.simple[this.id];
          if (this_handler.config.up != true) {
                this.classList.add("header")
                this.classList.replace("default_card", "up_card")
                this_handler.config.up = true;
          }else{
                this.classList.remove("header")
                this.classList.replace("up_card", "default_card")
                this_handler.config.up = false
          }
        })
      }

      if (item.dynamics == "local_reader") {
        var requested_container = make_node({
          "nodetype":"div",
          "id":name+"-reader_container",
          "styles":["flex_col"]
        });
        toggle_vis(requested_container);
        built.append(requested_container);
        var close_button = make_node({
          "nodetype":"div",
          "id":name+"-close_button",
          "styles":["corner_X"]
        });
        requested_container.append(close_button);
        var text_area = make_node({
          "nodetype":"div",
          "id":name+"-text_area"
        });
        requested_container.append(text_area);
      }

    }//item dynamics
  


    zyx("render: built",{name,item,built,parent},true);
    output.append(built);

    if (parent != undefined) {
      d.simple[name].parent = parent;
    }else{
      d.simple[name].parent = false;
    };

    if (item.cnt != undefined) {
      render(item.cnt,built,name);
    };
  };
}

function zyx(tag,thing,show){if (show){console.log(tag,thing);};};
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
    zyx("node requested",{qq},false);
    ost(d,"simple",{});
    aint_got_no_id(qq);
    var homogenizador = {
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
      "button":"input",
      "checkbox":"input",
      "date":"input",
      "file":"input",
      "sub":true,
      "h1":true,
      "h2":true,
      "h3":true,
      "h4":true,
      "h5":true,
      "h6":true,
    };
    var node;var type;
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
    ost(d.simple,qq.id,{"config":qq,"node":node,"kill":function(){
      var handler = d.simple[this.config.id].node.remove();
      delete d.simple[this.config.id];
    }});
    zyx("node created",d.simple[qq.id],false);
    return node;
}  
function aint_got_no_id(some_config_obj){
  ost(d,"counters",{});
  ost(d.counters,"id",0);
  if (some_config_obj.id == undefined){
    some_config_obj.id = "aid-"+d.counters.id;
    d.counters.id++;
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

function set_background_heigth () {
  var bodyStyles = document.body.style;
  bodyStyles.setProperty('--cpa', window.innerHeight+"px");
}

function toggle_vis(element) {
    var target_handler = d.simple[element.id];
  if (element.style.display === "none") {
    element.style.display = target_handler.config.prevdisplay;
  } else {
    target_handler.config.prevdisplay = element.style.display;
    element.style.display = "none";
  }
}