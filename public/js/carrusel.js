let index = 0;

function cambiarSlide(n) {
    const items = document.querySelectorAll('.item');
    index = (index + n + items.length) % items.length;
    const offset = -index * 100;
    document.querySelector('.carrusel-inner').style.transform = `translateX(${offset}%)`;
}

// Opcional: Cambiar automáticamente el slide cada 3 segundos
setInterval(() => cambiarSlide(1), 3000);
