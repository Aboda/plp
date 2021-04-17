/*
    This section is the system information page
*/
let sidemenu = [
    {
        "es":"Progreso de Desarrollo",
        "en":"Development Progress",
        "go":()=>{
            closeNav();
            ao.fe("https://demian.app/info/progress",(response)=>{
                let data;
                try{
                    data = JSON.parse(response);
                    console.log(data);
                }catch (err){
                    console.log("error parseando respuesta");
                    console.log(err);
                    console.log("respuesta");
                    console.log(response);
                }                
                let new_entity = ao.ost(ao,"focus",{
                    "kill": function() {
                        for (let item_name in ao.focus) {
                            if (item_name != "kill") {
                                ao.focus[item_name].kill();
                            };
                        };
                    }
                });
                if (new_entity != true) {
                    ao.focus.kill();
                };
                complicated_ass_card_1(data);
            });
        }
    },
    {
        "es":"Estadísticas de Operación",
        "en":"Operational Statistics",
        "go":(params_if_any)=>{
            closeNav();
            console.log(params_if_any.target);
        }
    },
    {
        "es":"Mensajes de usarios",
        "en":"Users messages",
        "go":(params_if_any)=>{
            closeNav();
            console.log(params_if_any.target);
        }
    },
    {
        "es":"Interface de Control",
        "en":"Control Interface",
        "go":(params_if_any)=>{
            closeNav();
            console.log(params_if_any.target);
        }
    }
];

let hi_message = {
    "en":"Status de progreso para los diferentes frentes del proyecto plp",
    "es":"Progress status for different fronts to the plp proyect",
}

let site_progress = {
    "demian.app":{
        "racional":{
            "es":"Portal principal de aplicaciónes independientes, dummys, modelos y otras herramientas experimentales",
            "en":"Main gateway for independant applications, dummys, models and other experimental tools"
        },
        "componentes":[
            "sidemenu",
            "login",
            "display"
        ]
    },
    "www.demian.app":{
        "racional":{
            "es":"Blog profesional y de tecnología",
            "en":"Professional and Tech Blog"
        },
        "componentes":[
            "sidemenu",
            "display"
        ]
    },
    "profesional.demian.app":{
        "racional":{
            "es":"Portafolio y venta de consultoría remota",
            "en":"Portfolio and remote consultation point of sale"
        },
        "componentes":[
            "sidemenu",
            "login",
            "display",
            "scheduler",
            "purchase"
        ]
    },
    "remansonocturno.com":{
        "racional":{
            "es":"Red social de amantes y creadores de fantasía y ciencia ficción",
            "en":"Social network of lovers and creators of science fictiona and fantasy"
        },
        "componentes":[
            "sidemenu",
            "login",
            "display",
            "profile",
            "community",
            "purchase",
            "award"
        ]
    },
    "www.remansonocturno.com":{
        "racional":{
            "es":"Blog de ficción y ciencia ficción",
            "en":"Science fiction and fiction blog"
        },
        "componentes":[
            "sidemenu",
            "display"
        ]
    }
}
let modules_progress = {
    "sidemenu":{
        "racional":{
            "es":"Iterface interactiva generalizada de navegación de plataforma",
            "en":"General interactive interface for platform control"
        },
        "estado":{
           "es":"En operación",
           "en":"Operational"
        },
        "ver":1,
        "residencia":"framework.js"
    },
    "login":{
        "racional":{
            "es":"Control de proceso de identificación humana",
            "en":"Human identification control process"
        },
        "estado":{
           "es":"Contemplada",
           "en":"Contemplated"
        },
        "ver":0,
        "residencia":"none"
    },
    "display":{
        "racional":{
            "es":"Herramienta de despliegue de contenidos estandarizada",
            "en":"Standarized content display tool"
        },
        "estado":{
           "es":"Contemplada",
           "en":"Contemplated"
        },
        "ver":0,
        "residencia":"none"
    },
    "scheduler":{
        "racional":{
            "es":"Interface de compra de tiempos finitos calendarizados",
            "en":"Finite calendarized schedule purchase interface"
        },
        "estado":{
           "es":"Contemplada",
           "en":"Contemplated"
        },
        "ver":0,
        "residencia":"none"
    },
    "purchase":{
        "racional":{
            "es":"Manejador de pagos",
            "en":"Payment manager"
        },
        "estado":{
           "es":"Contemplada",
           "en":"Contemplated"
        },
        "ver":0,
        "residencia":"none"
    },
    "profile":{
        "racional":{
            "es":"Interface del perfil del usuario",
            "en":"User profile interface"
        },
        "estado":{
           "es":"Contemplada",
           "en":"Contemplated"
        },
        "ver":0,
        "residencia":"none"
    },
    "community":{
        "racional":{
            "es":"Espacio de apreciación de la comunidad",
            "en":"Community apreciation space"
        },
        "estado":{
           "es":"Contemplado",
           "en":"Contemplated"
        },
        "ver":0,
        "residencia":"none"
    },
    "award":{
        "racional":{
            "es":"Sistema de recompensas de miembros de la red social",
            "en":"Social network member awards system"
        },
        "estado":{
           "es":"Contemplado",
           "en":"Contemplated"
        },
        "ver":0,
        "residencia":"none"
    }
}

