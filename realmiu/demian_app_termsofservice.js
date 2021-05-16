/*
    Página estática con dos idiomas posibles
*/

let plain_content = [
    ["p",
    "Terms of Service.",
    "Terminos del Servicio"
    ],
    ["p",
    "There is no statement of function or guarantee this site makes regarding anything.",
    "No hay declaración de función o garantía que este sitio haga respecto a nada"
    ],
    ["p",
    "This is a test and experimentation site.",
    "Este es un sitio de pruebas y experimentación"
    ],
    ["p",
    "Any use of this site comes at your own risk.",
    "Cualquier uso de el o sus funciones es bajo tu propio riesgo"
    ],
    ["p",
    "I do not cater to any traffic that would by virtue of visiting, impose any duty upon me.",
    "Este servicio no es para nadie que por virtud de visitarlo imponga deberes sobre de mi."
    ],
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