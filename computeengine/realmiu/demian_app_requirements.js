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
                        "styles":["normal_font"],
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
                        "styles":["normal_font"],
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
                        "styles":["normal_font"],
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
                        "styles":["normal_font"],
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
                        "styles":["normal_font"],
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
                        "styles":["normal_font"],
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
                        "styles":["normal_font"],
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
                        "styles":["normal_font"],
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
                        "styles":["normal_font"],
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
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"All functionality provided needs to be business class 24/7 without noticeable service delays or interruptions (tools in development need to specify so as to be differentiated from ready modules)",
                            "es":"Toda funcionalidad proveída necesita ser de calidad de negocios y estar disponible 24/7 sin retrasos o interrupciones perceptibles (las herramientas en desarrollo necesitan especificarlo para diferenciarlas de los módulos listos)"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Availability",
                    "es":"Disponibilidad"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Must be equally available and functional for anywhere in the world, whitin the single source limitations",
                            "es":"Debe estar igualmente disponible para cualquier lugar del mundo dentro de las limitaciones de un solo punto de distribución"
                        }
                    }
                ]         
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Failure Rate",
                    "es":"Indice de Errores"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Specific tools within the platform will have their acceptable error rate evaluated individually",
                            "es":"Cada herramienta en específico dentro de la plataforma tendra sus margenes de arror aceptable evaluados de forma individual"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Duration",
                    "es":"Duración"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"This might be a permanent sideproject",
                            "es":"Este puede ser un projecto lateral permanente"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Predictability",
                    "es":"Predecibilidad"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"All outputs must be desired or understandable by me, if I dont know how it is done, or why it outputs somehting, it should not be here",
                            "es":"Todo output debe ser desado o comprendid por mi, si no se como se hizó o porque produce un resultado, no debería estar aqui"
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
                    "en":"Performance",
                    "es":"Desempeño"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Performance needs to sit in the upper eschelons of evaluation from devtools within chrome, detailed by metric goals need to be set",
                            "es":"El desempeño necesita encontrarse en las escalas superiores de evaluación de las herramientas de desarrollador de chrome, objetivos detallados de las metricas necesitan ser sentados"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Speed",
                    "es":"Velocidad"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Speed needs to remain wihtin standards by module",
                            "es":"La velocidad debe permanecer dentro de los estandares sentados por cada modulo"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Efficiency",
                    "es":"Eficiencia"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Development needs to mind the available free resources to remain below free tier consumption from used clouds",
                            "es":"El desarrollo necesita considerar la disponibilida de recursos gratuitos para permanecer en ese rango de consumo de las nubes utilizadas"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Resource Consumption",
                    "es":"Consumo de Recursos"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Resource consumption needs to occur at the user end as backbone is intended to be extremely slim",
                            "es":"El consumo de recursos necesita ocurrir en el lado del usuario pues la infraestructura prentende ser extremadamente ligera"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Scalability",
                    "es":"Escalabilidad"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Needs to be able to grow vertically or horizontally depending on the module needs and susccess",
                            "es":"Necesita poder crecer vertical u horizontalmente dependiendo de las necesidades y éxito de los modulos"
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
                    "en":"Suportability",
                    "es":"Mantenimiento"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"All maintenance is executed by me, as necessary tasks arises these need to be documented as well",
                            "es":"Todo mantenimiento es ejecutado por mi, conforme identifique tareas necesarias, estas tendran que ser documentadas tambien"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Testability",
                    "es":"Pruebas"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Testing needs to be focused in the individual modules developed",
                            "es":"Las pruebas serán enfocadas en los módulos individuales desarrollados"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Extensibility",
                    "es":"Estensibilidad"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Needs to be able to make use of the current ecosystem of online APIs as well as infraestructure provider services",
                            "es":"Necesita poder hacer uso del ecosystema actual de APIs en linea así como de los servicios del proveedor de infraestructura"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Serviceability",
                    "es":"Facilidad de reparación"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Modular design approach needs to be followed to allow for modular repairs",
                            "es":"Una aproximación modular de diseño necesita ser seguida para permitir reparaciones por modulo"
                        }
                    }
                ]
            },
            {
                "nodetype":"h3",
                "innerText":{
                    "en":"Configurability",
                    "es":"Configuraciones"
                },
                "content":[
                    {
                        "nodetype":"p",
                        "styles":["normal_font"],
                        "innerText":{
                            "en":"Non code based interface controls are only to be developed for products that are adapted for a particular custommer",
                            "es":"Interfaces de control no basadas en código solo serán desarrolladas para productos que son adapatados para el uso de clientes"
                        }
                    }
                ]
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