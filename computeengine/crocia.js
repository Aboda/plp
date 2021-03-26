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
                "cool":{
                    "es":"Remanso Nocturno",
                    "en":"Nocturnal Haven"
                },
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
                "acronimo":"ren",
                "root_domain":true
            },
            "intra":{
                "ganalitycs":true,
                "gtag":"UA-116485229-1",
                "title":{
                    "es":"Inicio: Remanso Nocturno",
                    "en":"Home: Nocturnal Haven",
                },
                "css":[resources_cache.css.bas,resources_cache.css.ren],
                "js":[resources_cache.js.framework,resources_cache.js.ren]
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
                        "js":[resources_cache.js.framework,resources_cache.js.ren]
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
                        "js":[resources_cache.js.framework,resources_cache.js.ren]
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
                "js":[resources_cache.js.framework,resources_cache.js.ren]
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
                        "js":[resources_cache.js.framework,resources_cache.js.ren]
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
                        "js":[resources_cache.js.framework,resources_cache.js.ren]
                    }                   
                }
            }
        },
        "demian.app":{
            "meta":{
                "cool":{
                    "es":"Portafolio Laboratorio Personal",
                    "en":"Personal Lab Portfolio"
                },
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
                "acronimo":"plp",
                "root_domain":true
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
                "js":[resources_cache.js.framework,resources_cache.js.plp]
            },
            "astra":{
                "conavi":{
                    "meta":{
                        "short":{
                            "es":"Retos y herramientas 2019 y 2020",
                            "en":"Challenges and Tools 2019 and 2020"
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                "loc":"https://www.demian.app/",
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
                "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                "loc":"https://profesional.demian.app/",
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
                "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
                        "js":[resources_cache.js.framework,resources_cache.js.plp]
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
        "es":"<p class='color_contrast_2'>Indice del dominio:</p>\n",
        "en":"<p class='color_contrast_2'>Domain index:</p>\n"
    },
    "here":{
        "es":"<p class='color_contrast_3'>Usted está aquí</p>\n",
        "en":"<p class='color_contrast_3'>You are here</p>\n"
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
    let iferror = akhenon.teller();
    iferror.tag("Gatekeepr start number "+simple_counter+" succesful, evaluating");
    const easyurl = new URL(req.url, "https://"+req.headers.host+"/");
    const chosen_lng = akhenon.assert_lng(req.headers["accept-language"],easyurl.search);
    iferror.tag("URL auto eval complete, Manual eval begining");
    let do_serve = false;
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
                    "html":[iferror.end()]
                }));
            };
        }else{
            iferror.tag("Requested RESOURCE could not be found");
            finish_request (res,404,akhenon.html({
                "title":"404",
                "robot":false,      
                "html":[iferror.end()]
            }));
        };
    }else{
        iferror.tag("Requested DOMAIN is not served here, please verify");
        finish_request (res,404,akhenon.html({
            "title":"404",
            "robot":false,
            "html":[iferror.end()]
        }));
    };
    /*
       De haber sido exitosa la evaluación continua a servir el contenido confirmado
       En caso contrario el chequeo fallado indicará al solicitante detalles sanitizados
    */
    if (do_serve) {
        let served = false;
        let chosen_domain = domain_tree[req.headers.host];
        let crafted_content;
        let adjusted_path = akhenon.adjust_path(easyurl.pathname);
        let as_array;

        if (easyurl.pathname == "/") {
            let options = akhenon.copy_obj(chosen_domain.intra);
            options.languaje = chosen_lng; 
            options.title = options.title[chosen_lng];
            served = true;
            options.html = ["<h1>"+chosen_domain.meta.short+[chosen_lng]+"</h1>"];
            finish_request (res,200,akhenon.html(options));
            break;
        }else{
            if (adjusted_path.indexOf("/") != -1) {
                as_array = adjusted_path.split("/");
            };
        };

        let favicon_trigger;

        if (as_array != undefined) {
            if (as_array[1] == "favicon.ico") {
                favicon_trigger = true;
            };
        }else{
            if (adjusted_path == "favicon.ico") {
                favicon_trigger = true;
            };            
        };

        if (favicon_trigger) {
            served = true;
            finish_request (res,200,resources_cache.favicon[chosen_domain.meta.favicon]);
            break;
        };

        let index_trigger;
        
        if (as_array != undefined) {
            if (as_array[1] == "index.html") {
                index_trigger = true;
            };
        }else{
            if (adjusted_path == "index.html") {
                index_trigger = true;
            };            
        };

        if (index_trigger) {
            crafted_content = build_index(domain_tree,req.headers.host,chosen_lng);
            let options = {
                "html":[crafted_content],
                "languaje":chosen_lng,
                "title":"ind:"+chosen_domain.meta.acronimo,
                "css":chosen_domain.intra.css,
                "js":chosen_domain.intra.js
            };
            if (chosen_domain.meta.ganalitycs == true) {
                options.ganalitycs = true;
                options.gtag = chosen_domain.meta.gtag;
            };
            if (chosen_domain.meta.facebooksdk == true) {
                options.facebooksdk = true;
                options.fbid = chosen_domain.meta.fbid;
            };
            served = true;
            finish_request (res,200,akhenon.html(options));
            break;
        };

        let acronym = chosen_domain.meta.acronimo;
        let root_dom_name;

        for (let entry in domain_tree) {
            if (domain_tree[entry].meta.acronimo == acronym) {
                if (domain_tree[entry].meta.root_domain == true) {
                    root_dom_name = entry;
                }
            }
        }
        
        let sitemap_trigger;

        if (as_array != undefined) {
            if (as_array[1] == "sitemap.xml") {
                sitemap_trigger = true;
            };
        }else{
            if (adjusted_path == "sitemap.xml") {
                sitemap_trigger = true;
            };            
        };

        if (chosen_domain == "www."+root_dom_name && sitemap_trigger) {
            served = true;
            finish_request (res,200,akhenon.sitemap(chosen_domain));
            break;
        };

        let robots_trigger;

        if (as_array != undefined) {
            if (as_array[1] == "robots.txt") {
                robots_trigger = true;
            };
        }else{
            if (adjusted_path == "robots.txt") {
                robots_trigger = true;
            };            
        };

        if (robots_trigger) {
            served = true;
            finish_request (res,200,akhenon.robots("https://www."+root_dom_name+"/sitemap.xml"));
            break;
        };
        
        if (served == false) {
            let options = {
                "html":["<h1>En construcción</h1>"],
                "languaje":chosen_lng,
                "title":"mis:"+chosen_domain.meta.acronimo,
                "css":chosen_domain.intra.css,
                "js":chosen_domain.intra.js
            };
            finish_request (res,200,akhenon.html(options));
            break;
        };
    };
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
    return pathname.toLowerCase();
}
function valid_resource (easyurl,domain_tree) {
    console.log(easyurl.pathname);
    if (easyurl.pathname == "/") {
        return true;
    };
    let adjusted = adjust_path(easyurl.pathname);
    let as_array;
    if (adjusted.indexOf("/") != -1) {
        as_array = adjusted.split("/");
    }

    console.log({adjusted,as_array});

    if (as_array == undefined){
        if (adjusted == "favicon.ico" ||
            adjusted == "index.html" ||
            adjusted == "robots.txt" ||
            adjusted == "sitemap.xml" ){
            return true;
        };
    }else{
        if (as_array[1] == "favicon.ico" ||
            as_array[1] == "index.html" ||
            as_array[1] == "robots.txt" ||
            as_array[1] == "sitemap.xml" ){
            return true;
        };
    }
    
    if (as_array == undefined){
        if (domain_tree[easyurl.host].astra[adjusted] != undefined) {
            return true;
        };
    }else{
        if (domain_tree[easyurl.host].astra[as_array[0]] != undefined) {
            return true;
        };
    }

    return false;
}
function valid_method (method,easyurl,domain_tree) {
    if (method == "GET") {
        return true;
    }else{
        return false;
    };    
}

