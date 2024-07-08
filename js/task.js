document.addEventListener('DOMContentLoaded', function() {
    const mainContainer = document.getElementById('main');
    const tasks = [
        { file: 'tasks/task1.html', id: 'task1' },
        { file: 'tasks/task2.html', id: 'task2' }
        // Puedes añadir más archivos y sus IDs aquí según sea necesario
    ];

    // Itera sobre cada tarea y verifica si existe su contenedor correspondiente en el DOM
    tasks.forEach(task => {
        const { file, id } = task;
        const taskContainer = mainContainer.querySelector(`#${id}`);

        if (taskContainer) {
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    taskContainer.innerHTML = data; // Inserta el contenido HTML directamente en el contenedor específico
                })
                .catch(error => console.error(`Error al cargar la tarea ${file}:`, error));
        }
    });
});
