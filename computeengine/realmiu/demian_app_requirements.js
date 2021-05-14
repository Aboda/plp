/*
    Página estática con dos idiomas posibles
*/

let initial_structure = [
    {
        "nodetype":"h1",
        "innerText":{
            "en":"Platform Requirement",
            "es":"Requerimiento de Plataforma"
        }
    },
    {
        "nodetype":"div",
        "styles":["tree_container"],
        "content":[
            {
                "nodetype":"h2",
                "styles":["branch_root"],
                "innerText":{
                    "en":"Functionality",
                    "es":"Funcionalidad"
                },
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Capability",
                    "es":"Capacidad"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Reusability",
                    "es":"Reusabilidad"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Security",
                    "es":"Seguridad"
                },          
            },
        ]
    },
    {
        
        "nodetype":"div",
        "styles":["tree_container"],
        "content":[
            {
                "nodetype":"h2",
                "styles":["branch_root"],
                "innerText":{
                    "en":"Usability",
                    "es":"Usabilidad"
                },
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Human Factors",
                    "es":"Factores Humanos"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Aesthetics",
                    "es":"Apariencia"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Consistency",
                    "es":"Consistencia"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Documentation",
                    "es":"Documentación"
                },          
            }
        ]
    },
    {
        
        "nodetype":"div",
        "styles":["tree_container"],
        "content":[
            {
                "nodetype":"h2",
                "styles":["branch_root"],
                "innerText":{
                    "en":"Reliability",
                    "es":"Estabilidad"
                },
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Availability",
                    "es":"Disponibilidad"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Failure Rate",
                    "es":"Indice de Errores"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Duration",
                    "es":"Duración"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Predictability",
                    "es":"Predecibilidad"
                },          
            }
        ]
    },
    {
        "nodetype":"div",
        "styles":["tree_container"],
        "content":[
            {
                "nodetype":"h2",
                "styles":["branch_root"],
                "innerText":{
                    "en":"Performance",
                    "es":"Desempeño"
                },
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Speed",
                    "es":"Velocidad"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Efficiency",
                    "es":"Eficiencia"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Resource Consumption",
                    "es":"Consumo de Recursos"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Scalability",
                    "es":"Escalabilidad"
                },          
            }
        ]
    },
    {
        "nodetype":"div",
        "styles":["tree_container"],
        "content":[
            {
                "nodetype":"h2",
                "styles":["branch_root"],
                "innerText":{
                    "en":"Suportability",
                    "es":"Mantenimiento"
                },
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Testability",
                    "es":"Pruebas"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Extensibility",
                    "es":"Estensibilidad"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Serviceability",
                    "es":"Facilidad de reparación"
                },          
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Configurability",
                    "es":"Configuraciones"
                },          
            }
        ]
    }
]

window.onload = () => {
    ao.main = document.getElementById("from_home");
    ao.interface(default_opts);
    make_content_v2(ao.main, initial_structure);
}

function make_content_v2(target,content_array) {
    /*
        Función recursiva para crear contenido html en página deacuerdo al lenguaje
        con contenidos de ser necesario.
    */
    for (let pieces of content_array) {
        console.log(pieces);
        if (typeof pieces.innerText != "string") {
            pieces.innerText = pieces.innerText[ao.lng];
        };
        let built_item = ao.qq(pieces);
        if (pieces.content != undefined) {
            make_content_v2(built_item,pieces.content);
        }
        target.append(built_item);
    }
}