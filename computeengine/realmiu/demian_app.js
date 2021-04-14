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
        "es":"Progreso de Desarrollo",
        "en":"Development Progress",
        "go":()=>{
            had_it_comming();
            sidemenu_toggle();
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
                let new_entity = ost(ao,"focus",{
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

window.onresize = () => {
    ao.screen_adjust();
};
window.onload = () => {
    ao.interface(interface);
};

