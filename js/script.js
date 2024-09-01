const ship = document.getElementById('ship');
const blocksContainer = document.getElementById('blocksContainer');
const bulletsContainer = document.getElementById('bulletsContainer');

let shipX = window.innerWidth / 2 - 25;
let shipWidth = 50;
let shipHeight = 30;
let shipSpeed = 5;

let bullets = [];
let blocks = [];
let blockSize = 25; // Tamaño de bloque ajustado
let blockSpacing = 5; // Espaciado ajustado para un mejor ajuste
let blockMoveSpeed = 0.5; // Movimiento más lento
let blockDirection = 1; // 1 for right, -1 for left
let blocksContainerWidth;
let blocksContainerHeight;

// Create blocks
function createBlocks() {
    blocksContainer.innerHTML = ''; // Clear existing blocks
    blocks = [];
    blocksContainerWidth = window.innerWidth;
    blocksContainerHeight = blocksContainer.clientHeight;
    const cols = Math.floor(blocksContainerWidth / (blockSize + blockSpacing)) - 2; // One less block on each side
    const rows = Math.floor(blocksContainerHeight / (blockSize + blockSpacing)) - 1; // One less row at the bottom

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.style.left = `${i * (blockSize + blockSpacing)}px`;
            block.style.top = `${j * (blockSize + blockSpacing)}px`;
            block.style.backgroundColor = getRandomColor();
            blocksContainer.appendChild(block);
            blocks.push(block);
        }
    }
    blockDirection = 1; // Reset block movement direction
}

// Get random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Shoot bullet
function shootBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${shipX + shipWidth / 2 - 2.5}px`;
    bullet.style.bottom = `${shipHeight}px`;
    bulletsContainer.appendChild(bullet);
    bullets.push(bullet);
}

// Move ship
function moveShip(direction) {
    shipX += direction * shipSpeed;
    if (shipX < 0) shipX = 0;
    if (shipX + shipWidth > window.innerWidth) shipX = window.innerWidth - shipWidth;
    ship.style.left = `${shipX}px`;
}

// Move bullets and check collisions
function updateBullets() {
    bullets.forEach((bullet, index) => {
        let bulletY = parseFloat(bullet.style.bottom) || 0;
        bulletY += 5;
        bullet.style.bottom = `${bulletY}px`;

        if (bulletY > window.innerHeight) {
            bulletsContainer.removeChild(bullet);
            bullets.splice(index, 1);
        }

        blocks.forEach((block, blockIndex) => {
            const blockRect = block.getBoundingClientRect();
            const bulletRect = bullet.getBoundingClientRect();
            if (
                bulletRect.left < blockRect.right &&
                bulletRect.right > blockRect.left &&
                bulletRect.top < blockRect.bottom &&
                bulletRect.bottom > blockRect.top
            ) {
                blocksContainer.removeChild(block);
                blocks.splice(blockIndex, 1);
                bulletsContainer.removeChild(bullet);
                bullets.splice(index, 1);
            }
        });
    });

    if (blocks.length === 0) {
        createBlocks(); // Create new blocks
    }
}

// Move blocks horizontally
function moveBlocks() {
    const blocks = document.querySelectorAll('.block');
    let atEdge = false;

    blocks.forEach(block => {
        let blockX = parseFloat(block.style.left) || 0;
        blockX += blockMoveSpeed * blockDirection;
        block.style.left = `${blockX}px`;
    });

    // Check if blocks need to change direction
    let firstBlock = document.querySelector('.block');
    let lastBlock = document.querySelectorAll('.block')[document.querySelectorAll('.block').length - 1];
    if (firstBlock && lastBlock) {
        let firstBlockX = parseFloat(firstBlock.style.left);
        let lastBlockX = parseFloat(lastBlock.style.left) + blockSize;

        if (firstBlockX <= -blockSize || lastBlockX >= blocksContainerWidth) {
            blockDirection *= -1;
            blocks.forEach(block => {
                let blockY = parseFloat(block.style.top);
                block.style.top = `${blockY + 10}px`; // Move blocks down slightly
            });
        }
    }
}

// Key event handlers
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveShip(-1);
    } else if (e.key === 'ArrowRight') {
        moveShip(1);
    } else if (e.key === ' ') {
        shootBullet();
    }
});

// Game loop
function gameLoop() {
    updateBullets();
    moveBlocks();
    requestAnimationFrame(gameLoop);
}

createBlocks();
gameLoop();

// Adjust blocks container on resize
window.addEventListener('resize', createBlocks);
