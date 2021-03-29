
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
]



window.onload = ()=>{
    left_hand_menu(side_menu);
    document.body.classList.add("background");
};