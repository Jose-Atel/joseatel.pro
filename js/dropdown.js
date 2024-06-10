document.addEventListener('DOMContentLoaded', function() {
    const dropbtns = document.querySelectorAll('.dropbtn');

    dropbtns.forEach(dropbtn => {
        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('dropdown-content');
        dropdownContent.innerHTML = `
            <a href="#">Move</a>
            <a href="#" class="resize-link" style="color: gray;">Resize</a>
            <a href="#">Restore</a>
            <a href="#">Minimize</a>
            <a href="#" class="maximize-link">Maximize</a>
        `;

        dropbtn.parentNode.appendChild(dropdownContent); // Añadir el menú como hijo del botón

        // Mostrar/ocultar el menú al hacer clic en el botón
        dropbtn.addEventListener('click', function() {
            dropdownContent.classList.toggle('show');
            updateRestoreOption(dropdownContent);
        });

        // Cerrar el menú si se hace clic fuera de él
        window.addEventListener('click', function(event) {
            if (!dropbtn.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove('show');
            }
        });

        // Agregar manejo de clics a las opciones del menú
        dropdownContent.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar que se abra el enlace
            handleOptionClick(event.target.textContent.trim());
            dropdownContent.classList.remove('show'); // Ocultar el menú después de hacer clic en una opción
        });

        // Función para manejar las acciones de cada opción del menú
        function handleOptionClick(option) {
            const windowElement = dropbtn.closest('.window');
            switch (option) {
                case 'Move':
                    console.log('Move option clicked');
                    enableMoveWindow(windowElement);
                    break;
                case 'Resize':
                    console.log('Resize option clicked');
                    // Implementar función de cambiar tamaño de la ventana
                    break;
                case 'Restore':
                    console.log('Restore option clicked');
                    restoreWindow(windowElement);
                    break;
                case 'Minimize':
                    console.log('Minimize option clicked');
                    minimizeWindow(windowElement);
                    break;
                case 'Maximize':
                    console.log('Maximize option clicked');
                    if (!windowElement.classList.contains('maximized')) {
                        maximizeWindow(windowElement);
                    }
                    break;
                default:
                    break;
            }
            updateRestoreOption(dropdownContent);
        }

        // Función para activar el movimiento de la ventana
        function enableMoveWindow(windowElement) {
            if (!windowElement.classList.contains('maximized')) {
                windowElement.style.cursor = 'move';
                windowElement.addEventListener('mousedown', startMoveWindow);
            }
        }

        // Función para iniciar el movimiento de la ventana
        function startMoveWindow(event) {
            const windowElement = event.target.closest('.window');
            const initialMouseX = event.clientX;
            const initialMouseY = event.clientY;
            const initialWindowX = windowElement.offsetLeft;
            const initialWindowY = windowElement.offsetTop;

            function moveWindow(event) {
                const deltaX = event.clientX - initialMouseX;
                const deltaY = event.clientY - initialMouseY;
                windowElement.style.left = `${initialWindowX + deltaX}px`;
                windowElement.style.top = `${initialWindowY + deltaY}px`;
            }

            function stopMoveWindow() {
                windowElement.removeEventListener('mousemove', moveWindow);
                windowElement.removeEventListener('mouseup', stopMoveWindow);
                windowElement.style.cursor = '';
            }

            windowElement.addEventListener('mousemove', moveWindow);
            windowElement.addEventListener('mouseup', stopMoveWindow);
        }

        // Función para minimizar la ventana
        function minimizeWindow(windowElement) {
            windowElement.style.display = 'none';
        }

        // Función para restaurar la ventana al tamaño previo
        function restoreWindow(windowElement) {
            if (windowElement.classList.contains('maximized')) {
                windowElement.style.top = windowElement.dataset.prevTop || '';
                windowElement.style.left = windowElement.dataset.prevLeft || '';
                windowElement.style.width = windowElement.dataset.prevWidth || '';
                windowElement.style.height = windowElement.dataset.prevHeight || '';

                windowElement.classList.remove('maximized');
                dropdownContent.querySelector('.maximize-link').style.color = ''; // Restaurar color por defecto para Maximize
                dropdownContent.querySelector('.resize-link').style.color = 'gray'; // Cambiar a gris para Restore
            }
            bringToFront(windowElement);
        }

        // Función para maximizar o restaurar la ventana
        function maximizeWindow(windowElement) {
            if (!windowElement.classList.contains('maximized')) {
                // Maximizar la ventana
                windowElement.classList.add('maximized');
                windowElement.dataset.prevTop = windowElement.style.top || '';
                windowElement.dataset.prevLeft = windowElement.style.left || '';
                windowElement.dataset.prevWidth = windowElement.style.width || '';
                windowElement.dataset.prevHeight = windowElement.style.height || '';

                windowElement.style.top = '0';
                windowElement.style.left = '0';
                windowElement.style.width = '100vw';
                windowElement.style.height = '100vh';

                // Cambiar a negro para Maximize y blanco para Restore
                dropdownContent.querySelector('.maximize-link').style.color = 'gray';
                dropdownContent.querySelector('.resize-link').style.color = ''; // Restaurar color por defecto para Resize
            }
            bringToFront(windowElement);
        }

        // Función para actualizar la opción Restore según el estado de la ventana
        function updateRestoreOption(dropdownContent) {
            const windowElement = dropbtn.closest('.window');
            const restoreLink = dropdownContent.querySelector('a[href="#"]:nth-child(3)');

            if (windowElement.classList.contains('maximized')) {
                restoreLink.style.color = ''; // Restaurar color normal para Restore
            } else {
                restoreLink.style.color = 'gray'; // Cambiar a gris para Restore
            }
        }
    });

    function bringToFront(window) {
        const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(w => parseInt(w.style.zIndex) || 0));
        window.style.zIndex = highestZIndex + 1;
    }
});
