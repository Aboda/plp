/*
    Esta página debe de presentar al usuario la opción de decir si es
    a) un posible empleador
    b) un usuario de una solución
    c) otra persona

    en el primer caso, se le reenviará a profesional.demian.app
    en el segundo caso, se le mostrará la lista de soluciones disponibles
    en el tercer caso se le enviará a www.demian.app
*/

let sidemenu = [
    {
        "es":"Idioma: Español, cambiar a inglés",
        "en":"Languaje: English, change to spanish",
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
        "es":"Ingresar",
        "en":"Login",
        "go":(params_if_any)=>{
            closeNav();
            console.log("correr dinámica de loggeo de plp");
        }
    },
    {
        "es":"Contactame",
        "en":"Message Me",
        "go":(params_if_any)=>{
            closeNav();
            console.log("envío de mensajes al webmaster");
        }
    },
    {
        "es":"Preguntas Frecuentes",
        "en":"FAQ",
        "go":(params_if_any)=>{
            closeNav();
            console.log("faq");
        }
    }
];

let initial_message = {
    "en":"Welcome to my personal development and learning environment, please let me know what brought you here to send you to the right place:",
    "es":"Bienvenid@ a mi espacio de desarrollo y aprendisaje personal, por favor indica qué es lo que te trajo aqui para poder canalizarte al portal adecuado:"
}

let initial_options = [
    {
        "es":"Soy un posible empleador o cliente",
        "en":"I am a possible employer or custommer"
    },
    {
        "es":"Soy un usuario registrado en una o más apps",
        "en":"I am a user of one or more apps"
    },
    {
        "es":"Ninguna de las anteriores",
        "en":"None of the above"
    }
]

window.onresize = () => {
    ao.screen_adjust();
};
window.onload = () => {
    ao.interface(sidemenu);
    document.getElementById("from_home").append(ao.qq({"nodetype":"p","innerText":initial_message[ao.lng]}))
};

