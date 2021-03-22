exports.spawn = () => {
    return {
        "rep_sh":"",
        "start": function (rep) {
            this.rep_sh = this.rep_sh + "<div>Service number: "+rep.service_no+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>Timestamp: "+rep.timestamp+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>Great step: "+rep.step+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>Caller ip: "+rep.caller_ip+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>Decided languaje: "+rep.languaje+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>Requested host: "+rep.host+"</div>\n";
            this.rep_sh = this.rep_sh + "<div>Method: "+rep.method+"</div>\n";
        },
        "tag": function (tag) {
            this.rep_sh = this.rep_sh + "<div>proc_tag: "+tag+"</div>\n";
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