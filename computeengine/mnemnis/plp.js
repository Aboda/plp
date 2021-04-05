/*
    Este archivo se encarga de la identificación del usuario con la plataforma
*/
setTimeout(()=>{prompt_fb_login()},3000);
function prompt_fb_login(){
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });
}
