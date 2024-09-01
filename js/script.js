document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const blocksContainer = document.getElementById('blocksContainer');
    const ship = document.getElementById('ship');
    const bulletsContainer = document.getElementById('bulletsContainer');
    const bulletSize = 5; // Tamaño de la bala
    const blockSize = 25; // Tamaño de los bloques
    const blockSpacing = 5; // Espacio entre bloques
    const blockSpeed = 0.5; // Velocidad de movimiento de los bloques
    let direction = 1; // 1 para derecha, -1 para izquierda
    let bullets = [];

    function createBlocks() {
        blocksContainer.innerHTML = ''; // Limpiar bloques existentes
        const containerWidth = blocksContainer.clientWidth;
        const containerHeight = blocksContainer.clientHeight;
        let x = 0;
        let y = 0;

        while (y < containerHeight) {
            while (x < containerWidth) {
                const block = document.createElement('div');
                block.className = 'block';
                block.style.width = `${blockSize}px`;
                block.style.height = `${blockSize}px`;
                block.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                block.style.position = 'absolute';
                block.style.left = `${x}px`;
                block.style.top = `${y}px`;
                blocksContainer.appendChild(block);
                x += blockSize + blockSpacing;
            }
            x = 0;
            y += blockSize + blockSpacing;
        }
    }

    function moveBlocks() {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            const currentLeft = parseFloat(getComputedStyle(block).left);
            block.style.left = `${currentLeft + direction * blockSpeed}px`;
        });

        const firstBlock = blocks[0];
        const lastBlock = blocks[blocks.length - 1];

        if (parseFloat(getComputedStyle(firstBlock).left) <= 0) {
            direction = 1;
        } else if (parseFloat(getComputedStyle(lastBlock).right) >= blocksContainer.clientWidth - blockSize) {
            direction = -1;
        }
    }

    function checkBulletCollisions() {
        const bullets = document.querySelectorAll('.bullet');
        bullets.forEach(bullet => {
            const bulletRect = bullet.getBoundingClientRect();
            document.querySelectorAll('.block').forEach(block => {
                const blockRect = block.getBoundingClientRect();
                if (
                    bulletRect.left < blockRect.right &&
                    bulletRect.right > blockRect.left &&
                    bulletRect.top < blockRect.bottom &&
                    bulletRect.bottom > blockRect.top
                ) {
                    block.remove();
                    bullet.remove();
                }
            });

            if (parseFloat(getComputedStyle(bullet).bottom) >= gameContainer.clientHeight) {
                bullet.remove();
            }
        });
    }

    function gameLoop() {
        moveBlocks();
        checkBulletCollisions();
        requestAnimationFrame(gameLoop);
    }

    function shootBullet() {
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.style.width = `${bulletSize}px`;
        bullet.style.height = `${bulletSize * 2}px`;
        bullet.style.backgroundColor = 'red';
        bullet.style.position = 'absolute';
        bullet.style.left = `${parseFloat(getComputedStyle(ship).left) + parseFloat(getComputedStyle(ship).width) / 2 - bulletSize / 2}px`;
        bullet.style.bottom = `${parseFloat(getComputedStyle(ship).height)}px`;
        bulletsContainer.appendChild(bullet);

        let bulletInterval = setInterval(() => {
            const currentBottom = parseFloat(getComputedStyle(bullet).bottom);
            bullet.style.bottom = `${currentBottom + 5}px`;

            if (currentBottom >= gameContainer.clientHeight) {
                clearInterval(bulletInterval);
                bullet.remove();
            }
        }, 20);
    }

    // Manejo de eventos para el teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            ship.style.left = `${Math.max(0, parseFloat(getComputedStyle(ship).left) - 10)}px`;
        } else if (e.key === 'ArrowRight') {
            ship.style.left = `${Math.min(gameContainer.clientWidth - parseFloat(getComputedStyle(ship).width), parseFloat(getComputedStyle(ship).left) + 10)}px`;
        } else if (e.key === ' ') {
            shootBullet();
        }
    });

    createBlocks();
    gameLoop();
});
