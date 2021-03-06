
exports.copy_obj = (thingtocopy) => {
    return JSON.parse(JSON.stringify(thingtocopy));
}
//pone bonitas las direcciones ipv4 expresadas en formato ipv6
exports.clean_ipv6_trail_if_present = (ipv6stringshowingipv4) => {
    var ipv6_trail_position = ipv6stringshowingipv4.indexOf("::ffff:");
    if (ipv6_trail_position != -1) {
        return ipv6stringshowingipv4.substr(7);
    }else{
        return ipv6stringshowingipv4;
    }
}
exports.adjust_path = (pathname) => {
    /*
        Si el último elemento del string es un /, lo elimina
    */
    if (pathname[pathname.length -1] == "/") {
        pathname = pathname.substring(0,pathname.length -1);
    }
    /*
        Si el primer elemento del string es un /, lo elimina 
    */
    if (pathname[0] == "/") {
        pathname = pathname.substring(1,pathname.length)
    }
    return pathname;
}
exports.clear_query = (pathname) => {
    if (pathname.indexOf("?") !=  -1) {
        pathname = pathname.substring(0,pathname.indexOf("?"));
    }
    return pathname;
}
//Crea html + css + js con convenciones y opciones indicadas
exports.html = (options,chosen_lng) => {
    /*
        Opciones:
        languaje
        ganalitycs
        gtag
        oa
        title
        robo
        dynamic
        css
        facebooksdk
        fbid
        html
        js
    */
    var ph = "<!DOCTYPE html>\n";
    if (options.languaje == "es" || chosen_lng == "es") {
        ph =  ph +"<html lang='es-MX'>\n";
    } else {
        ph =  ph + "<html lang='en-US'>\n";          
    }
    ph = ph + "<head>\n";
    if (options.ganalytics == true) {
        /*
            ph = ph + "<script async src='https://www.googletagmanager.com/gtag/js?id='"+options.gtag+"'></script>\n";
            ph = ph + "<script>\n";
            ph = ph + "window.dataLayer = window.dataLayer || [];\n";
            ph = ph + "function gtag(){dataLayer.push(arguments);}\n";
            ph = ph + "gtag('js', new Date());\n";
            ph = ph + "gtag('config', '"+options.gtag+"');\n";
            ph = ph + "</script>\n";
        */
        ph = ph + "<!-- Google Tag Manager -->";
        ph = ph + "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':";
        ph = ph + "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],";
        ph = ph + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=";
        ph = ph + "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);";
        ph = ph + "})(window,document,'script','dataLayer','GTM-MXKB7NV');</script>";
        ph = ph + "<!-- End Google Tag Manager -->";
    }
    if (options.title != undefined) {
        ph = ph + "<title>"+options.title+"</title>\n";
    };
    ph = ph + "<base target='_top'>\n";
    ph = ph + "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>\n";
    ph = ph + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n";
    if (options.descrip != undefined) {
        ph = ph + "<meta name='description' content='"+options.descrip+"'>\n";
    };
    if (options.robo == true) {
        ph = ph + "<link href='https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap' rel='stylesheet'>\n";
    };
    if (options.dynamic == "redirect") {
        ph = ph + "<meta http-equiv='refresh' content='"+options.delay+"; URL="+options.target+"' />\n";
    };
    if (options.css != undefined) {
        ph = ph + "<style>\n";
        for (modules of options.css) {
            ph = ph + modules+"\n";
        }
        ph = ph + "</style>\n";
    }
    ph = ph + "</head>\n";
    ph = ph + "<body>\n";
    if (options.html != undefined) {
        ph = ph + "<div id='from_home' class='app_container'>\n";
        for (var html_block of options.html) {
            ph = ph + html_block+"\n";  
        }        
        ph = ph + "</div>\n";
    }
    ph = ph + "</body>\n";
    if (options.ganalytics == true) {
        ph = ph +  "<!-- Google Tag Manager (noscript) -->";
        ph = ph +  "<noscript><iframe src='https://www.googletagmanager.com/ns.html?id=GTM-MXKB7NV'";
        ph = ph +  "height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript>"
        ph = ph +  "<!-- End Google Tag Manager (noscript) -->"
    }
    if (options.js != undefined) {
        ph = ph + "<script>\n";
        let wait_1 = 0;
        for (modules of options.js) {
            if (wait_1 == 1) {
                if (options.facebooksdk == true) {
                    ph = ph + "ao.fbid = "+options.fbid+";\n";
                }
                if (options.oa != undefined) {
                    ph = ph + "ao.oaid = '"+options.oa+"';\n";
                };
            }
            ph = ph + modules+"\n";
            wait_1++;
        }
        ph = ph + "</script>\n";
    }
    ph = ph + "</html>";
    return ph;
}

function site_entry (d) {
    return "<url><loc>"+d.loc+"</loc></url>\n";
}

exports.sitemap = (domain_tree,domain_name) => {
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
    var ph = "<?xml version='1.0' encoding='UTF-8'?>\n";
    ph = ph + "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>\n";
    for (let options in party_members) {
        ph = ph + site_entry(party_members[options].meta);
        for (var route in party_members[options].astra) {
            var d = party_members[options].astra[route].meta;
            if (d.sitemap == true) {
                ph = ph + site_entry(d);
            }
        }        
    }
    ph = ph + "</urlset>";
    return ph;
}

exports.robots = (target) => {
    var ph = "# Group 1\n";
    ph = ph + "User-agent: *\n";
    ph = ph + "Allow: /\n";
    ph = ph + "Sitemap: "+target;
    return ph;
}

exports.teller = () => {
    return {
        "action_no":0,
        "rep_sh":"",
        "tag": function (tag) {
            this.rep_sh = this.rep_sh + "<div>proc_tag "+this.action_no+" : "+tag+"</div>\n";
            this.action_no++
        },
        "insert": function (html) {
            this.rep_sh = this.rep_sh + html + "\n";
            this.action_no++
        },
        "end": function (tagstring,rf) {
            return this.rep_sh
        }
    }
}

exports.assert_lng = (acclngstr,searchstring) => {
    var default_lang = "en";
    var chosen_lang;
    //procesar header "accept-language":"en-US,en;q=0.9,es;q=0.8,gl;q=0.7"
    if (acclngstr != undefined) {
        var es_pos = acclngstr.indexOf("es");
        var en_pos = acclngstr.indexOf("en");
        if (es_pos != -1 && en_pos == -1) {chosen_lang = "es"} else
        if (en_pos != -1 && es_pos == -1) {chosen_lang = "en"} else
        if (en_pos != -1 && en_pos < es_pos && es_pos != -1){chosen_lang = "en";}else 
        if (es_pos != -1 && es_pos < en_pos && en_pos != -1){chosen_lang = "es";}
    }    
    //procesar parámetro ?lng=es
    if (searchstring != "") {
        if (searchstring.includes("lng")) {
            var required_languaje = searchstring.substring(searchstring.indexOf("lng")+4,searchstring.indexOf("lng")+6);
            if (required_languaje == "en" || required_languaje == "es") {
                chosen_lang = required_languaje;
            }
        }  
    }
    if (chosen_lang == undefined) {chosen_lang = default_lang;};
    return chosen_lang;
}