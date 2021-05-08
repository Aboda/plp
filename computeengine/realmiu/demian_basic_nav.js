/*
    Esta variable representan las opciones universales del menú izquierdo
*/
let default_opts = [
    {
        "es":"Inicio",
        "en":"Home",
        "go":()=>{
            window.location.href = "https://demian.app/";
        }
    },
    {
        "es":"Acerca de mi",
        "en":"About me",
        "go":()=>{
            window.location.href = "https://demian.app/aboutme";
        }
    },
    {
        "es":"Preguntas Frecuentes",
        "en":"FAQ",
        "go":()=>{
            window.location.href = "https://demian.app/faq";
        }
    },
    {
        "es":"Blog",
        "en":"Blog",
        "go":()=>{
            window.location.href = "https://www.demian.app/";
        }
    },
    {
        "es":"Indice",
        "en":"Index",
        "go":()=>{
            window.location.href = "https://demian.app/index.html";
        }
    },
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
    }
]
