/*
    Este archivo se encarga de la identificación del usuario con la plataforma
    Probablemente se integre a framework.js
*/
function global_session_manager(multy_caller){
    switch (multy_caller.st) {
        case "init":
            let conten = ao.qq({"nodetype":"div","styles":[""]});
            let mensaje = ao.qq({"nodetype":"p","innerText":multy_caller.message[ao.lng]});
            let correo = ao.qq({"nodetype":"email"});
            let clave = ao.qq({"nodetype":"password"});
            let olvide = ao.qq({"nodetype":"a"});
            let regis = ao.qq({"nodetype":"a"});
            let volver = ao.qq({"nodetype":"button"});
            let continuar = ao.qq({"nodetype":"button"});
            conten.append(mensaje);
            conten.append(correo);
            conten.append(clave);
            conten.append(olvide);
            conten.append(regis);
            conten.append(volver);
            conten.append(continuar);
            return conten;
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