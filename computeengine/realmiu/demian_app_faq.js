/*
    Página estática con dos idiomas posibles
*/

let plain_content = [
    ["p",
    "What is this place?",
    "¿Qué es este lugar?"    
    ],
    ["p",
    "This is my portfolio / testing ground to be able to practice and showcase aquired knowledges",    
    "Este es mi portafolio / espacio de práctica para poder emplear y mostrar conocimientos adquiridos"
    ],
    ["p",
    "How may people work on this project?",
    "¿Cuantás personas trabajan en este proyecto?"
    ],
    ["p",
    "It is a personal proyect that is used by a few testers",
    "Es un proyecto personal que es usado por múltiples testers"
    ],
    ["p",
    "¿Do you sell this?",
    "Vendes esto?"    
    ],
    ["p",
    "If this is what you want / require yes of course, but what I sell is systems engineering and development",
    "Si esto es lo que quieres / necesitas, claro, pero lo que yo vendo es diseño y desarrollo de sistemas"
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