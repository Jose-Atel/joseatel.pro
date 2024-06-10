document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('.window');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Ocultar todas las ventanas al cargar la página
    windows.forEach(window => {
        window.style.display = 'none';
        window.style.left = '50px';
        window.style.top = '50px';
        window.style.width = '300px';
        window.style.height = '200px';
        window.classList.remove('maximized');
    });

    // Cerrar todos los menús desplegables al cargar la página
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
    });
});
