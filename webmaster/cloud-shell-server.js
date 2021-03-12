var fs = require("fs");
var http = require("http");

http.createServer((req, res) => {
    res.writeHead(200);
    res.end(fs.readFileSync("/home/andthenbeyond/sitiopersonal/theserverisalie.html"));
}).listen(8080)