function build_index(domain_tree,domain_name,chosen_lng) {
    let chosen_domain = domain_tree[domain_name];
    let acronym = chosen_domain.meta.acronimo;
    let root_dom;
    let party_members = {};
    for (let entry in domain_tree) {
        if (domain_tree[entry].meta.acronimo == acronym) {
            party_members[entry] = domain_tree[entry]
            if (domain_tree[entry].meta.root_domain == true) {
                root_dom = domain_tree[entry];
            }    
        }
    }
    /*  
        Modo de operación:

        Cada elemento cuenta con 3 componentes
        "meta" es utilizado para guardar información respecto a
        automatización de robots y sitemap, en este caso la cre
        ación del indice es un acto semejante pero más complejo

        "intra" es utilizado para renderear la página en cuesti
        ón en caso de ser solicitada

        "astra" contiene las subrutas dentro del dominio, las q
        ue a su vez cuentan con esta segmentación en ellas. 

        dom o subdom -> detalles -> ruta_l1 -> detalles
        Significativo -> contenido - > significativo -> conteni
        do

        el objetivo es leer en cada nivel el meta, decidir si s
        e le crea entrada en este indice al elemento e introduc
        irlo
    */
        let hc = "<h1>"+common_messages.index[chosen_lng] +
    root_dom.meta.cool[chosen_lng]+"</h1>\n";

    for (let entry in party_members) {
        if (domain_name == entry) {
            hc = hc + index_div(party_members[entry].meta,chosen_lng,true);
        }else{
            hc = hc + index_div(party_members[entry].meta,chosen_lng);
        }
        for (let route in party_members[entry].astra) {
            hc = hc + index_div(party_members[entry].astra[route].meta,chosen_lng);
        }
    }
    return hc
}

function index_div (object_meta,chosen_lng,mark) {
    let dc = "";
    if (object_meta.index == true) {
        if (mark == true){
            dc = dc + "<div class='color_contrast_2'>\n";
            dc = dc + common_messages.here[chosen_lng];
        }else{
            dc = dc + "<div>\n";
        }     
        dc = dc + object_meta.short[chosen_lng]+"\n";
        if (mark == true){
            dc = dc + "<a class='inv_li' href='"+object_meta.loc+"'>"+object_meta.loc+"</a>\n";
        }else{
            dc = dc + "<a href='"+object_meta.loc+"'>"+object_meta.loc+"</a>\n";
        }
        dc = dc + "</div>\n";
    }
    return dc;
}