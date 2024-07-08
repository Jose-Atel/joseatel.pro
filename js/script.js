document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "header.html");
    loadComponent("main", "main.html");
    loadComponent("footer", "footer.html");

    // TASK
    loadComponent("task1", "tasks/task1.html");
    loadComponent("task2", "tasks/task2.html");
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`Error loading component ${id}:`, error));
}
