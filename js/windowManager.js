document.addEventListener('DOMContentLoaded', function() {
    const files = document.querySelectorAll('.file');
    const windows = document.querySelectorAll('.window');
    
    files.forEach(file => {
        file.addEventListener('click', () => {
            const fileId = file.getAttribute('data-file');
            const window = document.getElementById(`${fileId}-window`);
            // Ocultar todas las ventanas antes de mostrar la ventana seleccionada
            windows.forEach(win => {
                win.style.display = 'none';
                win.classList.remove('custom-style'); // Remover la clase custom-style
            });
            window.style.display = 'flex';
            bringToFront(window);

            // Agregar la clase dinámicamente a la ventana
            window.classList.add('custom-style');
        });
    });

    windows.forEach(window => {
        const titleBar = window.querySelector('.title-bar');
        const minimizeBtn = window.querySelector('.minimize');
        const maximizeBtn = window.querySelector('.maximize');
        const dropdown = window.querySelector('.dropdown');

        let isMaximized = false;
        let startX, startY, startWidth, startHeight;
        let prevTop, prevLeft, prevWidth, prevHeight; // Variables para almacenar el estado anterior de la ventana
        
        titleBar.addEventListener('mousedown', e => {
            if (!isMaximized) {
                startX = e.clientX - window.offsetLeft;
                startY = e.clientY - window.offsetTop;
                
                function mouseMoveHandler(e) {
                    window.style.left = `${e.clientX - startX}px`;
                    window.style.top = `${e.clientY - startY}px`;
                    bringToFront(window);
                }

                function mouseUpHandler() {
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('mouseup', mouseUpHandler);
                }

                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            }
        });

        minimizeBtn.addEventListener('click', () => {
            window.style.display = 'none';
        });

        // Función para maximizar o restaurar la ventana
        function toggleMaximize() {
            if (!isMaximized) {
                // Maximizar la ventana
                prevTop = window.style.top;
                prevLeft = window.style.left;
                prevWidth = window.style.width;
                prevHeight = window.style.height;
                window.style.top = '0';
                window.style.left = '0';
                window.style.width = '100%';
                window.style.height = '100%';
                maximizeBtn.innerHTML = '▼'; // Cambiar el texto del botón de maximizar a restaurar
                dropdown.querySelector('.maximize-link').style.color = ''; // Restaurar color por defecto en el menú dropdown
                dropdown.querySelector('.resize-link').style.color = ''; // Restaurar color por defecto para Resize en el menú dropdown
                isMaximized = true;
            } else {
                // Restaurar la ventana
                window.style.top = prevTop || '';
                window.style.left = prevLeft || '';
                window.style.width = prevWidth || '';
                window.style.height = prevHeight || '';
                maximizeBtn.innerHTML = '▲'; // Cambiar el texto del botón de restaurar a maximizar
                dropdown.querySelector('.maximize-link').style.color = 'gray'; // Cambiar color a gris en el menú dropdown
                dropdown.querySelector('.resize-link').style.color = 'gray'; // Cambiar color a gris para Resize en el menú dropdown
                isMaximized = false;
            }
            bringToFront(window);
        }

        maximizeBtn.addEventListener('click', toggleMaximize);

        dropdown.addEventListener('click', () => {
            toggleMaximize();
            dropdown.classList.toggle('show');
        });

        window.addEventListener('mousedown', () => {
            bringToFront(window);
        });
    });

    function bringToFront(window) {
        const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(w => parseInt(w.style.zIndex) || 0));
        window.style.zIndex = highestZIndex + 1;
    }
});
