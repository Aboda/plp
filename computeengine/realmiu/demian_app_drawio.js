/*
    Página estática con dos idiomas posibles
*/

let plain_content = [
    ["h1",
    "Privacy Policy",
    "Politica de Privacidad"
    ],
    ["p",
    "This server does not store information regarding its users identity",
    "Este servidor no guarda información de la identidad de sus usuarios"
    ],
    ["p",
    "Temporal logging with the requester ip address, method and requested resource is taken for site administration purposes.",
    "Un registro temporal con la dirección ip del solicitante, el método usado y el recurso solicitado es llevado para fines de administración del sitio."
    ],
    ["p",
    "Session management is handled on the web client with the vendors SDKs",
    "El control de sesiones es manejado en el cliente web con los SDKs proveídos por terceros"
    ],
    ["p",
    "The only cookie used is google analytics which provides anonymized usage data",
    "La única cookie utilizada es google analytics que provee información de uso anonimizada"
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