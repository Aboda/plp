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
    "en":"Both accounts need to be authorized to continue",
    "es":"Ambas cuentas necesitan ser autenticadas para continuar"
}

window.onload = () => {control_login_status();};

/*
    Esta sección controla los usuarios. 
*/
function control_login_status(){
    /*
        Este dispositivo se encarga de
            0.- Controlar la instalación de autenticación, +- preparativos pertinentes
            1.- Al arrancar la página checar si tiene login con fb y google. 
            2.- En lo que espera las respuestas, construir la base de interface
            que indica las cuentas loggeadas.
                a) crear marcos y placeholders
            3.- Cada consulta, FB y Google, actualizan su sección respectiva
            4.- Cuando ambas cuentas están loggeadas, habilita el continuar
            5.- Inicia la interface específica
    */
    ao.main = document.getElementById("from_home");
    ao.main.append(initial_message[ao.lng]);
    ao.logcon = {};
    /*                
        Paso 1, generar elementos html con tagging pertinente para que al
        arranque de los scripts sean rendereados
    */
    let log_main_display = ao.qq({"nodetype":"div","id":"log_main_display","styles":["dialog_container"]});
    let google_section = ao.qq({"nodetype":"div","id":"google_section","styles":["third_container","color_contrast_3"]});
    google_section.append(build_google_login_button(),build_google_logout_button());
    
    let facebook_section = ao.qq({"nodetype":"div","id":"facebook_section","styles":["third_container","color_contrast_4"]});
    facebook_section.append(build_facebook_login_button());
    
    log_main_display.append(google_section,facebook_section);
    ao.main.append(log_main_display);
    /*                
        Paso 2, en el caso de facebook definir las acciónes a tomar cuando
        concluya la carga de su script
    */
    window.fbAsyncInit = function () {
        FB.Event.subscribe("auth.statusChange", show_facebook_user_info);
        FB.init({
            "appId" : ao.fbid,
            "autoLogAppEvents":true,
            "xbfml":true,
            "status":true,
            "version":"v10.0"
        });
        FB.XFBML.parse();
    };
    /*                
        Paso 3, agregar los tags de script a la página
    */
    install_facebook();
    install_OA2 ();
}



/*
    Sección Facebook
*/

function install_facebook() {
    document.getElementsByTagName('head')[0].appendChild(ao.qq({
        "nodetype":"script",
        "async":true,
        "defer":true,
        "crossorigin":"anonymous",
        "src":"https://connect.facebook.net/en_US/sdk.js"
    }));
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
    button.setAttribute("data-onlogin",result_of_button_login);
    return button;
}

function result_of_button_login(huh){
    console.log("result_of_button_login",huh);
}

function show_facebook_user_info(reply){
    console.log("respuesta a login",reply);
    let facebook_section = ao.simple.facebook_section;
    facebook_section.config.status = reply.status;
    ao.fblg = reply;
    if (reply.status == "connected"){
        FB.Event.unsubscribe("auth.statusChange", show_facebook_user_info);
        FB.api('/me', function(response) {
            console.log("respuesta a /me",response);
            let user_fb_card = ao.qq({"nodetype":"div","id":"fb_user_logged","styles":["color_contrast_3"]});
            user_fb_card.append(
                ao.qq({"nodetype":"h1","id":"fb_user_logged","styles":["color_contrast_3"],"innerText":"Usuario: "+response.name})
            );
            facebook_section.node.append(user_fb_card);
        });
    }else{
        alert("fallo la conexión a facebook");
    }    
}



/*
    Sección Google
*/



function send_to_collection () {
    let test_data = {
        "timestamp":Date.now().toString(),
        "message":"hola"
    }
    let collectos = "https://script.google.com/macros/s/AKfycbzIePzuXLQWFslJv03RzQDQWGC9zMNRQt2_63cw7BaEUSQqQPZwFvSDszK5yI7WZFaa/exec";
    ao.fe("POST",collectos,console.log,JSON.stringify(test_data));
}

function install_OA2 () {
    document.getElementsByTagName('head')[0].appendChild(ao.qq({
        "nodetype":"script",
        "async":true,
        "defer":true,
        "src":"https://apis.google.com/js/platform.js"
    }));
}

function build_google_login_button(){
    let button = ao.qq({
        "nodetype":"div",
        "styles":["g-signin2"]
    })
    button.setAttribute("data-onsuccess","OA2_success");
    return button;
}

function build_google_logout_button () {
    let lofb = {
        "en":"Sign Out",
        "es":"Desconectarse"
    }
    let button = ao.qq({
        "nodetype":"button",
        "value":lofb[ao.lng],
        "triggers":[["click",signGoogleOut]]
    })
    return button;
}

function signGoogleOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function OA2_success(huh) {
    console.log("OAuth2 Success",huh);
    let google_section = ao.simple.google_section;
    ao.goa2 = huh;
    google_section.node.append(
        ao.qq({"nodetype":"h1","id":"goa2_user_logged","styles":["color_contrast_3"],"innerText":"Usuario: "+huh.Rs.Te})
    );
}