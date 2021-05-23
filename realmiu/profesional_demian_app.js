/*
    Esta página mostrará al usuario la información disponible en el CV
    con algún adorno de presentación
*/
let order_modes = {
    "time":{
        "rationale":{
            "en":"Chronological",
            "es":"Cronológico"
        }
    },
    "roles":{
        "rationale":{
            "en":"Rol",
            "es":"Rol"
        }
    },
    "technology":{
        "rationale":{
            "en":"Technology",
            "es":"Tecnología"
        }
    },
    "skills":{
        "rationale":{
            "en":"Skills",
            "es":"Habilidades"
        }
    },
}

let employment = {
    "Autodidacta":{},
    "Darefort":{},
    "We keep on moving":{},
    "Airbnb hosting":{},
    "Librero de gutenberg":{},
    "Tata consultancy services":{},
    "Compucom":{},
    "Total Play":{},
    "Moheli":{},
    "Teletech":{},
    "Bigotes de Villa":{},
    "Italian Coffee":{},
    "El mesón de los leones":{},
    "Clinica hiperbárica":{},
    "Seven Eleven":{},
    "Consultoría personal":{},
    "Other Cafés":{},
    "Café@ & CoffeeNet":{},
    "Bazar Comics":{}
}

let education = {
    "CEDI":{},
    "Liceo Méxicano Japones":{},
    "Escuela en estado de México":{},
    "Agustín García Conde":{},
    "Escuela en San Andres":{},
    "Cajeme":{},
    "Primaria abierta":{},
    "Secundaria Jean Piaget":{},
    "Instituto Juarez":{},
    "ENP6":{},
    "CENEVAL":{},
    "UNAM":{},
    "Juniper":{}
}

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