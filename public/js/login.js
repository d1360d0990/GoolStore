
window.addEventListener('load', function(){
    let nombreUsuarioLogin = document.querySelector('#nombreUsuarioLogin')
    
    nombreUsuarioLogin.addEventListener ('blur', function(e){
        if(nombreUsuarioLogin.value.trim() === ''){
            nombreUsuarioLogin.classList.add('error');
            nombreUsuarioLogin.style.borderColor = 'red';
            nombreUsuarioLogin.placeholder = 'Escribe un Em@il válido';
            nombreUsuarioLogin.value = '';
                    }
        else {
            nombreUsuarioLogin.placeholder = '';  
            nombreUsuarioLogin.classList.remove('error'); 
            nombreUsuarioLogin.style.borderColor = ""; 
                                              }

    })
    let passwordLogin = document.querySelector('#passwordLogin')
    
    passwordLogin.addEventListener ('blur', function(e){
        if(passwordLogin.value.trim() === ''){
            passwordLogin.classList.add('error');
            passwordLogin.style.borderColor = 'red';
            passwordLogin.placeholder = 'Escribe una contraseña';
            passwordLogin.value = '';
                    }
        else {
            passwordLogin.placeholder = '';  
            passwordLogin.classList.remove('error'); 
            passwordLogin.style.borderColor = ""; 
                                              }

    })




})
