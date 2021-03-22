/* single page apps domain, check specific and send */
const domain_map = {
    "demian.app":{
        "routes":{
            "/":{
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
                    "priority":0.3
                },
            },
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
                    "priority":0.5
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
                    "priority":0.3
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
                    "priority":0.5
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
                    "priority":0.5
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
                    "priority":0.5
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
                    "priority":0.5
                }
            }
        }
    },
    "www.demian.app":{
        "routes":{
            "/":{
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
                    "priority":0.6
                }
            },
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
                    "priority":0.5
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
                    "priority":0.4
                }                    
            }
        }
    },
    "profesional.demian.app":{
        "routes":{
            "/":{
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
                    "priority":0.6
                }
            },
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
                    "priority":0.5
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
                    "priority":0.5
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
                    "priority":0.5
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
                    "lastmod":"2021-19-03"
                }
            }
        }
    }
};

const domain_wide = {
    "/favicon.ico":{
        "action":"direct_file",
        "path":"/home/andthenbeyond/sitiopersonal/computeengine/escritorio.ico"
    },
    "/index.html":{
        "action":"calculate",
        "formula": (domain_map) => {
            var hc = "<h1>PLP:Demian</h1>\n";
            for (var domnsub in domain_map) {
                if (domain_map[domnsub].meta.index == true) {
                    hc = hc + "<div>\n";
                    hc = hc + domain_map[domnsub].meta.short[rep.languaje]+"\n";
                    hc = hc + "<a href='"+domain_map[domnsub].meta.loc+"'>"+domain_map[domnsub].meta.loc+"</a>\n";
                    hc = hc + "</div>\n";
                }                    
                if (domain_map[domnsub].routes != undefined) {
                    for (var sub_route in domain_map[domnsub].routes) {
                        if (domain_map[domnsub].routes[sub_route].meta.index == true) {
                            hc = hc + "<div>\n";
                            hc = hc + domain_map[domnsub].routes[sub_route].meta.short[rep.languaje]+"\n";
                            hc = hc + "<a href='"+domain_map[domnsub].routes[sub_route].meta.loc+"'>"+domain_map[domnsub].routes[sub_route].meta.loc+"</a>\n";
                            hc = hc + "</div>\n";
                        }
                    }
                }
            }
            const options = {
                "type":"html",
                "languaje":rep.languaje,
                "title":"PLP:Demian",
                "html":hc
            }
            res.writeHead(200);
            res.end(rf.craft(options));
        }
    },
    "/robots.txt":{
        "action":"calculate",
        "formula": (domain_map) => {
            const options = {
                "type":"robots",
                "target":"https://www.remansonocturno.com/sitemap.xml"
            }
            res.writeHead(200);
            res.end(rf.craft(options));
        }
    },
    "/sitemap.xml":{
        "action":"calculate",
        "formula": (domain_map) => {
            const options = {
                "type":"sitemap",
                "domain_map":domain_map
            }
            res.writeHead(200);
            res.end(rf.craft(options));
        }
    }
};

exports.route = (req,res,rep,rf,fs) => {
    var served = false;
    if (req.method == "GET") {
       if (served != true) {
        /*
            para llegar a este punto se ha validado el domain como demian.app, solicitudes a este o sus subdominios www y profesional reciben respuestas
            uniformes para indice sitemap y robots.
            ej 
            https://demian.app/index.html, https://www.demian.app/index.html y https://profesional.demian.app/index.html entregarán las mismas respuestas
            asi como https://demian.app/conavi/index.html, https://www.demian.app/estatico/index.html y https://profesional.demian.app/tonterias/index.html

            domain wide se habilita inicialmente de forma tentativa para lograr que todos los dominios y subdominios conduzcan a un indice central.
            conforme sub indices más precisos se construyan se tendrá que cambiar la lógica para ellos, pero robots y sitemap pueden permanecer en esta dinamica
        */
            for (var dom_wide_opt in domain_wide) {
                if (rep.pathname == dom_wide_opt) {
                    if (domain_wide[rep.pathname].action == "calculate") {
                        domain_wide[rep.pathname].formula(domain_map)
                    }else if (domain_wide[rep.pathname].action == "direct_file") {
                        res.writeHead(200);
                        res.end(fs.readFileSync(domain_wide[rep.pathname].path));
                    }
                    served = true;
                    break;
                }
            }
        }
        if (served != true) {
            for (var domain_or_subdomain in domain_map) {
                if (rep.host == domain_or_subdomain) {
                    /*
                        este es el lugar donde se lanzará la evaluación del recurso solicitado cuando este sea una url o bien de los parámetros específicos de búsqueda
                        de momento solo está configurado para mostrar lo que se encuentra en el domain_map que en realidad está destinado para el indice sitemaps y robots
                        pero en lo que se hacen las páginas pruebo así que se pueda hacer la entrega y evaluación segmentada.
                    */
                    if (domain_map[domain_or_subdomain].routes[rep.pathname] != undefined) {
                        const options = {
                            "type":"html",
                            "languaje":rep.languaje,
                            "html":"<h1>"+domain_map[domain_or_subdomain].routes[rep.pathname].meta.short[rep.languaje]+"</h1>"
                        }
                        res.writeHead(200);
                        res.end(rf.craft(options));
                        served = true;
                        break;
                    }
                    if (served != true) {
                        var languajed_errors = {
                            "en":"404: resource unknown",
                            "es":"404: recurso desconocido",
                        };
                        const options = {
                            "type":"html",
                            "title":"404",
                            "languaje":rep.languaje,
                            "html":"<h1>"+languajed_errors[rep.languaje]+"</h1>"
                        }
                        res.writeHead(404);
                        res.end(rf.craft(options));
                        served = true;
                        break;
                    }                    
                }
            }
        }
    }
}

