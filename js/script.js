document.addEventListener('DOMContentLoaded', function() {
    const files = document.querySelectorAll('.file');
    const windows = document.querySelectorAll('.window');
    
    files.forEach(file => {
        file.addEventListener('click', () => {
            const fileId = file.getAttribute('data-file');
            const window = document.getElementById(`${fileId}-window`);
            windows.forEach(win => {
                win.style.display = 'none';
                win.classList.remove('custom-style');
            });
            window.style.display = 'flex';
            bringToFront(window);
            window.classList.add('custom-style');
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
                window.style.width = '98.6%';
                window.style.height = '98.3%';
                window.classList.add('maximized');
                maximizeBtn.innerHTML = '';
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

    function bringToFront(window) {
        const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.window')).map(w => parseInt(w.style.zIndex) || 0));
        window.style.zIndex = highestZIndex + 1;
    }
});
