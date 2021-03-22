exports.spawn = () => {
    return function report () {
        var rep_sh = "";
        var start = (rep) => {
            rep_sh = rep_sh + "<div>"+rep.service_no+"</div>\n";
            rep_sh = rep_sh + "<div>"+rep.timestamp+"</div>\n";
            rep_sh = rep_sh + "<div>"+rep.step+"</div>\n";
            rep_sh = rep_sh + "<div>"+rep.caller_ip+"</div>\n";
            rep_sh = rep_sh + "<div>"+rep.languaje+"</div>\n";
            rep_sh = rep_sh + "<div>"+rep.host+"</div>\n";
            rep_sh = rep_sh + "<div>"+rep.method+"</div>\n";
        }
        var tag = (tag) => {
            rep_sh = rep_sh + "<div>"+tag+"</div>\n";
        }
        var end_by_error = (tagstring,rf) => {
            return rf.craft({
                "type":"html",
                "title":"porter",
                "html":rep_sh
            });
        }
    }
}