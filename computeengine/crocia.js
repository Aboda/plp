/*
    Este es en si el servidor
*/
//Carga de recursos a memoria. 
let resources_cache = {}; 
let domain_tree = {};
exports.set_cache_n_init = (cache) => {
    resources_cache = cache
    domain_tree = {
        "remansonocturno.com": {
            "meta":{
                "short":{
                    "es":"Red social de creadores",
                    "en":"Creators social network"
                },
                "loc":"https://remansonocturno.com/",
                "updfreq":"weekly",
                "sitemap":true,
                "index":true,
                "robots":true,
                "priority":0.0,
                "lastmod":"2021-03-22",
                "favicon":"casa",
                "acronimo":"ren"
            },
            "intra":{
                "ganalitycs":true,
                "gtag":"UA-116485229-1",
                "title":{
                    "es":"Inicio: Remanso Nocturno",
                    "en":"Home: Nocturnal Haven",
                },
                "css":[resources_cache.css.bas,resources_cache.css.ren],
                "js":[resources_cache.js.framework,resources_cache.js.ren],
                "html":common_messages.javascript_disclaimer
            },
            "astra":{
                "omno":{
                    "meta":{
                        "short":{
                            "es":"Datos perspectiva comunidad",
                            "en":"Community perspective data"
                        },
                        "loc":"https://remansonocturno.com/omno/",
                        "updfreq":"weekly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.0,
                        "favicon":"casa",
                        "acronimo":"ren"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"UA-116485229-1",
                        "title":{
                            "es":"Comunidad: Remanso Nocturno",
                            "en":"Community: Nocturnal Haven"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.ren],
                        "js":[resources_cache.js.framework,resources_cache.js.ren],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "umno":{
                    "meta":{
                        "short":{
                            "es":"Datos usuario centricos",
                            "en":"User centered data"
                        },
                        "loc":"https://remansonocturno.com/umno/",
                        "updfreq":"weekly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.0,
                        "favicon":"casa",
                        "acronimo":"ren"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"UA-116485229-1",
                        "title":{
                            "es":"Perfil: Remanso Nocturno",
                            "en":"Profile: Nocturnal Haven"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.ren],
                        "js":[resources_cache.js.framework,resources_cache.js.ren],
                        "html":common_messages.javascript_disclaimer
                    }
                }
            }
        },
        "www.remansonocturno.com":{
            "meta":{
                "short":{
                    "es":"Ficción de varios sabores y en diversas presentaciones",
                    "en":"Fiction in varied flavors and presentations"
                },
                "loc":"https://www.remansonocturno.com/",
                "updfreq":"weekly",
                "sitemap":true,
                "index":true,
                "robots":true,
                "priority":0.6,
                "favicon":"blog",
                "acronimo":"ren"
            },
            "intra":{
                "ganalitycs":true,
                "gtag":"UA-116485229-1",
                "title":{
                    "es":"Blog: Remanso Nocturno",
                    "en":"Blog: Nocturnal Haven"
                },
                "css":[resources_cache.css.bas,resources_cache.css.ren],
                "js":[resources_cache.js.framework,resources_cache.js.ren],
                "html":common_messages.javascript_disclaimer
            },
            "astra":{
                "estat":{
                    "meta":{
                        "short":{
                            "es":"Recursos estáticos para el blog",
                            "en":"Static resources for the blog",
                        },
                        "loc":"https://www.remansonocturno.com/estat/",
                        "updfreq":"weekly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"blog",
                        "acronimo":"ren"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"UA-116485229-1",
                        "title":{
                            "es":"Estáticos: Remanso Nocturno",
                            "en":"Static: Nocturnal Haven"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.ren],
                        "js":[resources_cache.js.framework,resources_cache.js.ren],
                        "html":common_messages.javascript_disclaimer
                    }                
                },
                "dinam":{
                    "meta":{
                        "short":{
                            "es":"recursos dinámicos para el blog",
                            "en":"dynamic resources for the blog",
                        },
                        "loc":"https://www.remansonocturno.com/dinam/",
                        "updfreq":"always",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"blog",
                        "acronimo":"ren"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"UA-116485229-1",
                        "title":{
                            "es":"Dinámicos: Remanso Nocturno",
                            "en":"Dynamic: Nocturnal Haven"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.ren],
                        "js":[resources_cache.js.framework,resources_cache.js.ren],
                        "html":common_messages.javascript_disclaimer
                    }                   
                }
            }
        },
        "demian.app":{
            "meta":{
                "short":{
                    "es":"Plataforma de aplicaciones",
                    "en":"Application platform"
                },
                "loc":"https://demian.app/",
                "updfreq":"daily",
                "sitemap":true,
                "index":true,
                "robots":true,
                "priority":0.3,
                "favicon":"desk",
                "acronimo":"plp"
            },
            "intra":{
                "facebooksdk":true,
                "fbid":"2076681439269297",
                "ganalitycs":true,
                "gtag":"G-6MEPN29LZG",
                "title":{
                    "es":"Plataforma:PLP",
                    "en":"Platform:PLP"
                },
                "css":[resources_cache.css.bas,resources_cache.css.plp],
                "js":[resources_cache.js.framework,resources_cache.js.plp],
                "html":common_messages.javascript_disclaimer
            },
            "astra":{
                "conavi":{
                    "meta":{
                        "short":{
                            "es":"Challenges and Tools 2019 and 2020",
                            "en":"Retos y herramientas 2019 y 2020"
                        },
                        "loc":"https://demian.app/conavi/",
                        "updfreq":"yearly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Retos y Herramientas:PLP",
                            "en":"Tools and Challenges:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "sedatu":{
                    "meta":{
                        "short":{
                            "es":"Propuesta interactiva de operación de programas de gobierno",
                            "en":"Interactive proposal for government program execution"
                        },
                        "loc":"https://demian.app/sedatu/",
                        "updfreq":"yearly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.3,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Programas Sociales:PLP",
                            "en":"Social Programs:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "olmoazul":{
                    "meta":{
                        "short":{
                            "es":"Tienda de platillos preparados en linea",
                            "en":"Online prepared food shop"
                        },
                        "loc":"https://demian.app/olmoazul/",
                        "updfreq":"monthly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Tienda de Comida:PLP",
                            "en":"Food shop:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "tomauno":{
                    "meta":{
                        "short":{
                            "es":"Renta en linea de películas en DVD",
                            "en":"Online DVD movie lease store"
                        },
                        "loc":"https://demian.app/tomauno/",
                        "updfreq":"monthly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Rentador DVD:PLP",
                            "en":"DVD Leaser:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "somema":{
                    "meta":{
                        "short":{
                            "es":"Herramientas de manejo de redes sociales",
                            "en":"Social media management tools"
                        },
                        "loc":"https://demian.app/somema/",
                        "updfreq":"weekly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"SOmeMA:PLP",
                            "en":"SOmeMA:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "narrar":{
                    "meta":{
                        "short":{
                            "es":"Herramientas para narraciones",
                            "en":"Storytelling tools"
                        },
                        "loc":"https://demian.app/narrar/",
                        "updfreq":"weekly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Narrador:PLP",
                            "en":"Storyteller:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                }
            }
        },
        "www.demian.app":{
            "meta":{
                "short":{
                    "es":"Blog de tecnología",
                    "en":"Tech blog"
                },
                "loc":"https://demian.app/",
                "updfreq":"weekly",
                "sitemap":true,
                "index":true,
                "robots":true,
                "priority":0.6,
                "favicon":"blog",
                "acronimo":"plp"
            },
            "intra":{
                "ganalitycs":true,
                "gtag":"G-6MEPN29LZG",
                "title":{
                    "es":"Blog:PLP",
                    "en":"Blog:PLP"
                },
                "css":[resources_cache.css.bas,resources_cache.css.plp],
                "js":[resources_cache.js.framework,resources_cache.js.plp],
                "html":common_messages.javascript_disclaimer
            },
            "astra":{
                "estat":{
                    "meta":{
                        "short":{
                            "es":"Contenido estático del blog",
                            "en":"Blog static content"
                        },
                        "loc":"https://www.demian.app/estat/",
                        "updfreq":"weekly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"blog",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Estáticos:PLP",
                            "en":"Static:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "dinam":{
                    "meta":{
                        "short":{
                            "es":"Contenido dinámico del blog",
                            "en":"Blog dynamic content"
                        },
                        "loc":"https://www.demian.app/dinam/",
                        "updfreq":"always",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.4,
                        "favicon":"blog",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Dinámicos:PLP",
                            "en":"Dynamic:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }                
                }
            }
        },
        "profesional.demian.app":{
            "meta":{
                "short":{
                    "es":"Portafolio laboratorio personal",
                    "en":"Personal lab portfolio"
                },
                "loc":"https://demian.app/",
                "updfreq":"monthly",
                "sitemap":true,
                "index":true,
                "robots":true,
                "priority":0.6,
                "favicon":"desk",
                "acronimo":"plp"
            },
            "intra":{
                "ganalitycs":true,
                "gtag":"G-6MEPN29LZG",
                "title":{
                    "es":"Inicio:PLP",
                    "en":"Home:PLP"
                },
                "css":[resources_cache.css.bas,resources_cache.css.plp],
                "js":[resources_cache.js.framework,resources_cache.js.plp],
                "html":common_messages.javascript_disclaimer
            },
            "astra":{
                "google":{
                    "meta":{
                        "short":{
                            "es":"Herramientas y tecnologías google empleadas",
                            "en":"Google tools and technologies employed",
                        },
                        "loc":"https://profesional.demian.app/google/",
                        "updfreq":"monthly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Google H&T:PLP",
                            "en":"Google T&T:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "facebook":{
                    "meta":{
                        "short":{
                            "es":"Herramientas y tecnologías facebook empleadas",
                            "en":"Facebook tools and technologies employed",
                        },
                        "loc":"https://profesional.demian.app/facebook/",
                        "updfreq":"monthly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Facebook H&T:PLP",
                            "en":"Facebook T&T:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "web":{
                    "meta":{
                        "short":{
                            "es":"Herramientas y tecnologías web empleadas",
                            "en":"Web tools and technologies employed",
                        },
                        "loc":"https://profesional.demian.app/web/",
                        "updfreq":"monthly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Web H&T:PLP",
                            "en":"Web T&T:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                },
                "office":{
                    "meta":{
                        "short":{
                            "es":"Herramientas y tecnologías de oficina empleadas",
                            "en":"Office tools and technologies employed",
                        },
                        "loc":"https://profesional.demian.app/office/",
                        "updfreq":"monthly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.5,
                        "lastmod":"2021-19-03",
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Office H&T:PLP",
                            "en":"Office T&T:PLP"
                        },
                        "css":[resources_cache.css.bas,resources_cache.css.plp],
                        "js":[resources_cache.js.framework,resources_cache.js.plp],
                        "html":common_messages.javascript_disclaimer
                    }
                }
            }
        }
    }
}
//Mensajes html comúnes de fácil acceso
const common_messages = {
    "javascript_disclaimer":{
        "es":"<p class='color_contrast_3'>Esta plataforma esta enteramente desarrollada en javascript, si solo ves este mensaje es que algo salio mal.</p>",
        "en":"<p class='color_contrast_3'>This platform is entirely coded in javascript, if you are only seeing this, something went wrong.</p>"
    },
    "index":{
        "es":"<p class='color_contrast_2'>Indice del dominio</p>",
        "en":"<p class='color_contrast_2'>Domain index</p>"
    }
}
/*
    Informa a robots.txt, sitemap.xml e index.html
    Informa a akhenon respecto a la página base a servir (pre js) y carga el css y js pertinente indicado en la lista
    Está cargado a memoria como los fragmentos de cache
*/

exports.gatekeep = (req,res,akhenon,simple_counter) => {
    /*
        Esta primera sección evalua la solicitud para garantizar que hay contenidos
        programados para su atención
    */
    var iferror = akhenon.teller();
    iferror.tag("Gatekeepr start number "+simple_counter+" succesful, evaluating");
    const easyurl = new URL(req.url, "https://"+req.headers.host+"/");
    const chosen_lng = akhenon.assert_lng(req.headers["accept-language"],easyurl.search);
    iferror.tag("URL auto eval complete, Manual eval begining");
    var do_serve = false;
    if (valid_host(req,domain_tree)) {
        iferror.tag("¡Domain entry found!, validating resource...");
        if (valid_resource(easyurl,domain_tree)) {
            iferror.tag("¡Requested resource found!, validating method...");
            if (valid_method(req.method,easyurl,domain_tree)) {
                iferror.tag("Method was approved, now serving content...");
                do_serve = true;
            }else{
                iferror.tag("No service for specified METHOD");
                finish_request (res,404,akhenon.html({
                    "title":"404",
                    "robot":false,
                    "html":iferror.end()
                }));
            };
        }else{
            iferror.tag("Requested RESOURCE could not be found");
            finish_request (res,404,akhenon.html({
                "title":"404",
                "robot":false,      
                "html":iferror.end()
            }));
        };
    }else{
        iferror.tag("Requested DOMAIN is not served here, please verify");
        finish_request (res,404,akhenon.html({
            "title":"404",
            "robot":false,
            "html":iferror.end()
        }));
    };
    /*
       De haber sido exitosa la evaluación continua a servir el contenido confirmado
       En caso contrario el chequeo fallado indicará al solicitante detalles sanitizados
    */
    if (do_serve) {
        var served = false;
        var chosen_domain = domain_tree[req.headers.host];
        var crafted_content;
        var adjusted_path = akhenon.adjust_path(easyurl.pathname);
        if (chosen_domain != undefined && easyurl.pathname == "/") {
            var options = akhenon.copy_obj(chosen_domain.intra);
            options.languaje = chosen_lng; 
            options.title = options.title[chosen_lng];
            options.html = options.html[chosen_lng];
            served = true;
            finish_request (res,200,akhenon.html(options));
        };
        if (chosen_domain != undefined && adjusted_path == "favicon.ico") {
            served = true;
            finish_request (res,200,resources_cache.favicon[chosen_domain.meta.favicon]);
        };
        if (chosen_domain != undefined && adjusted_path == "index.html") {
            crafted_content = build_index(chosen_domain,chosen_lng);
            var options = {
                "html":crafted_content,
                "languaje":chosen_lng,
                "title":"ind:"+chosen_domain.meta.acronimo,
                "css":chosen_domain.intra.css,
                "js":chosen_domain.intra.js
            };
            if (chosen_domain.meta.ganalitycs == true) {
                options.ganalitycs = true;
                options.gtag = chosen_domain.meta.gtag;
            }
            if (chosen_domain.meta.facebooksdk == true) {
                options.facebooksdk = true;
                options.fbid = chosen_domain.meta.fbid;
            }
            served = true;
            finish_request (res,200,akhenon.html(options));
        };
        
        if (chosen_domain != undefined && adjusted_path == "sitemap.xml") {
            served = true;
            finish_request (res,200,akhenon.sitemap(chosen_domain));
        };

        if (chosen_domain != undefined && adjusted_path == "robots.txt") {
            served = true;
            finish_request (res,200,akhenon.robots(target));
        };
        
        if (served == false) {
            var options = {
                "html":"En construcción",
                "languaje":chosen_lng,
                "title":"mis:"+chosen_domain.meta.acronimo,
                "css":chosen_domain.intra.css,
                "js":chosen_domain.intra.js
            };
            finish_request (res,200,akhenon.html(options));
        };
    }
}
function finish_request (res,code,content) {
    res.writeHead(code);
    res.end(content);
}
function valid_host (req,domain_tree) {
    if (domain_tree[req.headers.host] != undefined){
        return true
    }else{
        return false
    };
}
function adjust_path (pathname) {
    if (pathname[pathname.length -1] == "/") {
        pathname = pathname.substring(0,pathname.length -1);
    }
    if (pathname[0] == "/") {
        pathname = pathname.substring(1,pathname.length)
    }
    return pathname;
}
function valid_resource (easyurl,domain_tree) {
    if (easyurl.pathname == "/") {
        return true;
    };
    var adjusted = adjust_path(easyurl.pathname);
    console.log("valor ajustado:\n",adjusted);
    if (domain_tree[easyurl.host].astra[easyurl.pathname] != undefined) {
        return true;
    };
    return false;
}
function valid_method (method,easyurl,domain_tree) {
    if (method == "GET") {
        return true;
    }else{
        return false;
    };    
}

function build_index(chosen_domain,chosen_lng) {
    /*
        Modo de operación:

        Cada elemento cuenta con 3 componentes
        "meta" es utilizado para guardar información respecto a
        automatización de robots y sitemap, en este caso la cre
        ación del indice es un acto semejante pero más complejo

        "intra" es utilizado para renderear la página en cuestión
        en caso de ser solicitada

        "astra" contiene las subrutas dentro del dominio, las que 
        a su vez cuentan con esta segmentación en ellas. 

        dom o subdom -> detalles -> ruta_l1 -> detalles
        Significativo -> contenido - > significativo -> contenido

        el objetivo es leer en cada nivel el meta, decidir si se 
        le crea entrada en este indice al elemento e introducirlo
    */
    var hc = "<h1>"+common_messages.index[chosen_lng]+"</h1>\n";
    hc = hc + index_div(chosen_domain.meta,chosen_lng);
    for (var route in chosen_domain.astra) {
        hc = hc + index_div(chosen_domain.astra[route].meta,chosen_lng);
    }
    return hc
}

function index_div (object_meta,chosen_lng) {
    var dc;
    if (object_meta.index == true) {
        dc = dc + "<div>\n";
        dc = dc + object_meta.short[chosen_lng]+"\n";
        dc = dc + "<a href='"+object_meta.loc+"'>"+object_meta.loc+"</a>\n";
        dc = dc + "</div>\n";
    }
    return dc;
}