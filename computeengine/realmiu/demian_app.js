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
    "en":"The operation cost of this server and its pages is 25$ USD per year, this for the 2 domains it holds. It is hosted in free infrastructure offered by Google Cloud and employs open source software where I did not personally write the code for it.",
    "es":"El costo de operación de este servidor y sus páginas es 520$ MXN anuales por los dominios que hospeda. Está albergado en infraestructura gratuita ofrecida por Google Cloud y emplea software open source donde no programé personalmente el código."
}
let common_option_internal_return_home = { 
    "es":"Volver a Inicio",
    "en":"Return Home",
    "go":()=>{
        controller_simple_delete(ao.flow.init);
        ao.flow.init = {};
        screen_1();
    }
}
let initial_options = [
    {
        "es":"Soy un profesionista independiente, empleado o empresa pequeña en búsqueda de consultoría para automatizar un proceso existente o bien atacar un problema técnico que no he solventado.",
        "en":"I am an independent professional, employee or small business searching for consulting services to automate an existing process or to tackle an unresolved technical issue.",
        "go":()=>{
            controller_simple_delete(ao.flow.init);
            ao.flow.init = {};
            let ready_apps_message = {
                "es":"Excelente, eso es para lo que estoy aquí, dime ¿que preferirías ver ahora?",
                "en":"Great, thats what I am here for, let me know what you would rather see now"
            }
            ao.main.append(ao.qq({"nodetype":"p","innerText":ready_apps_message[ao.lng]},ao.flow.init));
            let ready_options = [
                {
                    "en":"My portfolio, with references to existing and past work to see if anything looks like your current problem, 'anything you like, you can have'",
                    "es":"Mi portafolio, con referencias a trabajo presente o pasado para apreciar si se parece a tu problema actual, 'si algo te gusta, puedes tenerlo' ",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/";
                    }
                },
                { 
                    "en":"The message box so you can tell me what´s up and we can begin communicating directly",
                    "es":"La ventanilla de mensajes para que me puedas decir lo que necesitas y nos comuniquemos directamente",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/msg";
                    }
                },
                { 
                    "en":"The appointment setter, in case you want to go straight to scheduling a dedicated time with video conference to asses the subject matter",
                    "es":"El generador de citas en caso de que desees ir directo a agendar tiempo dedicado con videoconferencia para evaluar el asunto de interés",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/consult";
                    }
                },
                common_option_internal_return_home
            ];
            ao.main.append(do_opts(ready_options,ao.flow.init));
        }
    },
    {
        "es":"Soy una empresa mediana o grande en búsqueda de un desarrollador competente y autodidacta, con experiencia corporativa y de perspectiva integral para unirse a mi equipo de desarrollo existente.",
        "en":"I am mid to large business in search of a skilled, self teaching developer with corporate experience and wide perspective to join my existing development team",
        "go":()=>{
            controller_simple_delete(ao.flow.init);
            ao.flow.init = {};
            let ready_apps_message = {
                "es":"Gracias por su interés, por favor indiqueme que desea ver ahora:",
                "en":"Thank you for your interest, please let me know what would you rather see now:"
            }
            ao.main.append(ao.qq({"nodetype":"p","innerText":ready_apps_message[ao.lng]},ao.flow.init));
            let ready_options = [
                {
                    "en":"My curriculum vitae",
                    "es":"Mi curriculum vitae",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/cv";
                    }
                },
                { 
                    "es":"Portafolio de Trabajos Previos",
                    "en":"Previous Work Portfolio",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/";
                    }
                },
                { 
                    "es":"Formato de mensaje directo",
                    "en":"Direct message form",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/msg";
                    }
                },
                common_option_internal_return_home
            ];
            ao.main.append(do_opts(ready_options,ao.flow.init));
        }
    },
    {
        "es":"Soy una startup con un proyecto de app que deseo desarrollar, o que ya se encuentra en desarrollo y deseo una perspectiva adicional",
        "en":"I am a startup with an app proyect that I want developed, or that I am already developing and want to have an additional perspective",
        "go":()=>{
            controller_simple_delete(ao.flow.init);
            ao.flow.init = {};
            let ready_apps_message = {
                "es":"Podemos proceder de diferentes formas, digame cual le parece mejor:",
                "en":"We can proceed in one of the following ways:"
            }
            ao.main.append(ao.qq({"nodetype":"p","innerText":ready_apps_message[ao.lng]},ao.flow.init));
            let ready_options = [
                {
                    "en":"You can fill in an app consultation form, here I will ask about your app to better understand your circumstances and objectives.",
                    "es":"Puedes llenar un formato de consulta de app, en el te preguntare al respecto de tu app para entender mejor tus circunstancias y objetivos",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/consuapp";
                    }
                },
                { 
                    "es":"Tambien puedes enviarme un mensaje sencillo en caso de que la consulta no requiera presiciónes",
                    "en":"You can also send me a simple message in case that the inquiry does not require minutiae facts",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/msg";
                    }
                },
                { 
                    "es":"Si quieres saber de mi experiencia, puedes consultar mi portafolio",
                    "en":"If you want to know about my experience, you can also see my portfolio",
                    "go":()=>{
                        window.location.href = "https://profesional.demian.app/";
                    }
                },
                common_option_internal_return_home
            ];
            ao.main.append(do_opts(ready_options,ao.flow.init));
        }
    },
    {
        "es":"Soy usuario de algúna de las web apps existentes de esta plataforma",
        "en":"I am a user from one of the existing web apps in this platform",
        "go":()=>{
            controller_simple_delete(ao.flow.init);
            ao.flow.init = {};
            let ready_apps_message = {
                "es":"Seleccióna tu app",
                "en":"Choose your app"
            }
            ao.main.append(ao.qq({"nodetype":"p","innerText":ready_apps_message[ao.lng]},ao.flow.init));
            let ready_options = [
                {
                    "es":"Herramientas Narrativas",
                    "en":"Storytelling Tools",
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
                common_option_internal_return_home
            ];
            ao.main.append(do_opts(ready_options,ao.flow.init));
        }
    },
    {
        "es":"Ninguno de los anteriores",
        "en":"None of the above",
        "go":()=>{
            controller_simple_delete(ao.flow.init);
            ao.flow.init = {};
            let ready_apps_message = {
                "en":"Choose your app",
                "es":"Seleccióna tu app"                
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
                    "en":"Social Media Manager",
                    "es":"Herramientas Redes Sociales",
                    "go":()=>{
                        window.location.href = "https://demian.app/somema";
                    }
                },
                common_option_internal_return_home
            ];
            ao.main.append(do_opts(ready_options,ao.flow.init));
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
    ao.main = document.getElementById("from_home");
    ao.flow.init = {};
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