window.addEventListener('load', function() {
    console.log('El script de edit cuenta anda bien');
    const button = document.getElementById('enablePasswordChange');
    const newPassword = document.getElementById('newP');
    const confirmNewPassword = document.getElementById('confirmNewP');

    button.addEventListener('click', function() {
        if (newPassword.disabled) {
            // Habilita los campos de nueva contraseña y confirmación
            newPassword.disabled = false;
            confirmNewPassword.disabled = false;
            // Cambia el texto del botón a "Cancelar cambio de contraseña"
            this.textContent = 'Cancelar cambio de contraseña';
        } else {
            // Deshabilita los campos de nueva contraseña y confirmación
            newPassword.disabled = true;
            confirmNewPassword.disabled = true;
            // Cambia el texto del botón a "Cambiar contraseña"
            this.textContent = 'Habilitar cambio de contraseña';
        }
    });
 

        // --------------------------------- Buscador ---------------------------------------------
        document.getElementById('button-search').addEventListener('click', function () {
            var inputSearch = document.getElementById('buscador');
            if (window.innerWidth <= 769) {
                if (inputSearch.classList.contains('show')) {
                    inputSearch.classList.remove('show');
                    inputSearch.style.display = 'none';
                } else {
                    inputSearch.classList.add('show');
                    inputSearch.style.display = 'inline-block';
                }
            }
        });
    
        window.addEventListener('resize', function () {
            var inputSearch = document.getElementById('buscador');
            if (window.innerWidth > 769) {
                inputSearch.classList.remove('show');
                inputSearch.style.display = '';
            }
        });
    
        document.querySelectorAll('.footer-h3').forEach(item => {
            item.addEventListener('click', event => {
                const content = event.target.nextElementSibling;
                const isVisible = content.style.display === 'block';
                document.querySelectorAll('.sub-menus-footer').forEach(content => {
                    content.style.display = 'none';
                });
                content.style.display = isVisible ? 'none' : 'block';
            });
        });
    
        // --------------------------------- Validaciones de Formulario ---------------------------------------------
        const validateFieldBlur = (field, minLength, message) => {
            field.addEventListener('blur', function () {
            console.log('El script de edit cuenta blur anda bien');

                console.log('Campo:', field.id);
                let value = field.value.trim();
                if (value.length < minLength) {
                    field.classList.add('error');
                    field.style.borderColor = 'red';
                    field.placeholder = message;
                    field.value = ''; // Reset the value
                } else {
                    field.placeholder = '';
                    field.classList.remove('error');
                    field.style.borderColor = '';
                }
            });
            field.addEventListener('focus', function() {
                field.classList.remove('error'); // Eliminar el estilo de error
                field.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
            });
        };
    
        // Validar Nombre y Apellido
        let usuario = document.querySelector('#nombreUsuario');
    validateFieldBlur(usuario, 1, 'Escribe un nombre de Usuario');

    // Validar Email y Confirmación de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let email = document.querySelector('#email');
    email.addEventListener('blur', function () {
        let valorEmail = email.value.trim();
        if (!emailRegex.test(valorEmail)) {
            email.classList.add('error');
            email.style.borderColor = 'red';
            email.placeholder = 'Introduce un email válido';
            email.value = ''; 
        } else {
            email.placeholder = '';  
            email.classList.remove('error'); 
            email.style.borderColor = ''; 
        }
        email.addEventListener('focus', function() {
            email.classList.remove('error'); // Eliminar el estilo de error
            email.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
        });
    });

    let emailVerify = document.querySelector('#emailVerify');
    emailVerify.addEventListener('blur', function () {
        let valorEmailVerify = emailVerify.value.trim();
        if (!emailRegex.test(valorEmailVerify)) {
            emailVerify.classList.add('error');
            emailVerify.style.borderColor = 'red';
            emailVerify.placeholder = 'Confirma tu Email';
            emailVerify.value = '';
        } else if (valorEmailVerify !== email.value.trim()) {
            emailVerify.classList.add('error');
            emailVerify.style.borderColor = 'red';
            emailVerify.placeholder = 'Los emails no coinciden';
            emailVerify.value = '';
        } else {
            emailVerify.placeholder = '';  
            emailVerify.classList.remove('error'); 
            emailVerify.style.borderColor = ''; 
        }
        emailVerify.addEventListener('focus', function() {
            emailVerify.classList.remove('error'); // Eliminar el estilo de error
            emailVerify.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
        });
    });

    // Validar Contraseña y Confirmación de Contraseña
    let password = document.querySelector('#newP');
    validateFieldBlur(password, 8, 'Escribe una contraseña');

    let passwordVerify = document.querySelector('#confirmNewP');
    // validateFieldBlur(passwordVerify, 8, 'Confirma tu contraseña');

    passwordVerify.addEventListener('blur', function () {
        if (passwordVerify.value.trim() === '') {
            passwordVerify.classList.add('error');
            passwordVerify.style.borderColor = 'red';
            passwordVerify.placeholder = 'Confirma tu contraseña';
            passwordVerify.value = '';
        } else if (passwordVerify.value.trim() !== password.value.trim()) {
            passwordVerify.classList.add('error');
            passwordVerify.style.borderColor = 'red';
            passwordVerify.placeholder = 'Las contraseñas no coinciden';
            passwordVerify.value = '';
        } else {
            passwordVerify.placeholder = '';  
            passwordVerify.classList.remove('error'); 
            passwordVerify.style.borderColor = ''; 
        }
        passwordVerify.addEventListener('focus', function() {
            passwordVerify.classList.remove('error'); // Eliminar el estilo de error
            passwordVerify.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
        });
    });

    document.querySelector('#nuevaFoto').addEventListener('change', function() {
        const fileInput = document.querySelector('#nuevaFoto');
        const file = fileInput.files[0];  // Captura el archivo subido
    console.log('se activo el evento change');
        if (file) {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];  // Extensiones válidas
            const fileName = file.name.toLowerCase();  // Nombre del archivo en minúsculas
            const fileExtension = fileName.split('.').pop();  // Extraer la extensión del archivo
    
            if (!allowedExtensions.includes(fileExtension)) {
                Swal.fire({
                    title: 'Error',
                    text: 'Solo se permiten archivos de imagen: ' + allowedExtensions.join(', '),
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                // alert('Solo se permiten archivos de imagen: ' + allowedExtensions.join(', ')); //esta linea hace lo siguiente: si el archivo no es una imagen, muestra un alert con el mensaje que se encuentra entre comillas. Es decir, si el archivo no es una imagen, se mostrará un mensaje que dice "Solo se permiten archivos de imagen: jpg, jpeg, png, gif"
                fileInput.value = '';  // Limpiar el input si no es válido
            } else {
                // Aquí puedes proceder con el procesamiento del archivo válido
                console.log('Archivo válido: ', file.name);
            }
        }
    });
    document.getElementById('editCount').addEventListener('submit', function (e) {
        e.preventDefault();
    console.log('El script de edit cuenta submit anda bien');
           

        let formIsValid = true;
        const validateField = (field, minLength, message) => {
           
                let value = field.value.trim();
                if (value.length < minLength) {
                    field.classList.add('error');
                    field.style.borderColor = 'red';
                    field.placeholder = message;
                    field.value = ''; // Reset the value
                } else {
                    field.placeholder = '';
                    field.classList.remove('error');
                    field.style.borderColor = '';
                }
            };  

       
        const nombreUsuario = document.getElementById('nombreUsuario');
    
        const email = document.getElementById('email');
        const emailVerify = document.getElementById('emailVerify');
        const newP = document.getElementById('newP');
        const confirmNewP = document.getElementById('confirmNewP');
        const admin = document.getElementById('admin');
        const comp = document.getElementById('comp');
        const vendedor = document.getElementById('vendedor');
        const currentPassword = document.getElementById('currentPassword');
        const errorMessage = document.getElementById("error-message");

    

        // Validar Descripción
      
        const nombreUsuarioValue = nombreUsuario.value.trim();
        if (nombreUsuarioValue.length < 1) {
            validateField(usuario, 1, 'Escribe un nombre de Usuario');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
   
        const emailValue = email.value.trim();
        if (emailValue.length < 1) {
            validateField(email, 1, 'Introduce un email válido');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const emailVerifyValue = emailVerify.value.trim();
        if (emailVerifyValue.length < 1) {
            validateField(emailVerify, 1, 'Introduce un email válido');

            formIsValid = false;

            // alert('Debe ingresar el precio.');
        }
        if (emailValue !== emailVerifyValue) {
            validateField(email, 8, 'Los emails no coinciden');
            validateField(emailVerify, 8, 'Los emails no coinciden');
            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }

        
        const passwordValue = newP.value.trim();
        const passwordVerifyValue =confirmNewP.value.trim();
        const passwordDisabled = newPassword.disabled;
        const confirmNewPasswordDisabled = confirmNewPassword.disabled;
        console.log('habilitado valor',!passwordDisabled && !confirmNewPasswordDisabled);
        if (!passwordDisabled && !confirmNewPasswordDisabled) {
        if (passwordValue.length < 1) {
            validateField(password, 8, 'Escribe una nueva contraseña');
            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        if (passwordVerifyValue.length < 1) {
            validateField(passwordVerify, 8, 'Confirma la nueva contraseña');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        if (passwordValue !== passwordVerifyValue) {
            validateField(password, 8, 'Las contraseñas no coinciden');
            validateField(passwordVerify, 8, 'Las contraseñas no coinciden');
            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
    }


        const adminValue = admin.checked;
        const compValue = comp.checked;
        // const vendedorValue = vendedor.checked;
        if (!adminValue && !compValue) {
            errorMessage.textContent = "Debes seleccionar una opción.";
            formIsValid = false;
            
        }
        // else { errorMessage.textContent = ""; }

        // const currentPassword = document.getElementById('currentPassword').value;
  
  // Simulamos el envío al servidor para validar la contraseña actual
  if (formIsValid) {
    const currentPasswordValue = currentPassword.value.trim();
    fetch('/users/validate-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword: currentPasswordValue }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            console.log('Contraseña válida. Enviando formulario...');
            // Enviar el formulario solo si la contraseña es válida
            document.getElementById('editCount').submit();
        } else {
            console.log('Contraseña incorrecta');
            Swal.fire({
                title: 'Error',
                text: 'La contraseña actual no es correcta.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    })
    .catch(error => {
        console.error('Error en la validación de la contraseña:', error);
    });
} else {
    // Si hay errores de validación en el frontend
    Swal.fire({
        title: 'Error',
        text: 'Debes completar todos los campos correctamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}
}); //Tuve que cambiar el lugar de algunas funciones porque no estaba esperando la respuesta del fetch, por lo que el formulario se enviaba antes de que se validara la contraseña actual. Y el error de la contraseña actual era recibido por el backend. 
// Entonces siempre hay que esperar la respuesta de evento asincronico como fetch, setTimeout, setInterval, etc. Y hacer que la lógica última que dependa de esa respuesta esté dentro de la función que se ejecuta cuando se recibe la respuesta. Y si hay más lógica que no depende de esa respuesta, se la puede dejar afuera de esa función. Y si hay más lógica que depende de esa respuesta, se la puede poner dentro de esa función. Y si hay más lógica que depende de esa respuesta y de otra respuesta, se
});
