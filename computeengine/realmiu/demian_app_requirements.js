/*
    Página estática con dos idiomas posibles
*/

let initial_structure = [
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
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"Provide a fully controlable point of contact between any internet user and me",
                            "es":"Proveer un punto de contacto completamente controlable entre cualquier usuario de internet y yo"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Capability",
                    "es":"Capacidad"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"While low thoroughput is expected, an ample display of domains and functionalities need to be showcased here",
                            "es":"Mientras que se espera una baja afluencia, es necesario hacer demostración de multiples dominios y funcionalidades"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Reusability",
                    "es":"Reusabilidad"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"The underlying structure needs to be able to be repurposed for third parties as they may want some or all of the showcased functionalities",
                            "es":"La estructura subyacente debe poder ser reutilizada para terceros pues pueden desear una o más funciones de las mostradas"
                        }
                    }
                ]         
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Security",
                    "es":"Seguridad"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"Be reasonably resistant or immune to known vulnerabilities trough design process",
                            "es":"Ser razónablemente resistente o inmune a vulnerabilidades conocidas gracias al proceso de diseño"
                        }
                    }
                ]         
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
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"Being accesible enough to allow for intuitive operation by third parties",
                            "es":"Ser lo suficientemente accesible para permitir al operación intuitiva por terceros"
                        }
                    }
                ]  
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Human Factors",
                    "es":"Factores Humanos"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"This tool is intended to expand my capabilities to being able to quickly prototype content and tools as needed",
                            "es":"Esta herramienta prentende expandir mis capacidades para ser capaz de generar prototipos de contenido y herramienta conforme sea necesario"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Aesthetics",
                    "es":"Apariencia"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"Aesthetics can be an after tought as long as the interface is usable",
                            "es":"La presentación visual puede ser ignorada mientras no dificulte la interface"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Consistency",
                    "es":"Consistencia"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"As a quick prototyping environment, consistency is not a priority, preferring inovative test interactions",
                            "es":"Como una herraienta de generación rápida de prototipos, la consistencia no es una prioridad, prefiriendo interacciónes inovativas de prueba"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Documentation",
                    "es":"Documentación"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "innerText":{
                            "en":"Documentation needs to be built to assist potential future developers in the task of habilitating the platform for third parties",
                            "es":"Necesita existir documentación para ayudar a desarrolladores en el futuro a habilitar la plataforma para terceros"
                        }
                    }
                ]
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
        if (pieces.innerText != undefined) {
            if (typeof pieces.innerText != "string") {
                pieces.innerText = pieces.innerText[ao.lng];
            };
        };
        let built_item = ao.qq(pieces);
        if (pieces.content != undefined) {
            make_content_v2(built_item,pieces.content);
        }
        target.append(built_item);
    }
}