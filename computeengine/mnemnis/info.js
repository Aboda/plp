let side_menu = [
    {
        "es":"Progreso de Desarrollo",
        "en":"Development Progress",
        "go":()=>{
            had_it_comming();
            sidemenu_toggle();
            fetch_file("progress",(response)=>{
                var data = JSON.parse(response);
                console.log(data)
                var new_entity = ost(ao,"focus",{
                    "kill":()=>{
                        for (var item_name in ao.focus) {
                            ao.focus[item_name].kill();
                        }
                    }
                });
                if (new_entity != true) {
                    ao.focus.kill();
                    ao.focus = {
                        "kill":()=>{
                            for (var item_name in ao.focus) {
                                ao.focus[item_name].kill();
                            }
                        }
                    }
                };                
                var container = make_node({
                    "id":"the_guy_who_always_dies",
                    "nodetype":"div"
                },ao.focus)
                document.body.append(container);
                for (var entry in data){
                    var card = make_node({
                        "nodetype":"div",
                        "styles":["progress_card"]
                    },ao.focus);
                    container.append(card);
                    
                    var title = make_node({
                        "nodetype":"p",
                        "innerText": "<b>"+entry+"</b>"
                    },ao.focus);
                    card.append(title);

                    var progress = make_node({
                        "nodetype":"p",
                        "innerText": data[entry].meta.priority
                    },ao.focus);
                    card.append(progress);

                    for (var route in data[entry].astra){
                        var sub_card = make_node({
                            "nodetype":"div",
                            "styles":["sub_progress_card"]
                        },ao.focus);
                        card.append(sub_card);
                        var sub_route = make_node({
                            "nodetype":"p",
                            "innerText": route
                        },ao.focus);
                        sub_card.append(sub_route);

                        var sub_progress = make_node({
                            "nodetype":"p",
                            "innerText": data[entry].astra[route].meta.priority
                        },ao.focus);
                        sub_card.append(sub_progress);
                        
                    };
                };
            });
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
    if (ao.simple["the_guy_who_always_dies"] != undefined) {
        ao.simple["the_guy_who_always_dies"].kill()
    }    
    if (ao.simple["the_guy_who_always_dies_2"] != undefined) {
        ao.simple["the_guy_who_always_dies_2"].kill()
    }
}
window.onload = ()=>{
    document.body.classList.add("background");
    left_hand_menu(side_menu);
    say_hi();
};