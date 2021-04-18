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
        "es":"Cosmovisión",
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
    "en":"Please ensure the proper accounts are logged in",
    "es":"Por favor asegurate que las cuentas apropiadas estén registradas"
}



function install_facebook() {
    window.fbAsyncInit = function () {
        FB.Event.subscribe("auth.statusChange", initial_page_setup);
        FB.init({
            "appId" : ao.fbid,
            "autoLogAppEvents":true,
            "xbfml":true,
            "status":true,
            "version":"v10.0"
        });
    };

    document.getElementsByTagName('head')[0].appendChild(ao.qq({
        "nodetype":"script",
        "async":true,
        "defer":true,
        "crossorigin":"anonymous",
        "src":"https://connect.facebook.net/en_US/sdk.js"
    }));
}
function start_interface() {
    ao.interface(sidemenu);
    ao.main.append(ao.qq({"nodetype":"p","innerText":initial_message[ao.lng]}));
    ao.main.append(ao.qq({"nodetype":"p","innerText":follow_message[ao.lng]}));
}

function build_facebook_login_button(){
    let button = ao.qq({
        "nodetype":"div",
        "styles":["fb-login-button"]
    })
    button.setAttribute("data-width","160");
    button.setAttribute("data-size","medium");
    button.setAttribute("data-button-type","continue_with");
    button.setAttribute("data-layout","rounded");
    button.setAttribute("data-auto-logout-link","true");
    button.setAttribute("data-use-continue-as","true");
    button.setAttribute("data-onlogin",start_interface);
    return button;
}

function build_default_login_window(message){
    let conten = ao.qq({"nodetype":"div"});
    let mensaje = ao.qq({"nodetype":"p","innerText":message[ao.lng]});
    let log_w_fb = build_facebook_login_button();
    conten.append(mensaje);
    conten.append(log_w_fb);
    return conten;
}


function initial_page_setup(response) {
    ao.main = document.getElementById("from_home");
    console.log("initial_page_setup",{response});
    if (response.status === "connected") {
        ao.fbui = response.authResponse.userID;
        ao.fbat = response.authResponse.accessToken;
        start_interface();
    } else {
        ao.main.append(build_default_login_window({
            "en":"Only fb login at the time",
            "es":"Solo fb login por el momento"
        }));
        FB.XFBML.parse();
    };
    FB.Event.unsubscribe("auth.statusChange", initial_page_setup);
}

window.onresize = () => {
    ao.screen_adjust();
};

window.onload = () => {
    install_facebook();
};
