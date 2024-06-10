document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.file');
    let isDragging = false; // Variable para controlar si se está arrastrando o haciendo clic

    // Función para establecer las posiciones iniciales de los iconos
    function setInitialPositions() {
        const desktopWidth = document.getElementById('desktop').clientWidth;
        const iconWidth = 60; // Ancho de cada ícono
        const iconHeight = 60; // Alto de cada ícono
        const marginX = 10; // Margen horizontal entre íconos
        const marginY = 10; // Margen vertical entre filas de íconos
        let posX = marginX; // Posición inicial en X
        let posY = marginY; // Posición inicial en Y

        icons.forEach((icon, index) => {
            icon.style.left = `${posX}px`;
            icon.style.top = `${posY}px`;

            // Calcular la siguiente posición en X
            posX += iconWidth + marginX;

            // Si se alcanza el borde derecho del escritorio, pasar a la siguiente fila
            if (posX + iconWidth + marginX > desktopWidth) {
                posX = marginX;
                posY += iconHeight + marginY;
            }

            // Guardar las posiciones iniciales para uso futuro
            icon.setAttribute('data-initial-x', parseFloat(icon.style.left));
            icon.setAttribute('data-initial-y', parseFloat(icon.style.top));
        });
    }

    // Llamar a la función para establecer las posiciones iniciales
    setInitialPositions();

    icons.forEach(icon => {
        let startX, startY, initialX, initialY;

        icon.addEventListener('mousedown', function(e) {
            e.preventDefault();

            startX = e.clientX;
            startY = e.clientY;
            initialX = icon.offsetLeft;
            initialY = icon.offsetTop;

            function mouseMoveHandler(e) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                    isDragging = true;
                    icon.style.left = `${initialX + deltaX}px`;
                    icon.style.top = `${initialY + deltaY}px`;
                }
            }

            function mouseUpHandler(e) {
                if (!isDragging) {
                    // Acción al hacer clic sin arrastrar (por ejemplo, abrir la ventana)
                    const fileId = icon.getAttribute('data-file');
                    const window = document.getElementById(`${fileId}-window`);
                    const windows = document.querySelectorAll('.window');

                    windows.forEach(win => {
                        win.style.display = 'none';
                        win.classList.remove('custom-style');
                    });
                    window.style.display = 'flex';
                    bringToFront(window);
                    window.classList.add('custom-style');
                }

                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                isDragging = false; // Reiniciar la variable de arrastre
            }

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        // Asegurarse de que los íconos sean arrastrables
        icon.style.position = 'absolute';
    });

    function bringToFront(window) {
        const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(w => parseInt(w.style.zIndex) || 0));
        window.style.zIndex = highestZIndex + 1;
    }
});
