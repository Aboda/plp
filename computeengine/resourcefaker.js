exports.craft = (options) => {
    if (options.type == "html") {
        var ph = "<!DOCTYPE html>\n";
        if (options.languaje == "es") {
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
    } else if (options.type == "robots") {
        var ph = "# Group 1\n";
        ph = ph + "User-agent: *\n";
        ph = ph + "Allow: /\n";
        ph = ph + "Sitemap: "+options.target;
        return ph;
    } else if (options.type == "sitemap") {
        var ph = "<?xml version='1.0' encoding='UTF-8'?>\n";
        ph = ph + "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>\n";
        for (var top_entry in options.domain_map) {
            ph = ph + "<url>\n";
            var d = options.domain_map[top_entry].meta;
            ph = ph + "<loc>"+d.loc+"</loc>\n";
            if (d.changefreq != undefined){ph = ph + "<changefreq>"+d.changefreq+"</changefreq>\n";};
            if (d.priority != undefined){ph = ph + "<priority>"+d.priority+"</priority>\n";};
            if (d.lastmod != undefined){ph = ph + "<lastmod>"+d.lastmod+"</lastmod>\n";};
            ph = ph + "</url>\n";
            /*did not want to create an assistive function at the time repeats cycle o
            on subroutes depth 1*/
            if (options.domain_map[top_entry].routes != undefined) {
                for (var sub_entry in options.domain_map[top_entry].routes) {
                    ph = ph + "<url>\n";
                    var sd = options.domain_map[top_entry].routes[sub_entry].meta;
                    ph = ph + "<loc>"+sd.loc+"</loc>\n";
                    if (d.changefreq != undefined){ph = ph + "<changefreq>"+sd.changefreq+"</changefreq>\n";};
                    if (d.priority != undefined){ph = ph + "<priority>"+sd.priority+"</priority>\n";};
                    if (d.lastmod != undefined){ph = ph + "<lastmod>"+sd.lastmod+"</lastmod>\n";};
                    ph = ph + "</url>\n";
                }
            }
        }
        ph = ph + "</urlset>";
        return ph;
    }
}