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
    "en":"This tool allows you to curate content using your own google drive as storage device, it also allows you to programatically use this content for automated publishing on your communication networks and to analyse publishing impact Google and Facebook client javascript sdk are employed for this.",
    "es":"Esta herramienta permite curar contenido utilizando tu propio google drive como dispositivo de almacenamiento, tambien te permite el programar el uso de estas piezas de contenido para publicación automática en tus canales de comunicación y consultar posteriormente su desempeño. Para esto las librerías SDK javascript de Google y Facebook son empleadas"
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
    
    //Agrega el elemento preexistente del servidor a un objeto
    ao.main = document.getElementById("from_home");
    //Introduce el mensaje de "bienvenida" de la página
    ao.main.append(ao.qq({"nodetype":"p","id":"tool_brief","innerText":initial_message[ao.lng]}));
    //Prepara el objeto controlador de estados
    ao.sessions = {
        "fb":{},
        "go":{}
    };
    //Inserta el nodo "fb root" necesario para la operación con facebook
    document.body.append(ao.qq({"nodetype":"div","id":"fb-root"}));
    /*                
        Construir los contenedores de validación donde se reflejará
        la interacción de autenticación de las cuentas a utilizar

        Contenedor de autenticación dual

            Contenedor de Proveedor x2
                Nombre del proveedor
                Status con proveedor
                Espacio de retroalimentación
                Espacio de botones
                    Firmarse o desfirmarse del proveedor
        
        Confirmación de autenticación dual

        Una vez construido el layout, se solicitara saber el status
        de login de cada proveedor
    */
    let login_main_display = ao.qq({"nodetype":"div","id":"dual_auth_container","styles":["dialog_container"]});

    let google_section = ao.qq({"nodetype":"div","id":"google_section","innerText":"Status Google","styles":["third_container"]});
        
    let facebook_section = ao.qq({"nodetype":"div","id":"facebook_section","innerText":"Status Facebook","styles":["third_container"]});
    facebook_section.append(build_facebook_login_button());

    login_main_display.append(google_section,facebook_section);
 
    ao.main.append(login_main_display);
    
    let holdon_message = {"es":"Evaluando Estado...","en":"Evaluating Status... "}  
    let login_proceed = ao.qq({"nodetype":"div","id":"proceed_button","innerText":holdon_message[ao.lng],"styles":["full_bottom_button","grayed_out"]});
        
    ao.main.append(login_proceed);
    /*                
        Paso 2, en el caso de facebook definir las acciónes a tomar cuando
        concluya la carga de su script
    */
    /*
        window.fbAsyncInit = function () {
            FB.Event.subscribe("auth.statusChange", react_to_facebook_status);
            FB.init({
                "appId" :ao.fbid,
                "xbfml":true,
                "version":"v10.0"
            });
            FB.XFBML.parse();
    };
    */
    /*                
        Paso 3, agregar los tags de script a la página
    */
    //install_facebook();
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
        "src":"https://connect.facebook.net/en_US/sdk/debug.js"
    }));
    //prod "https://connect.facebook.net/en_US/sdk.js"
    //dev "https://connect.facebook.net/en_US/sdk/debug.js"
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
    button.setAttribute("data-auto-logout-link","false");
    button.setAttribute("data-use-continue-as","true");
    button.setAttribute("data-onlogin",result_of_button_login);
    return button;
}
function result_of_button_login(huh){
    console.log("result_of_button_login",huh);

}
function show_facebook_user_info(reply){
    console.log("respuesta a login",reply);
    ao.fblg = reply;
    let facebook_section = ao.simple.facebook_section;
    facebook_section.config.status = reply.status;
    facebook_section.node.append(ao.qq({"nodetype":"div","id":"fb_profile_feedback"}))
    let profile_feedback = ao.simple.fb_profile_feedback;
    console.log("before checking reply status");
    if (reply.status == "connected"){
        FB.Event.unsubscribe("auth.statusChange", show_facebook_user_info);
        console.log("immediate FB call, my pic");
        FB.api(
            "/"+ao.fblg.authResponse.userID+"/picture",
            "GET",
            {"redirect":"false","type":"square"},
            function(fbimgres) {
                console.log({fbimgres});
                profile_feedback.node.insertBefore(
                    ao.qq({"nodetype":"img","src":fbimgres.data.url}),
                    profile_feedback.node.childNodes[0]
                );                
            }
          );
          console.log("timed call, name and email");
          setTimeout(
            FB.api(
                "/me", 
                "GET",
                {"fields":"name"},
                function(response) {
                    console.log("respuesta a /me",response);
                    profile_feedback.node.append(
                        ao.qq({"nodetype":"p","styles":["color_contrast_3"],"innerText":response.name}),
                        ao.qq({"nodetype":"p","styles":["color_contrast_3"],"innerText":response.email})
                    );
                }
            ),
            100
          );
          console.log("end");
    }else{
        alert("fallo la conexión a facebook");
    }    
}
function react_to_facebook_status (fbstatusresponse) {
    ao.sessions.fb = fbstatusresponse;
    console.log("react_to_facebook_status",{fbstatusresponse});
}
/*
    Sección Google
*/
function install_OA2 () {
    //Selector curiosillo vía tag de css, solo hay un head en el documento afortunadamente. 
    document.getElementsByTagName('head')[0].appendChild(ao.qq({
        "nodetype":"script",
        "src":"https://apis.google.com/js/client.js",
        "onload":()=>{
            //Inicia el cliente aqui.
            gapi.client.init({
                "apiKey": ao.oaid,
                "scope": "https://www.googleapis.com/auth/drive,",
                "discoveryDocs": ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
            }).then(function () {
                GoogleAuth = gapi.auth2.getAuthInstance();
          
                // Listen for sign-in state changes.
                GoogleAuth.isSignedIn.listen(updateSigninStatus);
            });
        }
    }));
}
function build_google_login_button(){
    return gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': OA2_success,
        'onfailure': onFailure
      });
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
        console.log("User signed out.");
    });
}
function OA2_success(profile) {
    console.log("OAuth2 Success",{profile});
    let google_section = ao.simple.google_section;
    ao.sessions.go = profile;
    google_section.node.append(
        ao.qq({"nodetype":"img","src":profile.getImageUrl()}),
        ao.qq({"nodetype":"p","innerText":profile.getName()}),
        ao.qq({"nodetype":"p","innerText":profile.getEmail()})
    );
}