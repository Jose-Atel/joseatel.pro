document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const image1 = "images/background.png";
    const image2 = "images/background-half.png";

    // Crear un contenedor para el fondo
    const backgroundContainer = document.createElement('div');
    backgroundContainer.style.position = 'absolute';
    backgroundContainer.style.top = '0';
    backgroundContainer.style.left = '0';
    backgroundContainer.style.width = '100%';
    backgroundContainer.style.height = '100%';
    backgroundContainer.style.zIndex = '-1';
    backgroundContainer.style.overflow = 'hidden';
    body.appendChild(backgroundContainer);

    const rowHeight = 50; // Altura de cada fila, ajusta según el tamaño de tus imágenes
    const windowHeight = window.innerHeight;
    const rows = Math.ceil(windowHeight / rowHeight);

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.style.height = `${rowHeight}px`;
        row.style.display = 'flex';

        if (i % 2 === 0) {
            row.style.backgroundImage = `url(${image1})`;
            row.style.backgroundRepeat = 'repeat-x';
            row.style.backgroundSize = 'auto 100%';
        } else {
            const firstHalf = document.createElement('div');
            firstHalf.style.flex = '0 0 50px'; // Ancho del primer medio ladrillo
            firstHalf.style.backgroundImage = `url(${image2})`;
            firstHalf.style.backgroundSize = 'cover';

            const rest = document.createElement('div');
            rest.style.flex = '1';
            rest.style.backgroundImage = `url(${image1})`;
            rest.style.backgroundRepeat = 'repeat-x';
            rest.style.backgroundSize = 'auto 100%';

            row.appendChild(firstHalf);
            row.appendChild(rest);
        }

        backgroundContainer.appendChild(row);
    }
});
