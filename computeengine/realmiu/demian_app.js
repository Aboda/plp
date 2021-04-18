/*
    Esta página consulta la naturaleza del nuevo arribo para canalizarlo al
    contenido pensado para el. 

    Es distribuidor de la plataforma de demian.app como principal tarea, pero
    tambien se pueden apreciar cosas de remansonocturno.com
*/

let sidemenu = [
    {
        "es":"Idioma: Español, Change to English",
        "en":"Languaje: English, Cambiar a Español",
        "go":()=>{
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
        "es":"Información de Plataforma",
        "en":"Platform Information",
        "go":()=>{
            window.location.href = "https://demian.app/info";
        }
    }
];

let initial_message = {
    "en":"Welcome to my personal development and learning environment, please let me know what brought you here to better route you to the right portal:",
    "es":"Bienvenid@ a mi espacio de desarrollo y aprendizaje personal, por favor indica qué es lo que te trajo aqui para poder canalizarte al portal adecuado:"
}

let final_message = {
    "en":"This site is built on a virtual machine in google cloud using ubuntu, node and certbot. All code written by me, no additional libraries where employed. I am profoundly grateful towards the google and open source communityes for all the resources made available free of charge, It was that what brought me here.",
    "es":"Este sitio está construido en una máquina virtual en la nube de google, utiliza ubuntu node y certbot. Todo el código fue escrito por mi, no fuerno empleadas librerías adicionales. Agradezco desde el fondo de mi corazón a la comunidad google y open source por todos los recursos que hacen disponibles sin cargo alguno, fueron ellos los que me trajeron aquí."
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
            ao.main.append(ao.qq({"nodetype":"p","innerText":ready_apps_message[ao.lng]}));
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
                }
            ];
            ao.main.append(do_opts(ready_options));
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

window.onresize = () => {
    ao.screen_adjust();
};

window.onload = () => {
    ao.interface(sidemenu);
    ao.flow.init = {}
    ao.main = document.getElementById("from_home");
    ao.main.append(ao.qq({"nodetype":"p","innerText":initial_message[ao.lng]},ao.flow.init));
    ao.main.append(do_opts(initial_options,ao.flow.init));
    ao.main.append(ao.qq({"nodetype":"p","innerText":final_message[ao.lng],"styles":["byemessage"]},ao.flow.init));
};

