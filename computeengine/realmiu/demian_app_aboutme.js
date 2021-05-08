/*
    Página estática con dos idiomas posibles
*/

let plain_content = [
    ["p",
    "Hello, my name is Demian, I am a self taught developer looking for new challenges.",
    "Hola, mi nombre es Demian, soy un desarrollador autodidacta buscando nuevos retos."
    ],
    ["p",
    "So far I have had a few years to employ javascript in a few different environments for ad hoc tasks.",
    "Al día de hoy he tenido unos cuantos años para emplear javascrupt en una diversidad de ambientes para trabajos específicos"
    ],
    ["p",
    "These began with social media management about 5 years ago. A ex coworker back then developed a small tool to interface with facebook, that helped him stay fresh and on top of all competition for a couple years before de Cambride Analytica disaster.",
    "Estos comenzaron trabajando con redes sociales hace 5 años. Un ex compañero de trabajo desarrollo una pequeña herramienta para interactuar con facebook, eso le ayudo a superar a la competencia por un par de años antes del desastre de Cambridge Analytica"
    ],
    ["p",
    "However he never moved on into development and facebook rolled him and his protoapp under the rug.",
    "Sin embargo, mi amigo no continuo en la vía del desarrollo y eventualmente facebook desactivo su protoaplicación"
    ],
    ["p",
    "I always felt a strong atraction toward the arquetype of the developer, the hacker, the programmer, and all the other genius that made it possible to emulate aspects of reality from organized electricity into sensible poly sensorial information.",
    "Yo en cambio siempre había sentido una fuerte atracción al arquetipo del desarrollador, el hacker o el programador, así como los genios que hacen posible el emular aspectos de la realidad desde electricidad organizada, forjando información polisensorial"
    ],
    ["p",
    "And working in that environment with the advantage given by the tool granted me the perspective of the difference that minimal automation can do. I began learning with javascript thanks to google drive google sheets scripting abilities.",
    "Trabajar en ese ambiente con las ventajas otorgadas por la herramienta me brindo una perspectiva de la differencia que una cantidad minima de automatizacíon puede lograr. Y así comenze a aprender con javascript, gracias a google sheets y sus scripts"
    ],
    ["p",
    "This helped me in my next jobs, as google drive on scripts is a powerful and very pliable tool.",
    "Esto me ayudo en mis siguientes trabajos, ya que google drive amplificado por los scripts son una herramienta poderosa y maleable"
    ],
    ["p",
    "Eventually I broke into html and css as the need to provide complex interfaces arose. Later adding nodejs and virtualized environments as well as google apps scripts to employ my code.",
    "Eventualmente seguíe el hilo hasta html y css por la necesidad de generar interfaces complejas, Más tarde agregando nodejs y máquinas virtuales así como google apps scripts para correr mi código"
    ],
    ["p",
    "Ever since I have been growing my understanding of the development world.",
    "Desde entonces he estado alimentando mi comprensión del mundo del desarrollo"
    ],
    ["p",
    "Fortunately I did not start from scratch, turns out my past life and work experience are a great help on the matter. I understood the whole software lifecycle from the custommer perspective as well as diffent types of provider in different levels of responsability and related to different technologies and scopes of support.",
    "Afortunadamente, no empece desde 0, resulta que mi experience de vida y trabajo previa son grandes ayudas en la tarea. Comprendo el ciclo de vida completo desde la perspectiva del cliente así como desde la de los proveedores de servicio en sus diferentes enfoques de soporte, tecnología y responsabilidad"
    ],
    ["p",
    "I began my professional life as a videogame and computer rental store assistant. I was 13 at the time. It was a passion to go to this public place where they sold comics and leased play stations 1 for a few pesos an hour, I think it was $10 or about 2 600 ml cocacolas worth of money then.",
    "Comenze mi vida profesional como un asistente en tiendas de renta de videjuegos y computadoras. Tenía 13 años en aquel entonces, Era una pasión mia el ir a este lugar donde vendían comics y rentaban play stations 1 por unos cuantos pesos por hora, algo así como $10 o bien 2 cocas de 600 ml de aquel entonces"
    ],
    ["p",
    "Eventually I began helping the store owners with the games lease, operated the consoles, kept track of rental times and even provided assistance to the ocational rpg player :p",
    "Eventualmente comence a ayudar a los dueños de la tienda con la renta de los juegos, operaba las consolas, llevaba registro de los tiempo de juego e inclusive ayudaba al ocasional jugador de RPGs :p"
    ],
    ["p",
    "A couple years later, when I was 15 or 16 I walked into a computer rental store 'Café Internet' and spent a month worth of money renting computers only to chat with random people on the internet.",
    "Un par de años despues, teniendo 15 o 16, entré a un café internet (renta de equipos por hora), y me gaste una mesada entera en un par de días rentando computadoras para chatear con personas al azar en el internet"
    ],
    ["p",
    "I made quick friends with the owner, and before I knew it I was in charge.",
    "Entable una amistad rápidamente con el dueño, y antes de que entender que estaba pasando, estaba a cargo del local"
    ],
    ["p",
    "It was a very interesting time with windows 95 rolling out with all the bells and wisthles it could muster, times of home parties with 'portable desktops' PCs to play starcraft weekends, which I could bring friends to play into the stablishment off business hours.",
    "Eran tiempos muy interesantes con windows 95 entrando a escena con todas las campanas y silbatos que podía, epoca de las fiestas de red en casa con 'computadoras portatiles' para jugar starcraft, cosa que podía hacer fuera de horarios de servicio con amigos"
    ]
]

window.onload = () => {
    ao.main = document.getElementById("from_home");
    ao.interface(default_opts);
    make_content(plain_content);
}

function make_content(content_array) {
    for (let pieces of content_array) {
        let selected_text;
        if (ao.lng == "en") {
            selected_text = pieces[1];
        }
        if (ao.lng == "es") {
            selected_text = pieces[2];
        }
        ao.main.append(
            ao.qq({"nodetype":pieces[0],"innerText":selected_text})
        );
    }
}