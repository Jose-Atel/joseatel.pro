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

        maximizeBtn.addEventListener('click', () => {
            if (isMaximized) {
                window.style.width = startWidth;
                window.style.height = startHeight;
                window.style.left = startX;
                window.style.top = startY;
                isMaximized = false;
            } else {
                startWidth = window.style.width;
                startHeight = window.style.height;
                startX = window.style.left;
                startY = window.style.top;
                window.style.width = '100%';
                window.style.height = '100%';
                window.style.left = '0';
                window.style.top = '0';
                isMaximized = true;
            }
            bringToFront(window);
        });

        dropdown.addEventListener('click', () => {
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
