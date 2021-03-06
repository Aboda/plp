/*
    Este es en si el servidor
*/
// Objeto de almacenamiento de cache
let resources_cache = {}; 
// Objeto de detallado de estructura de sitio
let domain_tree = {};
// Objeto de valores que pasar integros desde domain_tree al Akhenon 
// vs pasar datos de forma "manual" a travez de serve_level_N
let pass_values_as_found = {
    "facebooksdk":true,
    "fbid":true,
    "ganalytics":true,
    "gtag":true,
    "oa":true
}
// Códigos de apps fb y googletag iniciales
let main_gtag = "G-6MEPN29LZG";
let fb_id = 2076681439269297;
/*
    let crocia_explanation = {
        "nombre":"nombre del recurso a servir",
        "short":"descripción corta en objeto con params en y es",
        "loc":"URL absoluto del recurso",
        "sitemap":"bool para desplegarlo en el sitemap",
        "index":"bool para desplegarlo en el index",
        "favicon":"nombre clave del favicon en el cache",
        "acronimo":"reducción a tres letras arbitrario",
        "root_domain":"bool que indica si es un dominio raíz",
        "intra":"objeto con cualidades de construcción de la página",
        "astra":"objeto con contenidos subrutas de la página"
    }
*/
// Esta función es llamada desde server.js con el Objeto caché como parámetro
exports.set_cache_n_init = (cache) => {
    resources_cache = cache
    domain_tree = {
        "demian.app":{
            "meta":{
                "short":{
                    "es":"Portafolio Laboratorio Personal:plp",
                    "en":"Personal Lab Portfolio:plp"
                },
                "descrip":{
                    "es":"Página raíz del proyecto, cuenta con una serie de preguntas para canalizar al transeunte a los diversos contenidos.",
                    "en":"Root page of the project, you may find here a series of questions to route you to the different elements of the project."
                },
                "loc":"https://demian.app/",
                "sitemap":true,
                "index":true,
                "favicon":"desk",
                "acronimo":"plp",
                "root_domain":true,
            },
            "intra":{
                "ganalytics":true,
                "gtag":main_gtag,
                "title":{
                    "es":"Raíz:PLP",
                    "en":"Root:PLP"
                },
                "css":[resources_cache.css.sdb,resources_cache.css.plp],
                "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.demian_app]
            },
            "astra":{
                "index.html":{
                    "meta":{
                        "short":{
                            "es":"Indice",
                            "en":"Index"
                        },
                        "descrip":{
                            "es":"Listado de páginas de primer y segúndo nivel del dominio",
                            "en":"Listing of first and second level pages in the domain"
                        },
                        "loc":"https://demian.app/index.html",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Indice:plp",
                            "en":"Index:plp"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav]
                    }
                },
                "faq":{
                    "meta":{
                        "short":{
                            "es":"Preguntas Frecuentes",
                            "en":"FAQ"
                        },
                        "descrip":{
                            "es":"Preguntas concretas y respuestas rápidas relativas al proyecto",
                            "en":"Concrete questions and quick answers related to the project"
                        },
                        "loc":"https://demian.app/faq",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Preguntas Frecuentes",
                            "en":"FAQ"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.demian_app_faq]
                    }
                },
                "draw.io":{
                    "meta":{
                        "short":{
                            "es":"Diagramas",
                            "en":"Diagrams"
                        },
                        "descrip":{
                            "es":"Diagramas explicativos del proyecto",
                            "en":"Project diagrams"
                        },
                        "loc":"https://demian.app/draw.io",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Diagramas:PLP",
                            "en":"Diagrams:PLP"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.demian_app_drawio]
                    }
                },
                "aboutme":{
                    "meta":{
                        "short":{
                            "es":"Acerca de mi",
                            "en":"About me"
                        },
                        "descrip":{
                            "es":"Aquí hablo de mi mismo",
                            "en":"Here I talk about myself"
                        },
                        "loc":"https://demian.app/aboutme",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Acerca de mi:PLP",
                            "en":"About me:PLP"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.demian_app_aboutme]
                    }
                },
                "buro":{
                    "meta":{
                        "short":{
                            "es":"Documentación derivada de normas",
                            "en":"Norm derived documentation"
                        },
                        "descrip":{
                            "es":"Sección dedicada a satisfacer diferentes regulaciónes burocráticas",
                            "en":"Section dedicated to satisfy varied burocratic regulations"
                        },
                        "loc":"https://demian.app/buro/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Buró:PLP",
                            "en":"Buro:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.en_construc]
                    },
                    "astra":{
                        "privacypolicy":{
                            "meta":{
                                "short":{
                                    "es":"Politica de Privacidad",
                                    "en":"Privacy Policy"
                                },
                                "descrip":{
                                    "es":"Detalla que datos personales de nuestros usuarios se recolectan y como se manejan.",
                                    "en":"Details on user data collection and handling."
                                },
                                "loc":"https://demian.app/buro/privacypolicy",
                                "sitemap":true,
                                "index":true,
                                "favicon":"desk",
                                "acronimo":"plp"
                            },
                            "intra":{
                                "ganalytics":true,
                                "gtag":main_gtag,
                                "title":{
                                    "es":"PolPriv:PLP",
                                    "en":"PrivPol:PLP"
                                },
                                "css":[resources_cache.css.plp],
                                "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.privacypolicy]
                            },
                        },
                        "termsofservice":{
                            "meta":{
                                "short":{
                                    "es":"Condiciones del Servicio",
                                    "en":"Terms of Service"
                                },
                                "descrip":{
                                    "es":"Detalles de las condiciones de prestación del servicio",
                                    "en":"Details on the warranties surronding the service"
                                },
                                "loc":"https://demian.app/buro/termsofservice",
                                "sitemap":true,
                                "index":true,
                                "favicon":"desk",
                                "acronimo":"plp"
                            },
                            "intra":{
                                "ganalytics":true,
                                "gtag":main_gtag,
                                "title":{
                                    "es":"PolPriv:PLP",
                                    "en":"PrivPol:PLP"
                                },
                                "css":[resources_cache.css.plp],
                                "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.privacypolicy]
                            },
                        }
                    }
                },
                "precloud":{
                    "meta":{
                        "short":{
                            "es":"Retos y herramientas 2019 y 2020",
                            "en":"Challenges and Tools 2019 and 2020"
                        },
                        "descrip":{
                            "es":"Portafolio de manejo y análisis de datos previo a la generación de esta plataforma",
                            "en":"Management and análisis of data previous to the creation of this platform"
                        },
                        "loc":"https://demian.app/precloud/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Retos y Herramientas:PLP",
                            "en":"Tools and Challenges:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.en_construc]
                    }
                },
                "socialorg":{
                    "meta":{
                        "short":{
                            "es":"Propuesta para programas federales",
                            "en":"Federal programs proposal"
                        },
                        "descrip":{
                            "es":"Propuesta de interface de asistencia gubernamental",
                            "en":"Government assistance interface proposal"
                        },
                        "loc":"https://demian.app/socialorg/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Programas Sociales:PLP",
                            "en":"Social Programs:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.en_construc]
                    }
                },
                "foodhouse":{
                    "meta":{
                        "short":{
                            "es":"Tienda de platillos preparados en linea",
                            "en":"Online prepared food shop"
                        },
                        "descrip":{
                            "es":"Propuesta de plataforma de venta de comida para pequeños negocios",
                            "en":"Platform proposal for small food business sales"
                        },
                        "loc":"https://demian.app/foodhouse/",
                        "updfreq":"monthly",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Tienda de Comida:PLP",
                            "en":"Food shop:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.en_construc]
                    }
                },
                "dvdrental":{
                    "meta":{
                        "short":{
                            "es":"Renta en linea de películas en DVD",
                            "en":"Online DVD movie lease store"
                        },
                        "descrip":{
                            "es":"Propuesta de plataforma de renta de DVDs físicos",
                            "en":"Platform proposal for physycal DVD rentals"
                        },
                        "loc":"https://demian.app/dvdrental/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Rentador DVD:PLP",
                            "en":"DVD Leaser:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.en_construc]
                    }
                },
                "somema":{
                    "meta":{
                        "short":{
                            "es":"Manejador de redes sociales",
                            "en":"Social media management tool"
                        },
                        "descrip":{
                            "es":"Curación, posteo y rastreo de contenidos de redes sociales",
                            "en":"Curation, posting, and tracking for social media contents"
                        },
                        "loc":"https://demian.app/somema/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "facebooksdk":true,
                        "fbid":fb_id,
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "oa":"345217584200-aaqh5p3p3huigg3hf0bobee8lhtphe41",
                        "title":{
                            "es":"SOmeMA:PLP",
                            "en":"SOmeMA:PLP"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.sph],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.demian_app_somema]
                    }
                },
                "narrar":{
                    "meta":{
                        "short":{
                            "es":"Herramientas para narraciones",
                            "en":"Storytelling tools"
                        },
                        "descrip":{
                            "es":"Herramienta de curación de base de datos para la creación de mundos ficticios",
                            "en":"Database curation tool for the creation of fictional worlds"
                        },
                        "loc":"https://demian.app/narrar/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "facebooksdk":true,
                        "fbid":fb_id,
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "oa":"345217584200-aaqh5p3p3huigg3hf0bobee8lhtphe41",
                        "title":{
                            "es":"Narrador:PLP",
                            "en":"Storyteller:PLP"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.prh],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.demian_app_narrar]
                    }
                },
                "login":{
                    "meta":{
                        "short":{
                            "es":"Aterrizaje OA2",
                            "en":"OA2 Landing"
                        },
                        "descrip":{
                            "es":"Punto de recepción de forwarding por parte de autenticación de OAuth2",
                            "en":"Reception point for OAuth2 authentication forwarding"
                        },
                        "loc":"https://demian.app/login/",
                        "sitemap":false,
                        "index":false,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
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
                        "descrip":{
                            "es":"Información operativa de la plataforma.",
                            "en":"Operational information of the platform."
                        },
                        "loc":"https://demian.app/info/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "title":{
                            "es":"Info:Demian",
                            "en":"Info:Demian"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.edg],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.demian_app_info]
                    },
                    "astra":{
                        "progress":{
                            "meta":{
                                "short":{
                                    "es":"Status Desarrollo",
                                    "en":"Development Status"
                                },
                                "loc":"https://demian.app/info/progress",
                                "sitemap":false,
                                "index":false,
                                "favicon":"desk",
                                "acronimo":"plp"
                            },
                            "intra":{
                                "data":(domain_tree)=> {
                                   return development_info(domain_tree);
                                }
                            }
                        }
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
                "descrip":{
                    "es":"Página principal de mi blog de tecnología y trabajo",
                    "en":"Main page of my technology and work blog"
                },
                "loc":"https://www.demian.app/",
                "sitemap":true,
                "index":true,
                "favicon":"blog",
                "acronimo":"plp"
            },
            "intra":{
                "ganalytics":true,
                "gtag":main_gtag,
                "title":{
                    "es":"Blog:PLP",
                    "en":"Blog:PLP"
                },
                "css":[resources_cache.css.plp],
                "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.www_demian_app]
            },
            "astra":{
                "summon":{
                    "meta":{
                        "short":{
                            "es":"Contenido estático del blog",
                            "en":"Blog static content"
                        },
                        "descrip":{
                            "es":"Depósito de contenidos estáticos permanentes del blog ",
                            "en":"Static permanent contents for the blog"
                        },
                        "loc":"https://www.demian.app/summon/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"blog",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Estáticos:PLP",
                            "en":"Static:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.en_construc]
                    }
                }
            }
        },
        "profesional.demian.app":{
            "meta":{
                "short":{
                    "es":"Portafolio profesional",
                    "en":"Professional portfolio"
                },
                "descrip":{
                    "es":"Página principal de mi portafolio profesional",
                    "en":"Main page of my professional portfolio"
                },
                "loc":"https://profesional.demian.app/",
                "sitemap":true,
                "index":true,
                "favicon":"desk",
                "acronimo":"plp"
            },
            "intra":{
                "ganalytics":true,
                "gtag":main_gtag,
                "title":{
                    "es":"Inicio:PLP",
                    "en":"Home:PLP"
                },
                "css":[resources_cache.css.plp],
                "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.profesional_demian_app]
            },
            "astra":{
                "requirements":{
                    "meta":{
                        "short":{
                            "es":"Requerimientos",
                            "en":"Requirements"
                        },
                        "descrip":{
                            "es":"Requerimientos de plataforma usados para construir mi portafolio laboratorio personal",
                            "en":"Platform requirements used to build my personal laboratory portfolio"
                        },
                        "loc":"https://profesional.demian.app/requirements",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Req:PLP",
                            "en":"Req:PLP"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.demian_basic_nav,resources_cache.js.demian_app_requirements]
                    }
                },
                "design":{
                    "meta":{
                        "short":{
                            "es":"Diseño",
                            "en":"Design",
                        },
                        "descrip":{
                            "es":"Detalles de diseño de mi portafolio laboratorio personal",
                            "en":"Design details for my personal laboratory portfolio"
                        },
                        "loc":"https://profesional.demian.app/design",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Diseño:PLP",
                            "en":"Design:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.g_prods]
                    }
                },
                "implementation":{
                    "meta":{
                        "short":{
                            "es":"Implementación",
                            "en":"Implementation",
                        },
                        "descrip":{
                            "es":"Detalles de implementación de mi portafolio laboratorio personal",
                            "en":"Implementation details for my personal laboratory portfolio"
                        },
                        "loc":"https://profesional.demian.app/implement",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Imple:PLP",
                            "en":"Imple:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
                    }
                },
                "interface":{
                    "meta":{
                        "short":{
                            "es":"Interface",
                            "en":"Interface",
                        },
                        "descrip":{
                            "es":"Detalles de interface para mi portafolio laboratorio personal",
                            "en":"Interface details for my personal laboratory portfolio"
                        },
                        "loc":"https://profesional.demian.app/interface",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Interface:PLP",
                            "en":"Interface:PLP"
                        },
                        "css":[resources_cache.css.plp],
                        "js":[resources_cache.js.alpha,resources_cache.js.en_construc]
                    }
                },
                "physical":{
                    "meta":{
                        "short":{
                            "es":"Físicas",
                            "en":"Physical",
                        },
                        "descrip":{
                            "es":"Diseño de sistemas, consideraciones físicas",
                            "en":"Sistem design, physical considerations"
                        },
                        "loc":"https://profesional.demian.app/physical",
                        "updfreq":"monthly",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Fisicas:PLP",
                            "en":"Physical:PLP"
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
                "descrip":{
                    "es":"Espacio de creación comentario e intercambio de ficción",
                    "en":"Creation discussion and exchange of fiction"
                },
                "loc":"https://remansonocturno.com/",
                "sitemap":true,
                "index":true,
                "favicon":"casa",
                "acronimo":"ren",
                "root_domain":true
            },
            "intra":{
                "ganalytics":true,
                "gtag":main_gtag,
                "title":{
                    "es":"Inicio: Remanso Nocturno",
                    "en":"Home: Nocturnal Remanse",
                },
                "css":[resources_cache.css.ren],
                "js":[resources_cache.js.alpha,resources_cache.js.ren]
            },
            "astra":{
                "index.html":{
                    "meta":{
                        "short":{
                            "es":"Indice",
                            "en":"Index"
                        },
                        "descrip":{
                            "es":"Listado de páginas de primer y segúndo nivel del dominio",
                            "en":"Listing of first and second level pages in the domain"
                        },
                        "loc":"https://www.remansonocturno.com/index.html",
                        "sitemap":true,
                        "index":true,
                        "favicon":"desk",
                        "acronimo":"plp"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Indice:plp",
                            "en":"Index:plp"
                        },
                        "css":[resources_cache.css.sdb,resources_cache.css.ren],
                        "js":[resources_cache.js.alpha]
                    }
                },
                "omno":{
                    "meta":{
                        "short":{
                            "es":"Datos perspectiva comunidad",
                            "en":"Community perspective data"
                        },
                        "descrip":{
                            "es":"Sección colectiva de la plataforma",
                            "en":"Platform colective section"
                        },
                        "loc":"https://remansonocturno.com/omno/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"casa",
                        "acronimo":"ren"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
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
                        "descrip":{
                            "es":"Sección individual de la plataforma.",
                            "en":"Platform individual section"
                        },
                        "loc":"https://remansonocturno.com/umno/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"casa",
                        "acronimo":"ren"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
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
                "descrip":{
                    "es":"Blog de exposición de los contenidos generados por los miembros de la plataforma",
                    "en":"Exposition blog for the contentes generated by the platform users"
                },
                "loc":"https://www.remansonocturno.com/",
                "sitemap":true,
                "index":true,
                "favicon":"blog",
                "acronimo":"ren"
            },
            "intra":{
                "ganalytics":true,
                "gtag":main_gtag,
                "title":{
                    "es":"Blog: Remanso Nocturno",
                    "en":"Blog: Nocturnal Remanse"
                },
                "css":[resources_cache.css.ren],
                "js":[resources_cache.js.alpha,resources_cache.js.ren]
            },
            "astra":{
                "summon":{
                    "meta":{
                        "short":{
                            "es":"Recursos estáticos para el blog",
                            "en":"Static resources for the blog",
                        },
                        "descrip":{
                            "es":"Depósito de contenidos estáticos permanentes del blog ",
                            "en":"Static permanent contents for the blog"
                        },
                        "loc":"https://www.remansonocturno.com/summon/",
                        "sitemap":true,
                        "index":true,
                        "favicon":"blog",
                        "acronimo":"ren"
                    },
                    "intra":{
                        "ganalytics":true,
                        "gtag":main_gtag,
                        "title":{
                            "es":"Estáticos: Remanso Nocturno",
                            "en":"Static: Nocturnal Remanse"
                        },
                        "css":[resources_cache.css.ren],
                        "js":[resources_cache.js.alpha,resources_cache.js.ren]
                    }                
                }
            }
        }
    }// end initial crocia setup
    
    //Self referencing content calculation
    domain_tree["demian.app"].astra["index.html"].intra.html = {
        "en":build_index(domain_tree,"demian.app","en"),
        "es":build_index(domain_tree,"demian.app","es")
    }
    domain_tree["remansonocturno.com"].astra["index.html"].intra.html = {
        "en":build_index(domain_tree,"remansonocturno.com","en"),
        "es":build_index(domain_tree,"remansonocturno.com","es")
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
            res.setHeader("Cache-Control", "public, max-age=86400");"image/x-icon"
            res.setHeader("Content-Type", "image/x-icon");
            finish_request (res,200,resources_cache.favicon[chosen_domain.meta.favicon]);
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
            Contesta a todas las solicitudes de nivel 1 ej... demian.app/info
        */
        if (as_array == undefined) {
            finish_request (res,200,akhenon.html(
                serve_level_1(chosen_domain,adjusted_path,chosen_lng)));
            return;
        };
        /*
            Solo respuestas de nivel 2
        */
        /*
            Para diferenciar y autorizar llamadas internas
              let trimmed_referer;
                if (req.headers.referer != undefined) {
                    trimmed_referer = akhenon.adjust_path(akhenon.clear_query(req.headers.referer));
                }
        */
        if (as_array != undefined) {
            /*
                Si la página tiene una entrada de "data" en intra
                entonces solo es ejecutada la función en ella y 
                se envía el resultado al cliente
            */
            if (chosen_domain.astra[as_array[0]].astra[as_array[1]].intra.data != undefined){
                finish_request (res,200,
                    chosen_domain.astra[as_array[0]].astra[as_array[1]].intra.data(domain_tree));
                return;     
            }else{
                finish_request (res,200,akhenon.html(
                    serve_level_2(chosen_domain,as_array,chosen_lng)));
                return;     
            }
        }
        /*
            De haber pasado la validación de entrada pero no se encontró otro caso que resolviera la solicitud
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
    if (adjusted == "robots.txt" ||
        adjusted == "favicon.ico") {
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
        if (domain_tree[easyurl.host].astra[as_array[0]].astra[as_array[1]] != undefined) {
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
    hc = hc + "<div>"
    for (let entry in party_members) {
        if (party_members[entry].meta.index == true){
            hc = hc + index_div(party_members[entry].meta,chosen_lng);
            for (let route in party_members[entry].astra) {
                if (party_members[entry].astra[route].meta.index == true){
                    hc = hc + index_div(party_members[entry].astra[route].meta,chosen_lng);
                }
            }
        }
    }
    hc = hc + "</div>"
    return hc
}
// genera una entrada div en texto formato html
function index_div (object_meta,chosen_lng) {
    let dc = "";
    if (object_meta.index == true) {
        dc = dc + "<div class='index_entry'>\n";
        dc = dc + "<a href='"+object_meta.loc+"'>"+object_meta.short[chosen_lng]+"</a>\n";
        if (object_meta.descrip != undefined){
            dc = dc + object_meta.descrip[chosen_lng];
        };
        dc = dc + "</div>\n";
    }
    return dc;
}
// entrega algo en el astra de un host
function serve_level_0(chosen_domain,chosen_lng){
    let hedo = {
        "languaje":chosen_lng,
        "title":chosen_domain.intra.title[chosen_lng],
        "css":chosen_domain.intra.css,
        "js":chosen_domain.intra.js,
        "html":["<h1>"+chosen_domain.meta.short[chosen_lng]+"</h1>"]
    };
    if (chosen_domain.meta.descrip != undefined) {
        hedo.descrip = chosen_domain.meta.descrip[chosen_lng]
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
        "languaje":chosen_lng,
        "title":chosen_domain.astra[adjusted_path].intra.title[chosen_lng],
        "css":chosen_domain.astra[adjusted_path].intra.css,
        "js":chosen_domain.astra[adjusted_path].intra.js
    };
    if (chosen_domain.astra[adjusted_path].intra.html != undefined) {
        hedo.html = [chosen_domain.astra[adjusted_path].intra.html[chosen_lng]];
    }else{
        hedo.html = ["<h1>"+chosen_domain.astra[adjusted_path].meta.short[chosen_lng]+"</h1>"];
    };
    if (chosen_domain.astra[adjusted_path].meta.descrip != undefined) {
        hedo.descrip = chosen_domain.astra[adjusted_path].meta.descrip[chosen_lng]
    };
    for (let keys in pass_values_as_found) {
        if (chosen_domain.astra[adjusted_path].intra[keys] != undefined) {
            hedo[keys] = chosen_domain.astra[adjusted_path].intra[keys];
        };
    };
    return hedo;
}0
// Crea una página desde el segundo nivel de astra en el domain_tree
function serve_level_2(chosen_domain,as_array,chosen_lng) {
    let hedo = {
        "languaje":chosen_lng,
        "title":chosen_domain.astra[as_array[0]].astra[as_array[1]].intra.title[chosen_lng],
        "css":chosen_domain.astra[as_array[0]].astra[as_array[1]].intra.css,
        "js":chosen_domain.astra[as_array[0]].astra[as_array[1]].intra.js
    };
    if (chosen_domain.astra[as_array[0]].astra[as_array[1]].intra.html != undefined) {
        hedo.html = [chosen_domain.astra[as_array[0]].astra[as_array[1]].intra.html];
    }else{
        hedo.html = ["<h1>"+chosen_domain.astra[as_array[0]].astra[as_array[1]].meta.short[chosen_lng]+"</h1>"];
    };
    if (chosen_domain.astra[as_array[0]].astra[as_array[1]].meta.descrip != undefined) {
        hedo.descrip = chosen_domain.astra[as_array[0]].astra[as_array[1]].meta.descrip[chosen_lng]
    };
    for (let keys in pass_values_as_found) {
        if (chosen_domain.astra[as_array[0]].astra[as_array[1]].intra[keys] != undefined) {
            hedo[keys] = chosen_domain.astra[as_array[0]].astra[as_array[1]].intra[keys];
        };
    };
    return hedo;
}
function development_info(domain_tree) {
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
    return JSON.stringify(response);
}