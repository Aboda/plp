/* blog with social area */
exports.route = (req,res,rep,rf,fs) => {
    var served = false;

    const title_langopts = {
        "es":"Remanso Nocturno",
        "en":"Nocturnal Haven"
    };

    const domain_map = {
        "remansonocturno.com": {
            "meta":{
                "short":{
                    "es":"Red social de creadores",
                    "en":"Creators social network"
                },
                "loc":"https://remansonocturno.com/",
                "updfreq":"daily",
                "sitemap":true,
                "index":true,
                "robots":true,
                "priority":0.3
            }
        },
        "www.remansonocturno.com":{
            "meta":{
                "short":{
                    "es":"Ficción de varios sabores y en diversas presentaciones",
                    "en":"Fiction in varied flavors and presentations"
                },
                "loc":"https://www.remansonocturno.com/",
                "updfreq":"daily",
                "sitemap":true,
                "index":true,
                "robots":true,
                "priority":0.6
            },
            "routes":{
                "estat":{
                    "meta":{
                        "short":{
                            "es":"recursos estáticos para el blog",
                            "en":"static resources for the blog",
                        },
                        "loc":"https://www.remansonocturno.com/estat/",
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
                            "es":"recursos dinámicos para el blog",
                            "en":"dynamic resources for the blog",
                        },
                        "loc":"https://www.remansonocturno.com/dinam/",
                        "updfreq":"always",
                        "sitemap":true,
                        "index":true,
                        "robots":true,
                        "priority":0.4
                    }                    
                }
            }
        }
    };
    
    const domain_wide = {
        "/favicon.ico":{
            "action":"direct_file",
            "path":"/home/andthenbeyond/sitiopersonal/cloudbucket/sha/blog.ico"
        },
        "/index.html":{
            "action":"calculate",
            "formula": (domain_map) => {
                var hc = "<h1>"+title_langopts[rep.languaje]+"</h1>\n";
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
                    "title":title_langopts[rep.languaje],
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
                    "target":"https://www.demian.app/sitemap.xml"
                }
                res.writeHead(200);
                res.end(rf.craft(options));
            }
        },
        "/sitemap.txt":{
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
    
    if (req.method == "GET") {
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

        if (served != true) {
            for (var domain_or_subdomain in domain_map) {
                if (rep.host == domain_or_subdomain) {
                    if (domain_or_subdomain.routes[rep.pathname] != undefined) {
                        const options = {
                            "type":"html",
                            "languaje":rep.languaje,
                            "html":"<h1>"+domain_or_subdomain.routes[rep.pathname].meta.short[rep.languaje]+"</h1>"
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