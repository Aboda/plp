/*
    Este es el login que se estima necesario para:

    1.- Desplegar la lista de páginas administradas
    2.- Escojer un y poder tener acceso a:
        a) posts (agregar, leer y editar) (hay que ver si podemos entrar de una vez a instagram)
        b) estadisticas (consultar directamente o consultar reportes automáticos)
        c) interacciónes del público
        d) publicar a grupos
    3.- La dinámica radica en poder consultar la base de datos curada en apps scripts
    para crear con esa información un pool en el que el usuario pueda navegar y seleccionar
    las piezas que desea programar, y los horarios en que desea hacerlo
    4.- Una vez que la fecha deseada llegue y el post sea compartido, esta aplicación debería tomar
    snapshots en intervalos definidos para poder generar perfiles analizables (considerar sampling rate vs recursos)
    5.- Esta aplicación haría disponible al usuario en diferentes formatos la información automáticamente recolectada
    de los contenidos empleados, como ejemplo google sheets + google data studio para la expresión de los alcances.

    el archivo par para este login por el momento es somema.js
*/
function prompt_fb_login() {
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'pages_manage_posts,instagram_content_publish,pages_manage_metadata,pages_manage_engagement,publish_to_groups,read_insights,pages_show_list'});
}