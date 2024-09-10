// animacion.js
document.addEventListener('DOMContentLoaded', function() {
    const astronauta = document.querySelector('.astronauta');
    const body = document.body;

    // Función para iniciar la animación del astronauta y el fondo
    function startAnimation() {
        astronauta.classList.add('moving');
        body.classList.add('zooming');

        // Desactivar animaciones y ocultar la pantalla negra después del zoom
        setTimeout(function() {
            astronauta.classList.remove('moving');
            body.classList.remove('zooming');
        }, 15000); // Ajusta el tiempo según la duración de la animación
    }

    // Listener para el clic en cualquier parte de la página
    document.body.addEventListener('click', startAnimation);
    document.body.addEventListener('touchstart', startAnimation);
});
