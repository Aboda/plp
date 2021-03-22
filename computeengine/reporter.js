exports.spawn = () => {
    return {
        "rep_sh":"",
        "start": function (rep) {
            this.rep_sh = this.rep_sh + "<div>"+rep.service_no+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>"+rep.timestamp+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>"+rep.step+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>"+rep.caller_ip+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>"+rep.languaje+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>"+rep.host+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>"+rep.method+"</div>\n";
        },
        "tag": function (tag) {
            this.rep_sh = this.rep_sh + "<div>"+tag+"</div>\n";
        },
        "end_by_error": function (tagstring,rf) {
            return rf.craft({
                "type":"html",
                "title":"porter",
                "html":this.rep_sh
            });
        }
    }
}