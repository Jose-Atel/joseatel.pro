document.addEventListener('DOMContentLoaded', function() {
    const mainContainer = document.getElementById('main');
    const tasks = ['tasks/task1.html']; // Lista de archivos HTML de tareas con la ruta correcta

    tasks.forEach(task => {
        fetch(task)
            .then(response => response.text())
            .then(data => {
                mainContainer.innerHTML += data; // Inserta el contenido HTML directamente
            })
            .catch(error => console.error('Error al cargar la tarea:', error));
    });
});