function start_interface() {
    ao.interface(sidemenu);
    ao.main = document.getElementById("from_home");
    ao.main.append(ao.qq({"nodetype":"p","innerText":hi_message[ao.lng]}));
}

function complicated_ass_card_1(data){
    let chosen_lng = document.documentElement.lang.slice(0,2);
    let container = ao.qq({
        "id":"the_guy_who_always_dies",
        "nodetype":"div",
        "styles":["report_container","display_flex"]
    },ao.focus);
    let where = document.getElementById("from_home");
    where.append(container);

    let parents = [];

    for (let entry in data) {
        let root_card;
        if (data[entry].meta.root_domain) {
            root_card = ao.qq({
                "id":entry,
                "nodetype":"div",
                "styles":["loved_flex","pad_1","border","ancho"]
            },ao.focus);
            parents.push(entry);
        } else {
            root_card = ao.qq({
                "id":entry,
                "nodetype":"div",
                "styles":["loved_flex","pad_1","border","ancho"]
            },ao.focus);
        };
        container.append(root_card);
        
        let root_info_container = ao.qq({
            "nodetype":"div",
            "styles":["loved_flex","pad_1"]
        },ao.focus);
        root_card.append(root_info_container);

        let short = ao.qq({
            "nodetype":"div",
            "innerText": data[entry].meta.short[chosen_lng]
        },ao.focus);
        root_info_container.append(short);

        if (data[entry].meta.root_domain) {
            let domain = ao.qq({
                "nodetype":"div",
                "innerText": "Domain: "+entry
            },ao.focus);
            root_info_container.append(domain);
        }else{
            let domain = ao.qq({
                "nodetype":"div",
                "innerText": "Subdomain: "+entry
            },ao.focus);
            root_info_container.append(domain);
        }        

        if (data[entry].meta.etapa != undefined) {
            let stage = ao.qq({
                "nodetype":"div",
                "innerText": data[entry].meta.etapa[chosen_lng]
            },ao.focus);
            root_info_container.append(stage);
        }

        if (data[entry].astra != undefined) {
            let sub_container = ao.qq({
                "nodetype":"div",
                "styles":["loved_flex","pad_1","secondary"]
            },ao.focus);
            root_card.append(sub_container);

            for (let route in data[entry].astra){
                let ezr = data[entry].astra[route];
                let sub_card = ao.qq({
                    "nodetype":"div",
                    "styles":["loved_flex","pad_1"]
                },ao.focus);
                sub_container.append(sub_card);
                let sub_route = ao.qq({
                    "nodetype":"div",
                    "innerText": ezr.meta.short[chosen_lng]
                },ao.focus);
                sub_card.append(sub_route);

                let sub_progress = ao.qq({
                    "nodetype":"div",
                    "innerText": "Route: "+route
                },ao.focus);
                sub_card.append(sub_progress);

                if (ezr.meta.etapa != undefined) {
                    let stage = ao.qq({
                        "nodetype":"div",
                        "innerText": ezr.meta.etapa[chosen_lng]
                    },ao.focus);
                    sub_card.append(stage);
                }
            };
        };
    };
};

window.onresize = () => {
    ao.screen_adjust();
};

window.onload = () => {
    start_interface();
};

