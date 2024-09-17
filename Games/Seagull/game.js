// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Detect if the user is on a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Set canvas size based on whether the user is on mobile or not
if (isMobile) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
} else {
    canvas.width = 800;
    canvas.height = 600;
}

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'https://upload.wikimedia.org/wikipedia/commons/4/45/Helsinki_%2823883925315%29.jpg';

// Function to draw the background
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

let score = 0;

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Nälkäinen lokki on syönyt ' + score + ' kertaa', 100, 30);
}

function drawCongrats() {
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText('Lokki söi kaiken!', canvas.width / 4, canvas.height / 2);
}

function drawGameover() {
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText('Lokki söi koirankakkaa!', canvas.width / 4, canvas.height / 2);
    soundEffectDog.play();
}

// Create an audio object for the background music
const backgroundMusic = new Audio('sea-and-seagull-wave-5932.mp3');
backgroundMusic.loop = true;
backgroundMusic.play()

class Example {
    constructor(x, y, imageUrl, text, replacementText, width = 70, height = 70) {
        this.x = x;
        this.y = y;
        this.width = isMobile ? width * 0.8 : width; // Reduce size for mobile
        this.height = isMobile ? height * 0.8 : height;
        this.originalText = text;
        this.text = text;
        this.replacementText = replacementText;
        this.image = new Image();
        this.image.src = imageUrl;
        this.visible = true;
    }

    draw(ctx) {
        if (this.visible) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'black';
            ctx.font = '15px Arial';
            ctx.fillText(this.text, this.x + 10, this.y + this.height + 20);
        }
    }

    isMouseOver(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height + 20
        );
    }

    handleMouseOver(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.text = this.replacementText;
        } else {
            this.text = this.originalText;
        }
    }

    setupEventListener(canvas, ctx) {
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            this.handleMouseOver(mouseX, mouseY);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.draw(ctx);
        });
    }
}

// Load the player image
const playerImage = new Image();
playerImage.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Seagull_close.svg';

// Player object with mobile-friendly adjustments
const player = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50,
    width: isMobile ? 100 : 150,
    height: isMobile ? 70 : 100,
    speed: isMobile ? 3 : 5,
    dx: 0,
    dy: 0
};

// Function to draw the player
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Example coordinates and image URLs with text
const examples_xy = [
    [200, 240], [30, 100], [10, 240], [100, 40], [100, 240], [580, 250], 
    [240, 50], [500, 50], [400, 50], [300, 150], [500, 250], [320, 80]
];

// Adjust example positions for mobile and ensure they are within bounds
if (isMobile) {
    const maxWidth = canvas.width - 80; // Leave space for item width
    const maxHeight = canvas.height - 80; // Leave space for item height

    for (let i = 0; i < examples_xy.length; i++) {
        // If x coordinate is out of bounds, assign a random x between 0 and maxWidth
        if (examples_xy[i][0] > maxWidth || examples_xy[i][0] < 0) {
            examples_xy[i][0] = Math.random() * maxWidth; // Randomize x within allowed bounds
        }

        // If y coordinate is out of bounds, assign a random y between 0 and maxHeight
        if (examples_xy[i][1] > maxHeight || examples_xy[i][1] < 0) {
            examples_xy[i][1] = Math.random() * maxHeight; // Randomize y within allowed bounds
        }
    }
}

const examples_url_text = [
    ['https://upload.wikimedia.org/wikipedia/commons/4/45/Dog_feces.jpg', 'Koirankakka', 'Dog poo'],
    ['https://upload.wikimedia.org/wikipedia/commons/4/43/Makkara_sinapilla.jpg', 'Makkara sinapilla', 'Sausage with mustard'],
    ['https://upload.wikimedia.org/wikipedia/commons/2/24/551-soft-ice-cream-1.svg', 'Jäätelö', 'Ice cream'],
    ['https://upload.wikimedia.org/wikipedia/commons/f/f3/Pepperoni_pizza_slice.svg', 'Pizzapala', 'Pizza slice (pizza piece)'],
    ['https://upload.wikimedia.org/wikipedia/commons/9/98/Fillet_steak_%2828899685773%29.jpg', 'Sisäfilepihvi', 'Fillet steak (inner fillet steak)'],
    ['https://upload.wikimedia.org/wikipedia/commons/a/af/Vegan_Burger_%285841255378%29.jpg', 'Vegaanihampurilainen', 'Vegan burger'],
    ['https://upload.wikimedia.org/wikipedia/commons/0/06/Red_apple.svg', 'Omena', 'Apple'],
    ['https://upload.wikimedia.org/wikipedia/commons/e/e1/Milk_carton_clip_art.png', 'Maito', 'Milk'],
    ['https://upload.wikimedia.org/wikipedia/commons/b/be/Potato_var._Linda_HC1.JPG', 'Perunat', 'Potatoes'],
    ['https://upload.wikimedia.org/wikipedia/commons/b/bd/Tomato_by_yamachem.svg', 'Tomaatti', 'Tomato'],
    ['https://upload.wikimedia.org/wikipedia/commons/5/5f/Cucumber1.jpg', 'Kurkkuviipale', 'Cucumber slice'],
    ['https://upload.wikimedia.org/wikipedia/commons/a/a7/Jean_victor_balin_bread.svg', 'Leipä', 'Bread']
];

// Create Example objects
const examples = examples_xy.map((coords, i) => 
    new Example(coords[0], coords[1], examples_url_text[i][0], examples_url_text[i][1], examples_url_text[i][2])
);

// Touch movement controls for mobile
if (isMobile) {
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);

    let touchX, touchY;

    function handleTouchStart(event) {
        const touch = event.touches[0];
        touchX = touch.clientX;
        touchY = touch.clientY;
    }

    function handleTouchMove(event) {
        const touch = event.touches[0];
        const diffX = touch.clientX - touchX;
        const diffY = touch.clientY - touchY;

        player.x += diffX * 0.1;
        player.y += diffY * 0.1;

        touchX = touch.clientX;
        touchY = touch.clientY;
    }
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update player position
function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Keydown event listener for non-mobile
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        player.dy = player.speed;
    }
}

// Keyup event listener for non-mobile
function keyUp(e) {
    if (
        e.key === 'ArrowRight' || e.key === 'Right' ||
        e.key === 'ArrowLeft' || e.key === 'Left' ||
        e.key === 'ArrowUp' || e.key === 'Up' ||
        e.key === 'ArrowDown' || e.key === 'Down'
    ) {
        player.dx = 0;
        player.dy = 0;
    }
}

// Function to check for collisions and take action
function checkCollisions() {
    for (let i = 0; i < examples.length; i++) {
        if (isColliding(player, examples[i])) {
            console.log('Collision detected with example:', i);
            if (examples[i].visible == true && i != 0) {
                score++;
                soundEffect.play();
            }
            examples[i].visible = false;
            if (score == examples.length - 1) {
                drawCongrats();
            }
            if (i == 0) {
                drawGameover();
                soundEffectDog.play();
            }
        }
    }
}

// Function to update the game
function updateGame() {
    clearCanvas();
    drawBackground();
    drawPlayer();
    drawScore();

    for (let example of examples) {
        example.draw(ctx);
    }

    updatePlayer();
    checkCollisions();
    requestAnimationFrame(updateGame);
}

// Event listeners for keydown and keyup (non-mobile devices)
if (!isMobile) {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

// Start the game loop
updateGame();

// Helper function to detect collision between player and examples
function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Create sound effects
const soundEffect = new Audio('seagull-2-89447.mp3');
const soundEffectDog = new Audio('small-dog-barking-84707.mp3');
