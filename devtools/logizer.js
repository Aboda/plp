/*
  This file aspires to be a standalone that is run to perform some digestion on the logged events
*/
var fs = require("fs");
var target = fs.readFileSync("D:\\Dev\\server_log.txt").toString("utf8");
var string_array = [];
var start_at = 0;
var do_continue = true;

while (do_continue) {
    
    var break_position;
    
    if (start_at == 0){
        break_position = target.indexOf(",\n");
    }else{
        break_position = target.indexOf(",\n",start_at+1);
    }

    if (break_position != -1) {
        var piece; 
            if (start_at == 0){
                piece = target.slice(start_at,break_position);
            }else{
                piece = target.slice(start_at + 2,break_position);
            }
        string_array.push(piece);
    }else{
        do_continue = false;
    }
    start_at = break_position;
}

console.log ("Fragmentos a procesar: "+string_array.length+" Comenzando evaluación");

var GET_counter = 0;
var POST_counter = 0;
var OTHER_counter = 0;

var demian_counter = 0;
var demian2_counter = 0;
var demian3_counter = 0;
var remanso_counter = 0;
var remanso2_counter = 0;
var pubip_counter = 0;

for (entry of string_array) {
    var manipulable = JSON.parse(entry)
    console.log(manipulable);

    if (manipulable.method == "GET") {
        GET_counter++
    } else if (manipulable.method == "POST") {
        POST_counter++
    } else {
        OTHER_counter++
    }

    if (manipulable.host == "demian.app") {
        demian_counter++
    } else if (manipulable.host == "www.demian.app") {
        demian2_counter++
    } else if (manipulable.host == "profesional.demian.app") {
        demian3_counter++
    }else if (manipulable.host == "remansonocturno.com") {
        remanso_counter++
    }else if (manipulable.host == "www.remansonocturno.com") {
        remanso2_counter++
    } else {
        pubip_counter++
    }
}

console.log({
    GET_counter,
    POST_counter,
    OTHER_counter,
    demian_counter,
    demian2_counter,
    demian3_counter,
    remanso_counter,
    remanso2_counter,
    pubip_counter
});