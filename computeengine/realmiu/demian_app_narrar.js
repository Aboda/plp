/*
    Esta pagina es una aplicación de captura organizada de datos relativos
    a la narración de historias, tiene como objetivo auxiliar en las activ
    idades como una enciclopedia relativa a la historia contada en el y es
    parte de un sistema de distribución de contenidos que lleva esta infor
    mación a un modelo consultable a modo de blog.

    El flujo a la carga es consultar si el usuario está registrado con la 
    plataforma a travez de facebook login, en caso de no estarlo se comie
    nza el flujo de autenticación fb y una vez terminado presenta los con
    tenidos.

    El contenido de la página permite crear los siguientes registros:
        A)personaje
        B)casa
        C)organización
        D)localización
        E)artefacto
        F)hechizo
        G)cosmovisión
        H)fragmento
        I)narrativas
    
        Adicionalmente permite:
        *Ver cualquiera de las listas y editarlas
        *Garantizar que exista solo un "Namespace"
        *Consultar cada una de estas entidades en un html
            estilizado particularmente al tipo de entidad
*/

let sidemenu = [
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
        "es":"Personaje",
        "en":"Character",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Casa",
        "en":"House",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Organización",
        "en":"Organization",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Localización",
        "en":"Location",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Artefacto",
        "en":"Artifact",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Hechizo",
        "en":"Spell",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Cosmovición",
        "en":"Worldview",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Fragmento",
        "en":"Fragment",
        "go":(params_if_any)=>{
            closeNav();
        }
    },
    {
        "es":"Narrativas",
        "en":"Storylines",
        "go":(params_if_any)=>{
            closeNav();
        }
    }
];

let initial_message = {
    "en":"Welcome to the storytelling web tools app, this is a database construction and curation tool for ongoing narrations",
    "es":"Bienvenido al sitio de herramientas web para la creación y curación de base de datos de narrativas en curso"
}

let follow_message = {
    "en":"Please pick the type of record you want from the left hand bar",
    "es":"Por favor seleccióna el tipo de registro que deseas del menú de la izquierda"
}

window.onresize = () => {
    ao.screen_adjust();
};

window.onload = () => {
    ao.interface(sidemenu);
    ao.logcontrol({"st":"check_login_status"});
    /*
    ao.main = document.getElementById("from_home");
    ao.main.append(ao.qq({"nodetype":"p","innerText":initial_message[ao.lng]}));
    ao.main.append(ao.qq({"nodetype":"p","innerText":follow_message[ao.lng]}));
    */
};