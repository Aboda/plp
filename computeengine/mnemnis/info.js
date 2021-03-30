let side_menu = [
    {
        "es":"Progreso de Desarrollo",
        "en":"Development Progress",
        "go":(params_if_any)=>{
            console.log("click "+this.en)
            console.log("params_if_any "+params_if_any)
        }
    },
    {
        "es":"Estadísticas de Operación",
        "en":"Operational Statistics",
        "go":(params_if_any)=>{
            console.log("click "+this.en)
            console.log("params_if_any "+params_if_any)
        }
    },
    {
        "es":"Mensajes de usarios",
        "en":"Users messages",
        "go":(params_if_any)=>{
            console.log("click "+this.en)
            console.log("params_if_any "+params_if_any)
        }
    },
    {
        "es":"Interface de Control",
        "en":"Control Interface",
        "go":(params_if_any)=>{
            console.log("click "+this.en)
            console.log("params_if_any "+params_if_any)
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
        "link_text":"Envíame un mensaje (en construcción)",
        "title":"Formato de contacto directo"
    }));
}

window.onload = ()=>{
    document.body.classList.add("background");
    left_hand_menu(side_menu);
    say_hi();
};