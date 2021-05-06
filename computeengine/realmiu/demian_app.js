/*
    Esta página consulta la naturaleza del nuevo arribo para canalizarlo al
    contenido pensado para el. 

    Es distribuidor de la plataforma de demian.app como principal tarea, pero
    tambien se pueden apreciar cosas de remansonocturno.com
*/
let sidemenu = [
    {
        "es":"Información de Plataforma",
        "en":"Platform Information",
        "go":()=>{
            window.location.href = "https://demian.app/info";
        }
    }
];
let initial_message = {
    "en":"Welcome to my personal development and learning environment, please let me know what brought you here to better route you to the right portal:",
    "es":"Bienvenidao a mi espacio de desarrollo y aprendizaje personal, por favor indica qué es lo que te trajo aqui para poder canalizarte al portal adecuado:"
}
let final_message = {
    "en":"The operation cost of this server and its pages is 25$ USD per year, this for the 2 domains it holds. It is hosted in free infrastructure offered by Google Cloud and employs open source software where I did not personally write the code for it",
    "es":"El costo de operación de este servidor y sus páginas es 520$ MXN anuales por los dominios que hospeda. Está albergado en infraestructura gratuita ofrecida por Google Cloud y emplea software open source donde no programé personalmente el código."
}
let initial_options = [
    {
        "es":"Soy un profesionista independiente, empleado o empresa pequeña en búsqueda de consultoría para automatizar un proceso existente o bien atacar un problema técnico que no he solventado.",
        "en":"I am an independent professional, employee or small business searching for consulting services to automate an existing process or to tackle an unresolved technical issue.",
        "go":()=>{
            console.log("Generar batería de aclaración para saber si mostrarle portafolio, cv, formato de mensaje sencillo, o formato de agenda de consultoría pagada");
        }
    },
    {
        "es":"Soy una empresa mediana o grande en búsqueda de un desarrollador competente y autodidacta, con experiencia corporativa y de perspectiva integral para unirse a mi equipo de desarrollo existente.",
        "en":"I am mid to large business in search of a skilled, self teaching developer with corporate experience and wide perspective to join my existing development team",
        "go":()=>{
            console.log("Generar batería de aclaración para saber si mostrarle portafolio, cv o formato de mensaje sencillo");
        }
    },
    {
        "es":"Soy una startup con un proyecto de app que deseo desarrollar, o que ya se encuentra en desarrollo y deseo una perspectiva adicional",
        "en":"I am a startup with an app proyect that I want developed, or that I am already developing and want to have an additional perspective",
        "go":()=>{
            console.log("Generar batería de aclaración para saber si mostrarle formato de mensaje sencillo, o formato de descripción de app");
        }
    },
    {
        "es":"Soy usuario de algúna de las web apps existentes de esta plataforma",
        "en":"I am a user from one of the existing web apps in this platform",
        "go":(params_if_any)=>{
            controller_simple_delete(ao.flow.init);
            let ready_apps_message = {
                "es":"Seleccióna tu app",
                "en":"Choose your app"
            }
            ao.main.append(ao.qq({"nodetype":"p","innerText":ready_apps_message[ao.lng]},ao.flow.init));
            let ready_options = [
                {
                    "en":"Storytelling Tools",
                    "es":"Herramientas Narrativas",
                    "go":()=>{
                        window.location.href = "https://demian.app/narrar";
                    }
                },
                { 
                    "es":"Herramientas Redes Sociales",
                    "en":"Social Media Manager",
                    "go":()=>{
                        window.location.href = "https://demian.app/somema";
                    }
                },
                { 
                    "es":"Volver a Inicio",
                    "en":"Return Home",
                    "go":()=>{
                        controller_simple_delete(ao.flow.init);
                        ao.main.append(do_opts(opts,ao.flow.init));
                    }
                }
            ];
            ao.main.append(do_opts(ready_options,ao.flow.init));
        }
    },
    {
        "es":"Ninguno de los anteriores",
        "en":"None of the above",
        "go":(params_if_any)=>{
            console.log("Generar segunda bateria consultando si hay otro asunto profesional que quiera tratar o bien, enviar a medios estáticos");
            console.log("Me gustaría generar una tercera batería que ofresca otros entretenimientos tipo geek o de visualización de datos");
        }
    }
]

function do_opts(opts,controller) {
    let option_container = ao.qq({"nodetype":"div","id":"option_container"},controller);
    for (let items of opts) {
        option_container.append(ao.qq({
            "nodetype":"div",
            "innerText":items[ao.lng],
            "styles":["botopts"],
            "triggers":[["click",items.go]]
        },controller));
    }
    return option_container;
}

function screen_1() {
    ao.main.append(ao.qq({"nodetype":"p","innerText":initial_message[ao.lng]},ao.flow.init));
    ao.main.append(do_opts(initial_options,ao.flow.init));
    ao.main.append(ao.qq({"nodetype":"p","innerText":final_message[ao.lng],"styles":["byemessage"]},ao.flow.init));
}

window.onresize = () => {
    ao.screen_adjust();
};

window.onload = () => {
    ao.interface(sidemenu);
    ao.interface(default_opts);
    ao.flow.init = {}
    ao.main = document.getElementById("from_home");
    screen_1();
};

/*
    Modificaciónes pendientes demian.app

    Presentación, ver si despues de cierta talla, pasamos a hacer bloques lado a lado en lugar de extender
    cada opción como un renglon por si mismo

    General opciones:
    Cuando la opción elegida ofrezca subopciones, hay que agregar un botoncito de "volver" muy a la mano
    para que no den "atras" en el navegador. 

    Opción 1, independientes y consultoria
        Agregar subopciones: 
        Ver soluciones: Muestrario de cosas hechas en el pasado
        Consulta interactiva: Cuestionario interactivo para saber más del caso del usuario.
        Contactame: Interface de mensajes de la página

    Opción 2, empresas y contratación
        Agregar Subopciones:
        Ver página profesional: (aqui debe haber algo flashy platicadito que hable de mi experiencia)
        Ver CV: (sin datos de contacto)
        Ver soluciones: Muestrario de cosas hechas en el pasado
        Contactame: Interface de mensajes de la página
*/