window.addEventListener('load', function () {
    console.log('este es el script de product.js');
    // document.getElementById('categoria').addEventListener('change', function () {
    //     const categoriaId = this.value;
    //     const subcategoriaDiv = document.getElementById('subcategoriaDiv');
    //     const subcategoriaSelect = document.getElementById('subcategoria');
    
    //     // Mostrar solo las subcategorías que pertenecen a la categoría seleccionada
    //     Array.from(subcategoriaSelect.options).forEach(option => {
    //         option.style.display = option.getAttribute('data-categoria') === categoriaId ? 'block' : 'none';
    //     });
    
    //     // Mostrar o esconder el selector de subcategoría
    //     subcategoriaDiv.style.display = categoriaId ? 'block' : 'none';
    //     subcategoriaSelect.value = ""; // Reiniciar selección
    // });

  
    // Escucha cambios en el select de Categoría Principal
    document.getElementById('categoria').addEventListener('change', function () {
        const categoriaId = this.value;
        const subcategoriaDiv = document.getElementById('subcategoriaDiv');
        const subcategoriaSelect = document.getElementById('subcategoria');
        const tipoProductoDiv = document.getElementById('tipoProductoDiv');
        const tipoProductoSelect = document.getElementById('tipoProducto');

        // Resetear selección de subcategoría y tipo de producto
        subcategoriaSelect.value = "";
        tipoProductoSelect.value = "";

        // Mostrar solo las subcategorías que pertenecen a la categoría seleccionada
        Array.from(subcategoriaSelect.options).forEach(option => {
            option.style.display = option.getAttribute('data-categoria') === categoriaId ? 'block' : 'none';
        });

        // Mostrar u ocultar el selector de subcategorías
        subcategoriaDiv.style.display = categoriaId ? 'block' : 'none';
        tipoProductoDiv.style.display = 'none'; // Ocultar selector de tipo de producto hasta que se elija una subcategoría
    });

    // Escucha cambios en el select de Subcategoría
    document.getElementById('subcategoria').addEventListener('change', function () {
        const subcategoriaId = this.value;
        const tipoProductoDiv = document.getElementById('tipoProductoDiv');
        const tipoProductoSelect = document.getElementById('tipoProducto');

        // Resetear selección de tipo de producto
        tipoProductoSelect.value = "";

        // Mostrar solo los tipos de producto que pertenecen a la subcategoría seleccionada
        Array.from(tipoProductoSelect.options).forEach(option => {
            option.style.display = option.getAttribute('data-subcategoria') === subcategoriaId ? 'block' : 'none';
        });

        // Mostrar u ocultar el selector de tipos de producto
        tipoProductoDiv.style.display = subcategoriaId ? 'block' : 'none';
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
    const validateField = (field, minLength, requiredMessage, minLengthMessage) => {
        field.addEventListener('blur', function () {
            let value = field.value.trim();
            console.log('Valor del campo:', value);
            console.log('Longitud del campo:', value.length);
    
            // Verificar si el campo está vacío
            if (value.length === 0) {
                field.classList.add('error');
                field.style.borderColor = 'red';
                field.placeholder = requiredMessage; // Mensaje para campo obligatorio
                // charCounter.textContent = ''; // Limpiar el contador
            } else if (minLength && value.length < minLength) {
                field.classList.add('error');
                field.style.borderColor = 'red';
                field.placeholder = minLengthMessage.replace('X', minLength); // Mensaje de longitud mínima
                field.value = '';
                // charCounter.textContent = ''; // Limpiar el contador
            } else {
                field.classList.remove('error');
                field.style.borderColor = ''; // Restablecer el borde si cumple con el mínimo
                field.placeholder = ''; // Limpiar el placeholder si está correcto
            }
        });
          // Evento focus para eliminar el borde rojo
    field.addEventListener('focus', function() {
        field.classList.remove('error'); // Eliminar el estilo de error
        field.style.borderColor = ''; // Quitar borde rojo al volver a enfocar
    });
};
    
    
    const textarea = document.getElementById('descripcion');
    const charCounter = document.getElementById('charCounter');
    const minLength = 20; // Mínimo de caracteres requerido
    
    // Contador de caracteres en el textarea
    textarea.addEventListener('input', function () {
        const currentLength = textarea.value.length; // Longitud actual del texto
        const remainingChars = minLength - currentLength; // Cuántos faltan para el mínimo
    
        // Actualizar el contador de caracteres
        if (remainingChars > 0) {
            charCounter.textContent = `Faltan ${remainingChars} caracteres para el mínimo requerido (20).`;
            // charCounter.classList.remove('error');
            charCounter.classList.add('error'); // Mantener el contador en rojo si faltan caracteres
            textarea.style.borderColor = ''; // Eliminar borde rojo al escribir aunque no llegue al mínimo
        } else {
            charCounter.textContent = `Has alcanzado el mínimo de caracteres requeridos.`;
            charCounter.classList.remove('error'); // Asegurarse de que no esté en rojo si alcanzó el mínimo
            textarea.classList.remove('error'); // Asegurarse de que el textarea no esté en rojo si alcanzó el mínimo
            textarea.style.borderColor = ''; // Quitar borde rojo si alcanzó el mínimo
        }
    });
    
    // Evento blur para cuando el usuario sale del textarea
    textarea.addEventListener('blur', function() {
        const currentLength = textarea.value.length;
        
        // Si el número de caracteres es menor al mínimo, mostrar el contador en rojo
        if (currentLength < minLength) {
            charCounter.classList.add('error');
            textarea.classList.add('error');
            textarea.style.borderColor = 'red'; // Mantener el borde rojo si no cumple el mínimo
        } else {
            charCounter.classList.remove('error');
            textarea.classList.remove('error'); // Si se alcanza el mínimo, no aplicar el estilo de error
            textarea.style.borderColor = ''; // Quitar el borde rojo si cumple el mínimo
        }
    });

    
    
    // Evento focus para eliminar el borde rojo cuando el usuario vuelva a escribir
    textarea.addEventListener('focus', function() {
        textarea.style.borderColor = ''; // Quitar el borde rojo cuando el campo reciba foco
        const currentLength = textarea.value.length;
    
    // Si está por debajo del mínimo, mantener el contador en rojo
    if (currentLength < minLength) {
        charCounter.classList.add('error'); // Mantener el contador en rojo
        // textarea.style.borderColor = 'red'; // Mantener el borde rojo
    } else {
        charCounter.classList.remove('error'); // Eliminar el estilo de error si se cumple el mínimo
        // textarea.style.borderColor = ''; // Quitar borde rojo si cumple el mínimo
    }
    });
    // Validar producto
    let producto = document.querySelector('#producto');
    validateField(producto, 2, 'Debe ingresar el nombre del producto', 'El nombre debe tener al menos X caracteres');
    // Validar descripción
    let descripcion = document.querySelector('#descripcion');
    validateField(descripcion, 20, 'Debe ingresar una descripción', 'La descripción debe tener al menos X caracteres');
    
    //Validar categoria
    let categoria= document.querySelector('#categoria');
    validateField(categoria, 1, 'Debe ingresar la categoria');

    //Validar la subcategoria
    let subcategoria= document.querySelector('#subcategoria');
    validateField(subcategoria, 1, 'Debe ingresar la subcategoria');

    //Validar el tipo
    let tipo= document.querySelector('#tipoProducto');
    validateField(tipo, 1, 'Debe ingresar el tipo');
    
    // Validar color
    let color = document.querySelector('#color');
    validateField(color, 1, 'Escribe el color');
    
    // Validar precio
    let precio = document.querySelector('#precio');
    validateField(precio, 1, 'Escribe el precio');
    

    document.getElementById('formulario').addEventListener('submit', function (e) {
        // e.preventDefault();

        let formIsValid = true;

        // Obtener el valor seleccionado del campo de marca
        const marcaSelect = document.getElementById('marca');
        const selectedMarcaValue = marcaSelect.value;
        const talleSelect = document.getElementById('talle');
        const selectedTalleValue = talleSelect.value;
        const nombre = document.getElementById('producto');
        const descripcion = document.getElementById('descripcion');
        const color = document.getElementById('color');
        const precio = document.getElementById('precio');
        const categoria = document.getElementById('categoria');
        const subcategoria = document.getElementById('subcategoria');
        const tipo = document.getElementById('tipoProducto');   
        const validateField = (field, minLength, requiredMessage, minLengthMessage) => {
       
                let value = field.value.trim();
                console.log('Valor del campo:', value);
                console.log('Longitud del campo:', value.length);
        
                // Verificar si el campo está vacío
                if (value.length === 0) {
                    field.classList.add('error');
                    field.style.borderColor = 'red';
                    field.placeholder = requiredMessage; // Mensaje para campo obligatorio
                    // charCounter.textContent = ''; // Limpiar el contador
                } else if (minLength && value.length < minLength) {
                    field.classList.add('error');
                    field.style.borderColor = 'red';
                    field.placeholder = minLengthMessage.replace('X', minLength); // Mensaje de longitud mínima
                    field.value = '';
                    // charCounter.textContent = ''; // Limpiar el contador
                } else {
                    field.classList.remove('error');
                    field.style.borderColor = ''; // Restablecer el borde si cumple con el mínimo
                    field.placeholder = ''; // Limpiar el placeholder si está correcto
                }
            }

        // Limpiar mensaje de error previo
        // document.getElementById('marcaError').textContent = '';

        // Validar marca y talle
        if (!selectedMarcaValue) {
            talleSelect.classList.add('error');
                    talleSelect.style.borderColor = 'red';
            formIsValid = false;
            // alert('Debe seleccionar una marca.');
        }
       
        if (!selectedTalleValue) {
            marcaSelect.classList.add('error');
                    marcaSelect.style.borderColor = 'red';
            formIsValid = false;
            // alert('Debe seleccionar un talle.');
        }

        // Validar nombre
        const nombreValue = nombre.value.trim();
        if (nombreValue.length < 2) {
            validateField(producto, 2, 'Debe ingresar el nombre del producto', 'El nombre debe tener al menos X caracteres');

            formIsValid = false;
            // alert('El nombre debe tener al menos 2 caracteres.');
        }

        // Validar Descripción
        const descripcionValue = descripcion.value.trim();
        if (descripcionValue.length < 20) {
            validateField(descripcion, 20, 'Debe ingresar una descripción', 'La descripción debe tener al menos X caracteres');
            
            formIsValid = false;
            // alert('La descripción debe tener al menos 20 caracteres.');
        }
 //Validar categoria
    const categoriaValue = categoria.value.trim();
    if (categoriaValue.length < 1) {
        formIsValid = false;
        validateField(categoria, 1, 'Debe ingresar la categoria');
        // alert('Debe ingresar la categoria.');
    }

    //Validar la subcategoria
    const subcategoriaValue = subcategoria.value.trim();
    if (subcategoriaValue.length < 1) {
        formIsValid = false;
        validateField(subcategoria, 1, 'Debe ingresar la subcategoria');
        // alert('Debe ingresar la subcategoria.');
    }

    //Validar el tipo
    const tipoValue = tipo.value.trim();
    if (tipoValue.length < 1) {
        formIsValid = false;
        validateField(tipo, 1, 'Debe ingresar el tipo');
        // alert('Debe ingresar el tipo.');
    }


        // Validar Color
        const colorValue = color.value.trim();
        if (colorValue.length < 1) {
            formIsValid = false;
            validateField(color, 1, 'Escribe el color');

            // alert('Debe ingresr el color.');
        }
        // Validar Precio
        const precioValue = precio.value.trim();
        if (precioValue.length < 1 || !/^\d+(\.\d{1,2})?$/.test(precioValue)) {
            validateField(precio, 1, 'Escribe el precio');
            precio.classList.add('error');
            precio.style.borderColor = 'red';
            formIsValid = false;
            // alert('Debe ingresar el precio.');
        }

        // Si el formulario no es válido, evitar el envío
        if (!formIsValid) {
          
            e.preventDefault();
            Swal.fire({
                title: 'Error',
                text: 'Debes completar todos los campos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }); // Evita que el formulario se envíe si no es válido
            // No se implementa alerta de success acá en el frontend porque se lo implementa en el backend, en la vista a la cual se redirige el usuario luego de enviar el formulario, en el controlador correspondiente. Y si se implementase un succes alert con la condición de que no haya errores, el usuario lo vería por pocos segundos antes de la redirección, lo cual no es lo más adecuado. Por eso, se lo implementa en el backend, en la vista a la cual se redirige el usuario luego de enviar el formulario, en el controlador correspondiente. Y otra solución el problema de que el success alert dure pocos segundos es que se lo implemente en el frontend, pero que dure más tiempo, pero no es lo más adecuado. Y para que dure mas tiempo lo que se tiene que hacer es agregar un setTimeout en el success alert, pero no es lo más adecuado.
        }
        if (talleSelect.value !== "") {
            talleSelect.classList.remove('error'); // Eliminar el estilo de error
            talleSelect.style.borderColor = ''; 
            }
    if (marcaSelect.value !== "") {
            marcaSelect.classList.remove('error'); // Eliminar el estilo de error
            marcaSelect.style.borderColor = ''; 
            }
    });

    document.querySelector('#imagen').addEventListener('change', function () {
        const imagen = document.querySelector('#imagen');
        const file = imagen.files[0];  // Captura el archivo subido

        if (file) {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];  // Extensiones válidas
            const fileName = file.name.toLowerCase();  // Nombre del archivo en minúsculas. Y la razón por la que se hace esto es porque las extensiones de archivo son sensibles a mayúsculas y minúsculas. Y además se hace esto para que el usuario pueda subir archivos con mayúsculas o minúsculas.
            const fileExtension = fileName.split('.').pop();  // Extraer la extensión del archivo

            if (!allowedExtensions.includes(fileExtension)) {
                Swal.fire({
                    title: 'Error',
                    text: 'Solo se permiten archivos de imagen: ' + allowedExtensions.join(', '),
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                // alert('Solo se permiten archivos de imagen: ' + allowedExtensions.join(', ')); //esta linea hace lo siguiente: si el archivo no es una imagen, muestra un alert con el mensaje que se encuentra entre comillas. Es decir, si el archivo no es una imagen, se mostrará un mensaje que dice "Solo se permiten archivos de imagen: jpg, jpeg, png, gif"
                imagen.value = '';  // Limpiar el input si no es válido
            } else {
                // Aquí puedes proceder con el procesamiento del archivo válido
                console.log('Archivo válido: ', file.name);
            }
        }
    });
    const marcaSelect = document.getElementById('marca');
    const talleSelect = document.getElementById('talle');
    const categoriaSelect = document.getElementById('categoria');
    const subcategoriaSelect = document.getElementById('subcategoria');
    const tipoProductoSelect = document.getElementById('tipoProducto');
    talleSelect.addEventListener('change', function() {
        
        talleSelect.classList.remove('error'); // Eliminar el estilo de error
        talleSelect.style.borderColor = ''; 
        
    });
    marcaSelect.addEventListener('change', function() {
        
        marcaSelect.classList.remove('error'); // Eliminar el estilo de error
        marcaSelect.style.borderColor = ''; 
        
    });
    categoriaSelect.addEventListener('change', function() {
            
            categoriaSelect.classList.remove('error'); // Eliminar el estilo de error
            categoriaSelect.style.borderColor = ''; 
            
        });
    subcategoriaSelect.addEventListener('change', function() {
            
            subcategoriaSelect.classList.remove('error'); // Eliminar el estilo de error
            subcategoriaSelect.style.borderColor = ''; 
            
        }); 
        tipoProductoSelect.addEventListener('change', function() {
            
            tipoProductoSelect.classList.remove('error'); // Eliminar el estilo de error
            tipoProductoSelect.style.borderColor = '';

        });

});
