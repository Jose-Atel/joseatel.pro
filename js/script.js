document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "header.html");
    loadComponent("main", "main.html");
    loadComponent("aside", "aside.html");
    loadComponent("footer", "footer.html");

    // TASK
    loadComponent("task1", "tasks/task1.html");
    loadComponent("task2", "tasks/task2.html");
    loadComponent("task3", "tasks/task3.html");
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Element with ID '${id}' not found.`);
            }
        })
        .catch(error => console.error(`Error loading component ${id}:`, error));
}
