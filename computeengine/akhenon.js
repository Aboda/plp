
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
    if (pathname[pathname.length -1] == "/") {
        pathname = pathname.substring(0,pathname.length -1);
    }
    if (pathname[0] == "/") {
        pathname = pathname.substring(1,adjusted.length)
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
        ph =  ph +"<html lang='es-MX'></html>\n";
    } else {
        ph =  ph + "<html lang='en-US'></html>\n";          
    }
    ph = ph + "<head>\n";
    if (options.ganalytics == true) {
        ph = ph + "<script async src='https://www.googletagmanager.com/gtag/js?id='"+options.gtag+"'></script>\n";
        ph = ph + "<script>\n";
        ph = ph + "window.dataLayer = window.dataLayer || [];\n";
        ph = ph + "function gtag(){dataLayer.push(arguments);}\n";
        ph = ph + "gtag('js', new Date());\n";
        ph = ph + "gtag('config', '"+options.gtag+"');\n";
        ph = ph + "</script>\n";
    }
    if (options.title != undefined) {
        ph = ph + "<title>"+options.title+"</title>\n";
    };
    ph = ph + "<base target='_top'>\n";
    ph = ph + "<meta charset='UTF-8'>\n";
    ph = ph + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n";
    if (options.robo != false) {
        ph = ph + "<link href='https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap' rel='stylesheet'></link>\n";
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
    if (options.facebooksdk == true) {
        ph = ph + "<script>\n";
        ph = ph + "window.fbAsyncInit = function() {\n";
        ph = ph + "FB.init({\n";
        ph = ph + "appId            : '"+options.fbid+"',\n";
        ph = ph + "autoLogAppEvents : true,\n";
        ph = ph + "xfbml            : true,\n";
        ph = ph + "version          : 'v10.0'\n";
        ph = ph + "});\n";
        ph = ph + "};\n";
        ph = ph + "</script>\n";
        ph = ph + "<script async defer crossorigin='anonymous' src='https://connect.facebook.net/en_US/sdk.js'></script>\n";
    }
    if (options.html != undefined) {
        console.log("cargando modulo html\n",options.html);
        ph = ph + options.html;
    }
    ph = ph + "</body>\n";
    if (options.js != undefined) {
        ph = ph + "<script>\n";
        for (modules of options.js) {
            ph = ph + modules+"\n";
        }
        ph = ph + "</script>\n";
    }
    ph = ph + "</html>";
    return ph;
}

function site_entry (d) {
    var entry = ""
    entry = entry + "<url>\n";
    entry = entry + "<loc>"+d.loc+"</loc>\n";
    if (d.changefreq != undefined){entry = entry + "<changefreq>"+d.changefreq+"</changefreq>\n";};
    if (d.priority != undefined){entry = entry + "<priority>"+d.priority+"</priority>\n";};
    if (d.lastmod != undefined){entry = entry + "<lastmod>"+d.lastmod+"</lastmod>\n";};
    entry = entry + "</url>\n";
    return entry;
}

exports.sitemap = (options) => {
    var ph = "<?xml version='1.0' encoding='UTF-8'?>\n";
    ph = ph + "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>\n";
    ph = ph + site_entry(options.meta);
    for (var route in options.astra) {
        var d = options.astra[route].meta;
        if (d.sitemap == true) {
            ph = ph + site_entry(d);
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