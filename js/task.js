document.addEventListener('DOMContentLoaded', function() {
    const taskContainer = document.getElementById('task-container');
    const tasks = ['tasks/task1.md']; // Lista de archivos de tareas

    tasks.forEach(task => {
        fetch(`tasks/${task}`)
            .then(response => response.text())
            .then(data => {
                const taskHTML = marked(data);
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                taskDiv.innerHTML = taskHTML;
                taskContainer.appendChild(taskDiv);
            })
            .catch(error => console.error('Error al cargar la tarea:', error));
    });
});
