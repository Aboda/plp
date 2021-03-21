/*
  This file needs to be evolved to a version where it creates a set of possible combinations trough 
  server:html_base_creator and stores them as static preset versions for a CDN to deliever in the scenario
  where we achieve success on any non dynamic content. 

  Currently 2021 03 15 it is non operational as it onlyintegrated 3 files into an html
*/

var fs = require("fs");

var html = fs.readFileSync("/home/andthenbeyond/webmaster/plp/Inicio.html");
console.log("Longitud html: "+html.length);
var css = fs.readFileSync("/home/andthenbeyond/webmaster/plp/Inicio.css");
console.log("Longitud css: "+css.length);
var js = fs.readFileSync("/home/andthenbeyond/webmaster/plp/Inicio.js");
console.log("Longitud js: "+js.length);

function insert_at(text_to_intervene,text_to_add,position) {
    var assembled =
    text_to_intervene.slice(0,position) +
    text_to_add +
    text_to_intervene.slice(position);
    return assembled;
}

html = insert_at(html,css,html.indexOf("<style></style>") + 7);
html = insert_at(html,js,html.indexOf("<script></script>") + 8);

console.log("Longitud final: "+html.length+" guardando...");

fs.writeFile("/home/andthenbeyond/sitiopersonal/theserverisalie.html",html,(err) => {
  if (err) throw err;
  console.log("Archivo Creado");
});