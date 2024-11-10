
document.getElementById("imagen").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const imgPreview = document.getElementById("imgPreview");

    if (file) {
        // Crea una URL para la imagen seleccionada
        const reader = new FileReader();
        reader.onload = function (e) {
            imgPreview.src = e.target.result;
            imgPreview.style.display = "block"; // Muestra la imagen
        };
        reader.readAsDataURL(file); // Lee el archivo como URL
    } else {
        // Si se elimina la selección, oculta la imagen
        imgPreview.style.display = "none";
        imgPreview.src = "";
    }
});
