document.addEventListener('DOMContentLoaded', function() {
    const taskContainer = document.getElementById('task-container');
    const tasks = ['tasks/task1.md']; // Lista de archivos de tareas con la ruta correcta

    tasks.forEach(task => {
        fetch(task)
            .then(response => response.text())
            .then(data => {
                const taskHTML = marked(data); // Convierte Markdown a HTML usando marked.js
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                taskDiv.innerHTML = taskHTML;
                taskContainer.appendChild(taskDiv);
            })
            .catch(error => console.error('Error al cargar la tarea:', error));
    });
});
