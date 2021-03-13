var fs = require("fs");
var target = fs.readFileSync("/home/andthenbeyond/webmaster/server_log.txt").toString("utf8");
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

    //console.log("starting at: "+start_at+" break_position: "+break_position);

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
var opt_to_check = 1;

console.log ("Fragmentos a procesar: "+string_array.length+" Comenzando evaluación");

var GET_counter = 0;
var POST_counter = 0;
var OTHER_counter = 0;

for (entry of string_array) {
    var manipulable = JSON.parse(entry)
    if (manipulable.method == "GET") {
        GET_counter++
    } else if (manipulable.method == "POST") {
        POST_counter++
    } else {
        OTHER_counter++
        console.log(manipulable);
    }
}

console.log({GET_counter,POST_counter,OTHER_counter});


