/*
    Este archivo se encarga de la identificación del usuario con la plataforma
    Probablemente se integre a framework.js
*/
function global_session_manager(multy_caller){
    switch (multy_caller.st) {
        case "init":

        break;
        case "inpu": break;
        case "temp": break;
    }
}

let logging_device = global_session_manager({
    "st":"init",
    "message":{
        "es":"Declara tu lazo ante el umbral de los creadores",
        "en":"State your bond with the gate of creators"
    }
});