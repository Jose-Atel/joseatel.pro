document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.file');
    const windows = document.querySelectorAll('.window');
    
    icons.forEach(icon => {
        // Al hacer clic en un icono
        icon.addEventListener('click', () => {
            const fileId = icon.getAttribute('data-file');
            const window = document.getElementById(`${fileId}-window`);
            
            // Mostrar la ventana correspondiente si está oculta
            if (window.style.display === 'none' || window.style.display === '') {
                window.style.display = 'flex';
                bringToFront(window);
            } else {
                bringToFront(window); // Traer al frente si ya está abierta
            }
        });

        // Agregar funcionalidad de arrastrar para mover el icono
        let dragging = false;
        let offsetX, offsetY;

        icon.addEventListener('mousedown', (e) => {
            dragging = true;
            offsetX = e.clientX - parseFloat(window.getComputedStyle(icon).left);
            offsetY = e.clientY - parseFloat(window.getComputedStyle(icon).top);
            bringToFront(icon); // Traer el icono al frente al comenzar a arrastrar
        });

        document.addEventListener('mousemove', (e) => {
            if (dragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                icon.style.left = `${x}px`;
                icon.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            dragging = false;
        });
    });

    windows.forEach(window => {
        const titleBar = window.querySelector('.title-bar');
        const minimizeBtn = window.querySelector('.minimize');
        const maximizeBtn = window.querySelector('.maximize');
        const dropdown = window.querySelector('.dropdown');
        const maximizeLink = dropdown.querySelector('.maximize-link');
        const restoreLink = dropdown.querySelector('.restore-link');

        let isMaximized = false;
        let startX, startY, startWidth, startHeight;
        let prevTop, prevLeft, prevWidth, prevHeight;

        titleBar.addEventListener('mousedown', e => {
            startX = e.clientX - window.offsetLeft;
            startY = e.clientY - window.offsetTop;

            function mouseMoveHandler(e) {
                if (!isMaximized) {
                    window.style.left = `${e.clientX - startX}px`;
                    window.style.top = `${e.clientY - startY}px`;
                }
                bringToFront(window);
            }

            function mouseUpHandler() {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        minimizeBtn.addEventListener('click', () => {
            window.style.display = 'none';
        });

        function maximizeRestoreWindow() {
            if (isMaximized) {
                window.style.top = prevTop;
                window.style.left = prevLeft;
                window.style.width = prevWidth;
                window.style.height = prevHeight;
                window.classList.remove('maximized');
                maximizeBtn.innerHTML = '▲';
                maximizeLink.style.color = '';
                restoreLink.style.color = 'gray';
                isMaximized = false;
            } else {
                prevTop = window.style.top;
                prevLeft = window.style.left;
                prevWidth = window.style.width;
                prevHeight = window.style.height;
                window.style.top = '0';
                window.style.left = '0';
                window.style.width = '98%';
                window.style.height = '98%';
                window.classList.add('maximized');
                maximizeBtn.innerHTML = '▼';
                maximizeLink.style.color = 'gray';
                restoreLink.style.color = '';
                isMaximized = true;
            }
            bringToFront(window);
        }

        maximizeBtn.addEventListener('click', maximizeRestoreWindow);
        maximizeLink.addEventListener('click', maximizeRestoreWindow);
        restoreLink.addEventListener('click', maximizeRestoreWindow);

        dropdown.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });

        window.addEventListener('mousedown', () => {
            bringToFront(window);
        });
    });

    function bringToFront(element) {
        const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(el => parseInt(el.style.zIndex) || 0));
        element.style.zIndex = highestZIndex + 1;
    }
});
