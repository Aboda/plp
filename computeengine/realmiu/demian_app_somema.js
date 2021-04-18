/*
    Esta página es una herramienta de captura, curación, publicción, rastreo y organización
    de contenidos de internet. 

    Inicialmente manejará imágenes con copy y tags a voluntad
    Posteriormente permitirá la conexión con redes sociales para habilitar
    el uso de la base de datos constantemente curada
*/

let sidemenu = [
    {
        "es":"Volver a Inicio",
        "en":"Return Home",
        "go":()=>{
            window.location.href = "https://demian.app/";
        }
    },
    {
        "es":"Idioma: Español, change to English",
        "en":"Languaje: English, cambiar a Español",
        "go":(e)=>{
            let processed = window.location.href;
            let check = processed.indexOf("?");
            if (check != -1) {
                processed = processed.slice(0,check);
            }
            if (ao.lng == "es"){
                window.location = processed + "?lng=en";
            }else if (ao.lng == "en"){
                window.location = processed + "?lng=es";
            }
        }
    },
    {
        "es":"Perfil",
        "en":"Profile",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Desconectarse",
        "en":"Logoff",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Generar Registro",
        "en":"Create Record",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Ver Existentes",
        "en":"See Existing",
        "go":(params_if_any)=>{
            closeNav();
        }
    }
];

let initial_message = {
    "en":"Welcome to the content curation site",
    "es":"Bienvenidos al sitio de curación de contenidos"
}

let follow_message = {
    "en":"Please pick an action from left hand menu",
    "es":"Porfavor seleccióna una acción del menú de la izqierda"
}

function send_to_collection () {
    let test_data = {
        "timestamp":Date.now().toString(),
        "message":"hola"
    }
    let collectos = "https://script.google.com/macros/s/AKfycbzIePzuXLQWFslJv03RzQDQWGC9zMNRQt2_63cw7BaEUSQqQPZwFvSDszK5yI7WZFaa/exec";
    ao.fe("POST",collectos,console.log,JSON.stringify(test_data));
}

window.onresize = () => {
    ao.screen_adjust();
};

window.onload = () => {
    ao.interface(sidemenu);
    ao.main = document.getElementById("from_home");
    ao.main.append(ao.qq({"nodetype":"p","innerText":initial_message[ao.lng]}));
    ao.main.append(ao.qq({"nodetype":"p","innerText":follow_message[ao.lng]}));
};