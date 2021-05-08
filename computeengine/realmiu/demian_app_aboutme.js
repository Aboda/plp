/*
    Página estática con dos idiomas posibles
*/

let plain_content = [
    ["p",
    "Hello, my name is Demian, I am a self taught developer looking for new challenges.",
    "Hola, mi nombre es Demian, soy un desarrollador autodidacta buscando nuevos retos."
    ],
    ["p",
    "So far I have had a few years to employ javascript in an office environment for ad hoc tasks.",
    "Al día de hoy he tenido unos cuantos años para emplear javascript en ambientes de oficina para soluciones ad hoc."
    ],
    ["p",
    "These began with social media management about 5 years ago. An ex coworker invited me to his startup, centered around viral media sharing in facebook, and powered by a protoapp of his own making, unfortunately the Cambridge Analytica changes raised highgly the bar to create apps in facebook, and he, as a novice programmer was turn away, his protoapp swept under the rug of API changes.",
    "Estos comenzaron trabajando con redes sociales hace 5 años. Un ex compañero de trabajo me invito a su startup centrada alrededor de la distribución de contenido viral en facebook, potenciado por una protoapp hecha por el mismo, desafortunadamente los cambios derivados de el desastre de Cambridge Analytica alzaron significativamente la barrera de entrada en facebook y el, y su trabajo fueron rechazados, su protapp descontinuada por los cambios en la API"
    ],
    ["p",
    "He did not continue focusing on development, and we drifted away as the focus of his enterprise evolved away from mindful use of technology",
    "El no continuo enfocandose en el desarrollo, y nos distanciamos conforme el enfoque de su empresa se alejo de los principios del uso inteligente de la tecnología"
    ],
    ["p",
    "However I felt a calling while the adventure lasted. I always felt a strong atraction toward the arquetype of the developer, the hacker, the programmer, and all those who contributed to emulate aspects of reality, crafting tools and experiences trough technology, organizing electricity and matter to enhance our lifes trough sensorial an cognitive input",
    "Pero yo sentí un llamado mientras la aventura estuvo en  pleno. Siempre había sentido una fuerte atracción al arquetipo del desarrollador, el hacker o el programador, y todos aquellos que contribuyen a emular aspectos de la realidad, creando herramientas y experiencias a travez de la tecnología, organizando electricidad y materia para hacer nuestras vidas mejores alimentando nuestros sentidos y nuestra mente"
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
    "Eventually I broke into html and css as the need to provide complex interfaces arose. Later adding nodejs and virtualized environments to employ my code.",
    "Eventualmente seguí el hilo hasta html y css por la necesidad de generar interfaces complejas, Más tarde agregando nodejs y máquinas virtuales scripts para correr mi código"
    ],
    ["p",
    "Ever since I have been growing my understanding of the development world.",
    "Desde entonces he estado alimentando mi comprensión del mundo del desarrollo"
    ],
    ["p",
    "Fortunately I did not start from scratch, turns out my life and work experience continue to be a great help on the matter. I was very exposed to and aware of technology as I grew, I had worked most of my life in service oriented works surrounding the communications and IT industries in many different roles.",
    "Afortunadamente, no empece desde 0, resulta que mi experience de vida y trabajo son grandes ayudas en la tarea. Estuve muy expuesto a la tecnología conforme crecí, y trabaje la mayor parte de mi vida en actividades de servicio circundantes a la industria de comunicaciones y tecnologías de información"
    ],
    ["p",
    "I began my professional life as a videogame and computer rental store assistant. I was 13 at the time. It was a passion to go to this public place where they sold comics and leased play stations 1 for a few pesos an hour, I think it was $10 or about 2 600 ml cocacolas worth of money then. (today that coca is worth $18 pesos)",
    "Comenze mi vida profesional como un asistente en tiendas de renta de videjuegos y computadoras. Tenía 13 años en aquel entonces, Era una pasión mia el ir a este lugar donde vendían comics y rentaban play stations 1 por unos cuantos pesos por hora, algo así como $10 o bien 2 cocas de 600 ml de aquel entonces. (hoy esa coca cuesta $18 pesos)"
    ],
    ["p",
    "Eventually I began helping the store owners with the games lease, operated the consoles, kept track of rental times and even provided assistance to the ocational stuck rpg player :p",
    "Eventualmente comence a ayudar a los dueños de la tienda con la renta de los juegos, operaba las consolas, llevaba registro de los tiempo de juego e inclusive ayudaba al ocasional jugador de RPGs :p"
    ],
    ["p",
    "A couple years later, when I was 15 or 16 I walked into a computer rental store 'Café Internet' and spent a month worth of money renting computers only to chat with random people on the internet.",
    "Un par de años despues, teniendo 15 o 16, entré a un café internet (renta de equipos por hora), y me gaste una mesada entera en un par de días rentando computadoras para chatear con personas al azar en el internet"
    ],
    ["p",
    "I made quick friends with the owner, and before I knew it I was in charge, I worked intermitenttly for him on multiple locales up until my college years.",
    "Entable una amistad rápidamente con el dueño, y antes de que entender que estaba pasando, estaba a cargo del local, Trabajé intermitentemente para el en multiples locales hasta mis años de universidad"
    ],
    ["p",
    "It was a very interesting time with windows 95 rolling out with all the bells and wisthles it could muster, times of home parties with 'portable desktops' PCs to play starcraft weekends, which I could bring friends to play into the stablishment off business hours.",
    "Eran tiempos muy interesantes con windows 95 entrando a escena con todas las campanas y silbatos que podía, epoca de las fiestas de red en casa con 'computadoras portatiles' para jugar starcraft, cosa que podía hacer fuera de horarios de servicio con amigos"
    ],
    ["p",
    "As a sidenote, my father was into computers... for gaming, so we had a few at home (286 386 486 and I think father had older things then) and we kept up with the games of the times, not so much with programming, so that came later in life, but I remember fondly the NOD vs GDI conflict as well as the epic´s Wolfenstein and Doom, and so many others that I have almost forgotten about.",
    "Como nota al margen, mi papá era gamer, así que teníamos unas cuantas computadoras en casa, 286, 386, 486 y creo que mi padre tenía cosas aún más viejas, y nos manteniamos al tanto de los juegos de la epoca, no así con la programación, lo que vino más tarde en la vida, pero aún recuerdo con nostalgia el conflicto NOD vs GDI así como los épicos Wolfenstein y Doom, y tantos otros juegos de los que solo recuerdo detalles."
    ],
    ["p",
    "Ever since, I have worked in the IT industry as computer sales - repairman, consultant, only phone as well as remote login technical support, in premise assistance, in behalf of the internet provider as well as the custommer, Backoffice Analyst, B2B outsorced IT infrastructure provider, NOC monitor, web analytics analyst, social media manager and lately developer.",
    "Desde entonces he trabajado en la industria de Tecnologías de la Información en la reparación y venta de equipo de computo, como consultor, como soporte vía telefónica (exclusivo) y con acceso remoto a las PCs (en ciertos escenarios), asistencia en domicilio del usuario, tanto por parte del proveedor de internet como por parte del cliente, Analista de Backoffice, Proveedor de soporte de infraestructura de TI en modo negocio a negocio, monitor de NOC, analysta de estadísticas web, social media manager y últimamente desarrollador"
    ],
    ["p",
    "So by the time I come in operative contact with arrays, loops, var´s hoisting and enclosures (age 28), the big black box of misunderstood ideas surronding programming started having light shed from the inside.",
    "Así que para cuando llego a estar en contacto con los arreglos, bucles, 'variable hoisting and enclosures (¿ como se traducen estos ?)'  (28 años), la gran caja negra de ideas no comprendidas alrededor de la programación, empezo a iluminarse desde el interior"
    ],
    ["p",
    "Tools developed by the community where finally 'there' to pick me up from a place I handled with confort, the data and spreadsheet environment, into the development world which I had only seen as borderline magic before. It was a number of things which allowed me to pick up the skill while I worked full time on non development centered roles. Chrome with its absolute ownership of browser market (which reduces the need to css in N different prefixes), Dev console on Chrome (as a readily available ever more complete developer toolset), the V8 engine, Nodejs, Kubernetes (still getting this last one) SaaS and low cost online scalable virtual machines.",
    "Las herramientas estaban lo suficientemente integradas y maduras para tomarme de un lugar que manejaba con comodidad, el entorno de datos en una hoja de calculo, hacia el mundo del desarrollo que había concebido como cuasi mágico en el pasado. Fue una suma de factores que me permitio adquirir la habilidad mientras trabajaba de tiempo completo en roles no centrados en el desarrollo. Chrome con su absoluto dominio del mercado de navegadores (que reduce la necesidad de hacer css con 5 tipos de prefix), La consola de desarrollo en Chome (que es una caja de herramientas de desarrollador disponible al instante y cada vez más completo), el motor V8, Nodejs, Kubernetes (Sigo estudiando este) y el bajo costo de máquinas virtuales y SaaS"
    ],
    ["p",
    "Technologies like Javascript that integrate the entire vertical for app deployement in such a manageable and portable structure are the result of sustained effort from the whole community to grow with standards and provide ever transforming tools and strategies to assist those in charge of the problem solving. Open Source is now almost the de facto form of development for all those that simply do not fit withing corporate dynamics. (And then even corporations vouch for the added value that public contribution implies as well as the trust and survivability of technologies beyond the control of a usually shortly lived company.)",
    "Tecnologías como Javascript que integran la vertical completa para el despliegue de aplicaciónes de una forma tan manejable y transferible son el resultado de el esfuerzo sostenido de toda la comunidad para crecer con estandares y proveer herramientas en evolución constante para asistir a aquellos a cargo de la solución de problemas. Open source es ahora casí la forma dominante de desarrollo para todos aquellos que no caben dentro del esquema corportativo. (Y cabe mencionar que inclusive las corporaciones están respaldando ese valor agregado que brinda la contribución, así como la confianza en la supervicencia de tecnologías más allá del control de una compañia de breve vida)"
    ],
    ["p",
    "From then on I have been trying to get the right feel of everything, extrapolating my experience and knowledge on the deployement, operation and service providing aspects to the development world, finally making sense and diferentiating trough experience what I only knew as theory or description.",
    "Desde entonces he estado intentado obtener una medida precisa de todo, extrapolando mi experiencia y conocimiento en el mundo de despliegue, operación y proveimiento de servicio al mundo del desarrollo,  finalmente entendiendo y diferenciando a travez de la experiencia lo que solo conocía como teoría o descripción"
    ],
    ["p",
    "My mind is blow, as every new learning is a step closer toward being an active part of the extraordinary things that have already been done, and perhaps to participate in creating the ones to come. The breaktrough granted by this condition has given me strength and focus I never felt before.",
    "Me encuentro frecuentemente aturdido por la emoción que provoca cada nuevo aprendizaje, que siento es un paso más en la dirección de ser una parte activa de las cosas extraordinarias que ya han sido hechas, y quizas el participar en crear aquellas que están por venir. La realización que me brinda esta condición me dan fuerza y enfoque que no había sentido antes"
    ],
    ["p",
    "In a way, I spent many years trying to understand the path from a raw reality into a virtual one. Matter and its electrical properties,the way we codify information and derive it from such representations, the way senses teach us the first usage of this skill and how we have broken it down in discrete technical problems.",
    "De alguna forma, pasé muchos años intentando entender el camino de la realidad a la realidad virtual. Intentando entender la materia y sus propiedades electridas, la forma en que codificamos información y posteriormente la reinterpretamos, la forma en que los sentidos nos muestran el primer uso de esta habilidad y como es que hemos segmentado este fenómeno en problemas técnicos finitos"
    ],
    ["p",
    "So when programming became a real thing in my daily life, many questions on that process suddenly where answered. It is simply not possible to know it all in this ever accelerating environment, yet, I fell enthusiasm about the known depths of understanding and power, as well as those that are still only theorized.",
    "De forma que cuando la programación se volvió algo real en mi vida diaria, muchas preguntas de ese proceso fueron espontaneamente contestadas. Es imposible saberlo todo en este ambiente en constatne aceleración, sin embargo, eso me provoca entusiasmo por las profundidades conocidas de comprensión y poder, así como por aquellas fronteras de las que solo teorizamos"
    ],
    ["p",
    "This page comes as a hands on experiment to integrate and play with whatever comes my way, no middle man between you and I, and the challenge to do something of value by just playing around. This page and everything on it are ways to explore the tools I continue to study. ",
    "Esta página es un experimento activo para integrar y jugar con cualquier cosa que venga en mi camino, sin intermediarios entre Tu y Yo, el reto de hacer algo de valor simplemente jugando. Esta página y todos sus contenidos son formas de explorar las herramientas que continuo estudiando"
    ],
    ["p",
    "I decided to have absolute control over it to be able to slowly build something of my own that fulfills my aestethic values regarding everything, I try not to use any libraries on the server side, even when that means learning how to manually handle POST streams in nodejs.",
    "Decidí tener control absoluto sobre ella, para ser capaz de construir lentamente algo propio que satisfaga mis valores esteticos en todos los aspectos, procuro no usar ninguna librería en el lado del servidor, inclusive cuando eso significa aprender el como manejar manualmente la flujo de datos de POST en nodejs"
    ],
    ["p",
    "However I am eager to join someone else proyect as this web site is more of a child of love to put something out there, and help those I can with the skills I continue to aquire.",
    "Sin embargo estoy ansioso por integrarme al proyecto de alguien más, ya que este sitio es más una obra de amor para aportar algo al mundo, y ayudar a aquellos que pueda con las habilidades que continuo adquiriendo."
    ],
    ["p",
    "I want to involve myself in an ongoing proyect with enough moving parts to require coordinated development efforts, As I am awed by the complexity reach and power of cooperation and organization in a comparable yet different way to that of technical ability.",
    "Quiero involucrarme en un proyecto activo con suficientes partes moviles para requerir esfuerzos coordinados de desarrollo, Porque me impresiona la complejidad, el alcance y el poder de la cooperación y la organización, siendo comparables (aunque diferentes) de aquellos de la habilidad técnica"
    ],
    ["p",
    "I can barely contain the emotion that this learning path produces on me. It is hard to phrase out the complex satisfaction of all of this. In a way, to me, this means participating in the future. And everyday I am marveled by the solutions that can be built by anyone with basic resources in todays modernity.",
    "Apenas puedo contener la emoción que este camino de aprendizaje me provoca. Es dificil expresar la satisfacción compleja que todo esto brinda. Creo que para mi, esto significa participar en el futuro. Y cada día me maravillo por las soluciones que pueden ser construidas por cualquiera con recursos básicos en la modernidad"
    ],
    ["p",
    "Even this site, is mostly free thanks to the efforts of Google and the open source community, a f1 core machine with a minimal hard drive and memory assignation on Google Compute Engine, with a static public free ip address (the ip address alone is worth over $1000 pesos or more in local vendor prices, and that is after the base service fee,(see 55.6 cocas + about 27.7 = a month for static ip in the least expensive package)).",
    "Inclusive este sitio es mayoritariamente gratis gracias a los esfuerzos de Google y la comunidad open source, un nucleo f1 con una asignación minima de disco duro y memoria en Google Compute Engine, con una ip estática publica gratuita (que por si sola cuesta alrededor de $1000 pesos mensuales o más con los proveedores locales, y eso es despues de la tarifa base del servicio (vease 55.6 cocas por la ip + 27.7 por el servicio x mes))"
    ],
    ["p",
    "There is a very stark contrast in work cultures and environments. I believe that there is a group of people with a vision out there who is the perfect match for me, to grow and do the most of this life and whatever proyects we pursue. I am hopeful that this candid letter will help us find eachother.",
    "Existen contrastes muy fuertes en las culturas y ambientes de trabajo. Y pienso que existe un grupo de personas con una vision con quien puedo tener una dinámica perfecta, crecer y hacer más de esta vida y cualquier proyecto que persigamos. Tengo esperanza que esta sincera carta nos ayude a encontrarnos mutuamente."
    ],
    ["p",
    "It is some sort of duty, to leave some of us in our wake. Our own approach, the small story of an individual in this sea of humanity. Machines can work data that simbolyses ideas as much as they can perform amazing feats on the material reality we belong to. This path of life is just learning how that power works, ¿how it can be employed?, ¿who has already done what in what ways? and finally: ¿What do we want to do with this power ourselves?.",
    "Tenemos un deber tácito de dejar algo en nuestro camino, nuestra propia aproximación, la historia de un individuo en este mar de humanidad. Las máquinas pueden trabajar datos que simbolizan ideas tanto como pueden lograr cosas impresionantes en la realidad material a la que pertencemos. Este camino es aprender como funciona ese poder, ¿como puede ser empleado?, ¿quien ha hecho que cosas con el? y finalmente ¿Qué queremos hacer con este poder nosotros mismos?"
    ],
    ["p",
    "Lets pursue an horizon together.",
    "Persigamos un horizonte juntos."
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