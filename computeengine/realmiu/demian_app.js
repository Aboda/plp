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
    "es":"Bienvenid@ a mi espacio de desarrollo y aprendizaje personal, por favor indica qué es lo que te trajo aqui para poder canalizarte al portal adecuado:"
}

let initial_options = [
    {
        "es":"Soy un profesionista independiente o empresa pequeña en búsqueda de consultoría para automatizar un proceso existente o bien atacar un problema técnico que no he solventado.",
        "en":"I am an independant professional or small business searching for consulting services to automate an existing process or to tackle an unresolved technical issue."
    },
    {
        "es":"Soy una empresa mediana o grande en búsqueda de un desarrollador competente y autodidacta, con experiencia corporativa y de perspectiva integral para unirse a mi equipo de desarrollo existente.",
        "en":"I am mid to large business in search of a skilled, self teaching developer with corporate expereince and wide perspective to join my existing development team"
    },
    {
        "es":"Soy una startup con un proyecto de app que deseo desarrollar, o que ya se encuentra en desarrollo y deseo una perspectiva adicional",
        "en":"I am a startup with an app proyect that I want developed, or that I am already developing and want to have an additional perspective"
    },
    {
        "es":"Soy usuario de algúna de las web apps existentes de esta plataforma",
        "en":"I am a user from one of the existing web apps in this platform"
    },
    {
        "es":"Ninguno de los anteriores",
        "en":"None of the above"
    }
]

function do_opts(initial_options) {
    ao.opt1 = {};
    let option_container = ao.qq({"nodetype":"div","id":"option_container"},ao.opt1);
    for (items of initial_options) {
        option_container.append(ao.qq({
            "nodetype":"div",
            "innerText":items[ao.lng],
            "styles":["botopts"]
        },ao.opt1));
    }
    return option_container;
}

window.onresize = () => {
    ao.screen_adjust();
};
window.onload = () => {
    ao.interface(sidemenu);
    ao.main = document.getElementById("from_home");
    ao.main.append(ao.qq({"nodetype":"p","innerText":initial_message[ao.lng]}))
    ao.main.append(do_opts(initial_options))
};

