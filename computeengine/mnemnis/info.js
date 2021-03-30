let side_menu = [
    {
        "es":"Progreso de Desarrollo",
        "en":"Development Progress",
        "go":(params_if_any)=>{
            sidemenu_toggle();
            had_it_comming();
            console.log(params_if_any.target);
        }
    },
    {
        "es":"Estadísticas de Operación",
        "en":"Operational Statistics",
        "go":(params_if_any)=>{
            sidemenu_toggle();
            had_it_comming();
            console.log(params_if_any.target);
        }
    },
    {
        "es":"Mensajes de usarios",
        "en":"Users messages",
        "go":(params_if_any)=>{
            sidemenu_toggle();
            had_it_comming();
            console.log(params_if_any.target);
        }
    },
    {
        "es":"Interface de Control",
        "en":"Control Interface",
        "go":(params_if_any)=>{
            sidemenu_toggle();
            had_it_comming();
            console.log(params_if_any.target);
        }
    }
];

let hi_message = "Esta sección está diseñada para brindar una perspectiva compartible de progreso colectivo ";
hi_message = hi_message + "respecto a los proyectos siendo trabajados o auxiliados.\nSi no sabes que es esto, quizas ";
hi_message = hi_message + "no deberías de estar aquí, pero si tienes curiosidad siempre puedes enviarme un mensaje:";

function say_hi () {
    document.body.append(make_node({
        "id":"the_guy_who_always_dies",
        "nodetype":"p",
        "innerText":hi_message
    }));
    document.body.append(make_node({
        "id":"the_guy_who_always_dies_2",
        "nodetype":"a",
        "target":"https://demian.app/comentarios/",
        "link_text":"Formato de contacto directo",
        "styles":["color_contrast_1"]
    }));
}
function had_it_comming() {
    ao.simple["the_guy_who_always_dies"].kill()
    ao.simple["the_guy_who_always_dies_2"].kill()
}
window.onload = ()=>{
    document.body.classList.add("background");
    left_hand_menu(side_menu);
    say_hi();
};