var url = "/fb-app-contenidospuma-privacy-policy/"

const asserted_gates = function (url) {
    console.log("comenzando evaluación para url: "+url);
    var is_it_ok = false;
    var site_status = [
        "fb-app-contenidospuma-terms-of-service",
        "fb-app-contenidospuma-privacy-policy"
    ];
    for (built_piece of site_status) {
        console.log("probando: "+built_piece+" indice: "+built_piece.indexOf(url));
        if (url.indexOf(built_piece) == 1) {
            is_it_ok = true;
        };
    };
    return is_it_ok;
}

console.log(asserted_gates(url))