document.addEventListener('DOMContentLoaded', function() {
    const astronauta = document.querySelector('.astronauta');
    const body = document.body;
    const overlay = document.querySelector('.overlay');
    
    // Función para iniciar la animación del astronauta y el fondo
    function startAnimation() {
        astronauta.classList.add('moving');
        body.classList.add('zooming');
        overlay.style.opacity = '1'; // Muestra la pantalla negra

        // Desactivar animaciones y ocultar la pantalla negra después del zoom
        setTimeout(function() {
            astronauta.classList.remove('moving');
            body.classList.remove('zooming');
            overlay.style.opacity = '0'; // Oculta la pantalla negra
        }, 6000); // Ajusta el tiempo según la duración de la animación
    }

    // Listener para el clic en el enlace de retorno
    document.querySelector('.home-link').addEventListener('click', function(e) {
        e.preventDefault();
        startAnimation();
    });
});
