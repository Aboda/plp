/*
    Este es en si el servidor
*/
// Objeto de almacenamiento de cache
let resources_cache = {}; 
// Objeto de detallado de estructura de sitio
let domain_tree = {};
// Objeto de valores que pasar integros desde domain_tree al Akhenon (vs realizar operaciones con ellos)
let pass_values_as_found = {
    "facebooksdk":true,
    "fbid":true,
    "ganalitycs":true,
    "gtag":true,
    "oa":true
}
/*
    let crocia_explanation = {
        "nombre":"nombre del recurso a servir",
        "short":"descripción corta en objeto con params en y es",
        "loc":"URL absoluto del recurso",
        "sitemap":"bool para desplegarlo en el sitemap",
        "index":"bool para desplegarlo en el index",
        "favicon":"nombre clave del favicon en el cache",
        "acronimo":"reducción a tres letras arbitrario",
        "root_domain":"bool que indica si es un domáin raíz",
        "intra":"objeto con cualidades de construcción de la página",
        "astra":"objeto con contenidos de la página"
    }
*/
// Esta función es llamada desde server.js con el Objeto caché como parámetro
exports.set_cache_n_init = (cache) => {
    resources_cache = cache
    domain_tree = {
        "demian.app":{
            "meta":{
                "short":{
                    "es":"PLP: Portafolio Laboratorio Personal",
                    "en":"PLP: Personal Lab Portfolio"
                },
                "loc":"https://demian.app/",
                "sitemap":true,
                "index":true,
                "favicon":"desk",
                "acronimo":"plp",
                "root_domain":true,
            },
            "intra":{
                "ganalitycs":true,
                "gtag":"G-6MEPN29LZG",
                "title":{
                    "es":"Raíz:PLP",
                    "en":"Root:PLP"
                },
                "css":[resources_cache.css.sdb,resources_cache.css.plp],
                "js":[resources_cache.js.alpha,resources_cache.js.demian_app]
            },
            "astra":{
                "aboutme":{
                    "meta":{
                        "short":{
                            "es":"Acerca de mi",
                            "en":"About me"
                        },
                        "loc":"https://demian.app/aboutme",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Buró:PLP",
                            "en":"Buro:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha],
                        "html":[resources_cache.html.aboutme]
                    }
                },
                "buro":{
                    "meta":{
                        "short":{
                            "es":"Documentación derivada de normas",
                            "en":"Norm derived documentation"
                        },
                        "loc":"https://demian.app/buro/",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"Buró:PLP",
                            "en":"Buro:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
                    },
                    "astra":{
                        "privacypolicy":{
                            "meta":{
                                "short":{
                                    "es":"Politica de Privacidad",
                                    "en":"Privacy Policy"
                                },
                                "loc":"https://demian.app/buro/privacypolicy",
                                "sitemap":true,
                                "index":true,
                                "robots":true,
                                "favicon":"desk",
                                "acronimo":"plp"
                            },
                            "intra":{
                                "ganalitycs":true,
                                "gtag":"G-6MEPN29LZG",
                                "title":{
                                    "es":"PolPriv:PLP",
                                    "en":"PrivPol:PLP"
                                },
                                "css":[resources_cache.css.plp],
                                "js":[resources_cache.js.alpha],
                                "html":[resources_cache.html.privacypolicy]
                            },
                        },
                        "termsofservice":{
                            "meta":{
                                "short":{
                                    "es":"Condiciones del Servicio",
                                    "en":"Terms of Service"
                                },
                                "loc":"https://demian.app/buro/termsofservice",
                                "sitemap":true,
                                "index":true,
                                "robots":true,
                                "favicon":"desk",
                                "acronimo":"plp"
                            },
                            "intra":{
                                "ganalitycs":true,
                                "gtag":"G-6MEPN29LZG",
                                "title":{
                                    "es":"PolPriv:PLP",
                                    "en":"PrivPol:PLP"
                                },
                                "css":[resources_cache.css.plp],
                                "js":[resources_cache.js.alpha],
                                "html":[resources_cache.html.termsofservice]
                            },
                        }
                    }
                },
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
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
                        "facebooksdk":true,
                        "fbid":"2076681439269297",
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "oa":"345217584200-aaqh5p3p3huigg3hf0bobee8lhtphe41",
                        "title":{
                            "es":"SOmeMA:PLP",
                            "en":"SOmeMA:PLP"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.sph],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_app_somema]
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
                        "facebooksdk":true,
                        "fbid":"2076681439269297",
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "oa":"345217584200-aaqh5p3p3huigg3hf0bobee8lhtphe41",
                        "title":{
                            "es":"Narrador:PLP",
                            "en":"Storyteller:PLP"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.prh],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_app_narrar]
                    }
                },
                "login":{
                    "meta":{
                        "short":{
                            "es":"Aterrizaje OA2",
                            "en":"OA2 Landing"
                        },
                        "loc":"https://demian.app/login/",
                        "updfreq":"never",
                        "sitemap":false,
                        "index":false,
                        "robots":false,
                        "priority":0.0,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalitycs":true,
                        "gtag":"G-6MEPN29LZG",
                        "title":{
                            "es":"OAuth2",
                            "en":"OAuth2"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.oa2landing]
                    }
                },
                "info":{
                    "meta":{
                        "short":{
                            "es":"Información de Plataforma",
                            "en":"Platform Information"
                        },
                        "loc":"https://demian.app/info/",
                        "updfreq":"weekly",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.0,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "title":{
                            "es":"Info:Demian",
                            "en":"Info:Demian"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.edg],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_app_info]
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
                "css":[resources_cache.css.plp],
                "js":[resources_cache.js.alpha,resources_cache.js.www_demian_app]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
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
                "css":[resources_cache.css.plp],
                "js":[resources_cache.js.alpha,resources_cache.js.profesional_demian_app]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.g_prods]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
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
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
                    }
                }
            }
        },
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
                "acronimo":"ren",
                "root_domain":true
            },
            "intra":{
                "ganalitycs":true,
                "gtag":"UA-116485229-1",
                "title":{
                    "es":"Inicio: Remanso Nocturno",
                    "en":"Home: Nocturnal Remanse",
                },
                "css":[resources_cache.css.ren],
                "js":[resources_cache.js.alpha,resources_cache.js.ren]
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
                            "en":"Community: Nocturnal Remanse"
                        },
                        "css":[resources_cache.css.ren],
                        "js":[resources_cache.js.alpha,resources_cache.js.ren]
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
                            "en":"Profile: Nocturnal Remanse"
                        },
                        "css":[resources_cache.css.ren],
                        "js":[resources_cache.js.alpha,resources_cache.js.ren]
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
                    "en":"Blog: Nocturnal Remanse"
                },
                "css":[resources_cache.css.ren],
                "js":[resources_cache.js.alpha,resources_cache.js.ren]
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
                            "en":"Static: Nocturnal Remanse"
                        },
                        "css":[resources_cache.css.ren],
                        "js":[resources_cache.js.alpha,resources_cache.js.ren]
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
                            "en":"Dynamic: Nocturnal Remanse"
                        },
                        "css":[resources_cache.css.ren],
                        "js":[resources_cache.js.alpha,resources_cache.js.ren]
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
    },
    "ruta_pendiente":{
        "es":"<h1>Pendiente programación de ruta en servidor</h1>",
        "en":"<h1>Pending route configuration in server</h1>"
    }
}
/*
    Informa a robots.txt, sitemap.xml e index.html
    Informa a akhenon respecto a la página base a servir (pre js) y carga el css y js pertinente indicado en la lista
    Está cargado a memoria como los fragmentos de cache
*/
exports.gatekeep = (req,res,akhenon,simple_counter,log_JSON) => {
    /*
        Esta primera sección evalua la solicitud para garantizar que hay contenidos
        programados para su atención
    */
    //Este es un track para ser devuelto en caso de error en la validación del recurso
    let iferror = akhenon.teller();
    //Primer mensaje del iferror indica el número de servicio para poder ser comparado con logs
    iferror.tag("Gatekeeper start number "+simple_counter+" succesful, evaluating");
    //Construye la url interpretada por la herramienta de node para la tarea
    const easyurl = new URL(req.url, "https://"+req.headers.host+"/");
    //Decide el lenguaje en que se servira el recurso en función del header y de el parámetro de búsqueda lng (opciones "en" y "es")
    const chosen_lng = akhenon.assert_lng(req.headers["accept-language"],easyurl.search);
    //Confirma que no hubo conflicto en la autoevaluación de la URL
    iferror.tag("URL auto eval complete, Manual eval begining");
    //Controla la autorización para servir el recurso despues de la validación con el arbol de dominio
    let do_serve = false;
    //Confirma que el dominio exista en el arbol de dominios
    if (domain_tree[req.headers.host] != undefined) {
        iferror.tag("¡Domain entry found!, validating resource...");
        //Confirma que exista un "recurso" en el arbol de dominio
        if (valid_resource(easyurl,domain_tree)) {
            iferror.tag("¡Requested resource found!, validating method...");
            //Por el momento solo da TRUE a GET
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
    */
    if (do_serve) {
        //La llave del dominio en domain_tree es el host
        let chosen_domain = domain_tree[req.headers.host];
        //Remueve / al principio y al final
        let adjusted_path = akhenon.adjust_path(easyurl.pathname);
        let as_array;

        if (easyurl.pathname == "/") {
            finish_request (res,200,akhenon.html(serve_level_0(chosen_domain,chosen_lng)));
            return;
        }else{
            if (adjusted_path.indexOf("/") != -1) {
                as_array = adjusted_path.split("/");
            };
        };

        if (adjusted_path == "favicon.ico") {
            //Cache de un día
            res.setHeader("Cache-Control", "public, max-age=86400");
            finish_request (res,200,resources_cache.favicon[chosen_domain.meta.favicon]);
            return;
        };

        if (adjusted_path == "index.html") {
            let options = {
                "html":[build_index(domain_tree,req.headers.host,chosen_lng)],
                "languaje":chosen_lng,
                "title":"ind:"+chosen_domain.meta.acronimo,
                "css":chosen_domain.intra.css
            };
            if (chosen_domain.meta.ganalitycs == true) {
                options.ganalitycs = true;
                options.gtag = chosen_domain.meta.gtag;
            };
            if (chosen_domain.meta.facebooksdk == true) {
                options.facebooksdk = true;
                options.fbid = chosen_domain.meta.fbid;
            };
            finish_request (res,200,akhenon.html(options));
            return;
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

        if (adjusted_path == "sitemap.xml") {
            finish_request (res,200,akhenon.sitemap(domain_tree,req.headers.host));
            return;
        };

        if (adjusted_path == "robots.txt") {
            finish_request (res,200,akhenon.robots("https://www."+root_dom_name+"/sitemap.xml"));
            return;
        };
        /*
            Contenta a todas las solicitudes de nivel 1 ej... demian.app/info
        */
        if (req.headers.host == "demian.app" && as_array == undefined) {
            finish_request (res,200,akhenon.html(
                serve_level_1(chosen_domain,adjusted_path,chosen_lng)));
            return;
        };
        /*
            Solo respuestas de nivel 2
        */
        let trimmed_referer;
        if (req.headers.referer != undefined) {
            trimmed_referer = akhenon.adjust_path(akhenon.clear_query(req.headers.referer));
        }
        if (as_array != undefined) {
            if (req.headers.host == "demian.app" && 
                as_array[0] == "info" && 
                as_array[1] == "progress" &&
                trimmed_referer == "https://demian.app/info") {
                    var response = {};
                    for (var dom_name in domain_tree) {
                        var domain = domain_tree[dom_name];
                        response[dom_name] = {};
                        response[dom_name].meta = domain.meta
                        response[dom_name].astra = {};
                        for (var routes in domain.astra) {
                            response[dom_name].astra[routes] = {};
                            response[dom_name].astra[routes].meta = domain.astra[routes].meta
                        }
                    }
                    finish_request (res,200,JSON.stringify(response));
                return;
            }
            
        } 
        /*
            De haber pasado la validación de entrada pero no se encontró otro caso que resolviera la solicituc
            se entrega este mensaje de "ruta pendiente".
        */
        let options = {
            "html":[common_messages.ruta_pendiente[chosen_lng],"<p>host: "+req.headers.host+"</p>","<p>referer: "+req.headers.referer+"</p>","<p>"+JSON.stringify(as_array)+"</p>"],
            "languaje":chosen_lng,
            "title":"mis:"+chosen_domain.meta.acronimo,
        };
        finish_request (res,200,akhenon.html(options));
        return;
    }
}
// Coloca el código HTML indicado (200 en éxito) y cierra la comunicación
function finish_request (res,code,content) {
    res.writeHead(code);
    res.end(content);
}
// remueve / iniciales y finales
function adjust_path (pathname) {
    if (pathname[pathname.length -1] == "/") {
        pathname = pathname.substring(0,pathname.length -1);
    }
    if (pathname[0] == "/") {
        pathname = pathname.substring(1,pathname.length)
    }
    return pathname.toLowerCase();
}
// valida que existan los subniveles solicitados en domain_tree del host
function valid_resource (easyurl,domain_tree) {
    /*
        Corresponde al caso de la raíz de un host
        puesto que ya se ha confirmado que existe el dominio
        existe en domain_tree información para servir
    */    
    if (easyurl.pathname == "/") {
        return true;
    };

    let adjusted = adjust_path(easyurl.pathname);
    if (adjusted == "robots.txt"||
        adjusted == "index.html"||
        adjusted == "sitemap.xml") {
        return true;
    };
    let as_array;
    /*
        Si existe un / en el string
        a esta altura se han eliminado el primer y último /
        del string recibido de forma que solo dará
        un número distinto de -1 si hay algo en la forma
        asdassad/sdadsd/dasdsad creando un array
        [asdassad,sdadsd,dasdsad]
    */
    if (adjusted.indexOf("/") != -1) {
        as_array = adjusted.split("/");
    }
    /*
        En este punto, si "as_array" es undefined significa que la
        solicitud no lleva / en ella, de forma que debe ser un elemento
        solicitado directamente a la raíz (ya se removieron / iniciales y finales)
    */

    if (as_array == undefined) {
        if (domain_tree[easyurl.host].astra[adjusted] != undefined) {
            return true;
        }else{
            return false;
        };
    }else{
        /*
         por el momento la máxima profundidad es 2 ej demian.app/buro/tos 
        */
        if (domain_tree[easyurl.host].astra[asarray[0]].astra[asarray[1]] != undefined) {
            return true;
        }else{
            return false;
        }
    }
    throw {
        "error":"se llego a un estado en teoria inalcanzable en valid_resource"
    }
}
// placeholder para cuando instalemos algo que use POST, de momento da true siempre
function valid_method (method,easyurl,domain_tree) {
    if (method == "GET") {
        return true;
    }else{
        return false;
    };    
}
// construye el html de índice para el host solicitado basado en el domain_tree
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

        el objetivo es leer en cada nivel el meta, e introduc
        irlo
    */
        let hc = "<h1>"+common_messages.index[chosen_lng] +
    root_dom.meta.short[chosen_lng]+"</h1>\n";
    hc = hc + "<ol type='I' class='stack_left'>"
    for (let entry in party_members) {
        if (party_members[entry].meta.index == true){
            if (domain_name == entry) {
                hc = hc + index_div(party_members[entry].meta,chosen_lng,true);
            }else{
                hc = hc + index_div(party_members[entry].meta,chosen_lng);
            }
            for (let route in party_members[entry].astra) {
                if (party_members[entry].astra[route].meta.index == true){
                    hc = hc + index_div(party_members[entry].astra[route].meta,chosen_lng);
                }
            }
        }
    }
    hc = hc + "</ol>"
    return hc
}
// genera una entrada div en texto formato html
function index_div (object_meta,chosen_lng,mark) {
    let dc = "";
    if (object_meta.index == true) {
        if (mark == true){
            dc = dc + "<li class='color_contrast_2'>\n";
            dc = dc + common_messages.here[chosen_lng];
        }else{
            dc = dc + "<li>\n";
        }     
        dc = dc + object_meta.short[chosen_lng]+"\n<br>";
        if (mark == true){
            dc = dc + "<a class='color_contrast_4' href='"+object_meta.loc+"'>"+object_meta.loc+"</a>\n";
        }else{
            dc = dc + "<a href='"+object_meta.loc+"'>"+object_meta.loc+"</a>\n";
        }
        dc = dc + "</li>\n";
    }
    return dc;
}
// entrega algo en el astra de un host
function serve_level_0(chosen_domain,chosen_lng){
    let hedo = {
        "html":["<h1>"+chosen_domain.meta.short[chosen_lng]+"</h1>"],
        "languaje":chosen_lng,
        "title":chosen_domain.intra.title[chosen_lng],
        "css":chosen_domain.intra.css,
        "js":chosen_domain.intra.js
    };
    for (let keys in pass_values_as_found) {
        if (chosen_domain.intra[keys] != undefined) {
            hedo[keys] = chosen_domain.intra[keys];
        };
    };
    return hedo;
}
// entrega algo en el astre del astra de un host
function serve_level_1(chosen_domain,adjusted_path,chosen_lng){
    let hedo = {
        "html":["<h1>"+chosen_domain.astra[adjusted_path].meta.short[chosen_lng]+"</h1>"],
        "languaje":chosen_lng,
        "title":chosen_domain.astra[adjusted_path].intra.title[chosen_lng],
        "css":chosen_domain.astra[adjusted_path].intra.css,
        "js":chosen_domain.astra[adjusted_path].intra.js
    }
    for (let keys in pass_values_as_found) {
        if (chosen_domain.astra[adjusted_path].intra[keys] != undefined) {
            hedo[keys] = chosen_domain.astra[adjusted_path].intra[keys];
        }    
    }
    return hedo;
}