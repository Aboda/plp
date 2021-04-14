/*
    Esta página debe de presentar al usuario la opción de decir si es
    a) un posible empleador
    b) un usuario de una solución
    c) otra persona

    en el primer caso, se le reenviará a profesional.demian.app
    en el segundo caso, se le mostrará la lista de soluciones disponibles
    en el tercer caso se le enviará a www.demian.app
*/

let interface = [
    {
        "es":"Idioma: Español, cambiar a inglés",
        "en":"Languaje: English, change to spanish",
        "go":(e)=>{
            let check = window.location.href.indexOf("lng=");
            let processed;
            if (check != -1) {
                processed = window.location.href.slice(check,check+6);
            }else{
                processed = window.location.href;
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

window.onresize = () => {
    ao.screen_adjust();
};
window.onload = () => {
    ao.interface(interface);
};

