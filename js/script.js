document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "header.html");
    loadComponent("main", "main.html");
    loadComponent("footer", "footer.html");
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}
