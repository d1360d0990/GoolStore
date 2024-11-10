window.addEventListener('load', function () {
    console.log('este es el script de register.js');
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

   console.log('este es el segundo script de register.js');

    // --------------------------------- Validaciones de Formulario ---------------------------------------------
    const validateFieldBlur = (field, minLength, message) => {
        field.addEventListener('blur', function () {
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
    console.log('este es el tercer script de register.js');

    // Validar Nombre y Apellido
    let nombre = document.querySelector('#nombre');
    validateFieldBlur(nombre, 2, 'Nombre debe tener más de 2 caracteres');
    
    let apellido = document.querySelector('#apellido');
    validateFieldBlur(apellido, 2, 'Apellido debe tener más de 2 caracteres');

    // Validar DNI, Teléfono, Domicilio, País y Usuario
    let dni = document.querySelector('#dni');
    validateFieldBlur(dni, 1, 'Escribe tu DNI');

    let telefono = document.querySelector('#telefono');
    validateFieldBlur(telefono, 1, 'Escribe tu Teléfono');

    let domicilio = document.querySelector('#domicilio');
    validateFieldBlur(domicilio, 1, 'Escribe tu Domicilio');

    let pais = document.querySelector('#country');
    validateFieldBlur(pais, 1, 'Escribe tu país');

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
console.log('este es el cuarto script de register.js');
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
    let password = document.querySelector('#password');
    validateFieldBlur(password, 8, 'Escribe una contraseña');

    let passwordVerify = document.querySelector('#passwordVerify');
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
    document.getElementById('formulario').addEventListener('submit', function (e) {
           
        e.preventDefault();
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

       
        const nombre = document.getElementById('nombre');
        const apellido = document.getElementById('apellido');
        const dni = document.getElementById('dni');
        const telefono = document.getElementById('telefono');
        const domicilio = document.getElementById('domicilio');
        const nombreUsuario = document.getElementById('nombreUsuario');
        const country = document.getElementById('country');
        const email = document.getElementById('email');
        const emailVerify = document.getElementById('emailVerify');
        const password = document.getElementById('password');
        const passwordVerify = document.getElementById('passwordVerify');
        const admin = document.getElementById('admin');
        const comp = document.getElementById('comp');
        const errorMessage = document.getElementById("error-message");

        const nombreValue = nombre.value.trim();
        if (nombreValue.length < 2) {
            validateField(nombre, 2, 'Nombre debe tener más de 2 caracteres');

            formIsValid = false;
            
        }

        // Validar Descripción
        const apellidoValue = apellido.value.trim();
        if (apellidoValue.length < 2) {
            validateField(apellido, 2, 'Apellido debe tener más de 2 caracteres');

            formIsValid = false;
            // alert('La descripción debe tener al menos 20 caracteres.');
        }
        // Validar Color
        const dniValue = dni.value.trim();
        if (dniValue.length < 1) {
            validateField(dni, 1, 'Escribe tu DNI');

            formIsValid = false;
            // alert('Debe ingresr el color.');
        }
        // Validar Precio
        const telefonoValue = telefono.value.trim();
        if (telefonoValue.length < 1) {
            validateField(telefono, 1, 'Escribe tu Teléfono');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const domicilioValue = domicilio.value.trim();
        if (domicilioValue.length < 1) {
            validateField(domicilio, 1, 'Escribe tu Domicilio');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const nombreUsuarioValue = nombreUsuario.value.trim();
        if (nombreUsuarioValue.length < 1) {
            validateField(nombreUsuario, 1, 'Escribe un nombre de Usuario');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const countryValue = country.value.trim();
        if (countryValue.length < 1) {
            validateField(country, 1, 'Escribe tu país');

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
        const passwordValue = password.value.trim();
        if (passwordValue.length < 1) {
            validateField(password, 8, 'Escribe una contraseña');
            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const passwordVerifyValue = passwordVerify.value.trim();
        if (passwordVerifyValue.length < 1) {
            validateField(passwordVerify, 8, 'Escribe una contraseña');

            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        if (passwordValue !== passwordVerifyValue) {
            validateField(password, 8, 'Las contraseñas no coinciden');
            validateField(passwordVerify, 8, 'Las contraseñas no coinciden');
            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }
        const adminValue = admin.checked;
        const compValue = comp.checked;
        if (!adminValue && !compValue) {
            errorMessage.textContent = "Debes seleccionar una opción.";
            formIsValid = false;
            
        }
        // else { errorMessage.textContent = ""; }
        

        // Si el formulario no es válido, evitar el envío
        if (formIsValid) {
            document.getElementById('formulario').submit();

            // Aquí se puede proceder con el envío del formulario si es válido
            // alert('Formulario enviado con éxito.');
            console.log('Formulario enviado con éxito.');
            console.log(formIsValid);


        } else {
            console.log('Formulario inválido');
            // alert('Debe completar todos los campos');
            Swal.fire({
                title: 'Error',
                text: 'Debes completar todos los campos correctamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            // e.preventDefault();
             // Evita que el formulario se envíe si no es válido
        }
    });

    document.querySelector('#fileUpload').addEventListener('change', function() {
        const fileInput = document.querySelector('#fileUpload');
        const file = fileInput.files[0];  // Captura el archivo subido
    
        if (file) {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];  // Extensiones válidas
            const fileName = file.name.toLowerCase();  // Nombre del archivo en minúsculas
            const fileExtension = fileName.split('.').pop();  // Extraer la extensión del archivo
    
            if (!allowedExtensions.includes(fileExtension)) {
                alert('Solo se permiten archivos de imagen: ' + allowedExtensions.join(', ')); //esta linea hace lo siguiente: si el archivo no es una imagen, muestra un alert con el mensaje que se encuentra entre comillas. Es decir, si el archivo no es una imagen, se mostrará un mensaje que dice "Solo se permiten archivos de imagen: jpg, jpeg, png, gif"
                fileInput.value = '';  // Limpiar el input si no es válido
            } else {
                // Aquí puedes proceder con el procesamiento del archivo válido
                console.log('Archivo válido: ', file.name);
            }
        }
    });
    
});
