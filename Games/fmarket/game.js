// THIS IS A HORRIBLE SHORTCUT COPYCAT GAME FROM THE SEAGULL ONE
// EVEN FILE NAMES ARE DISTORTED, LIKE SEAGULL TURNED TO CASH REGISTER ETC
// BAD PRACTICE BUT YOU GOTTA DO WHAT YOU GOTTA DO IN QUICK PROTOTYPING

// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Load the background image from local source
const backgroundImage = new Image();
backgroundImage.src = 'fmarket.png';

// Function to draw the background
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

let score = 0;

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Olet kerännyt ' + score + ' tuotetta', 100, 30);
}

function drawCongrats() {
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText('Ostit kaiken!', 100, 200);
}

function drawGameover() {
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText('Otit jonkun toisen älypuhelimen!', 100, 200);
    soundEffectDog.play();
}

// Create an audio object for the background music
const backgroundMusic = new Audio('sea-and-seagull-wave-5932.mp3');
backgroundMusic.loop = true;
backgroundMusic.play();

class Example {
    constructor(x, y, imageUrl, text, replacementText, width = 70, height = 70) {
        this.x = x; 
        this.y = y; 
        this.width = width;  
        this.height = height; 
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

// Player image
const playerImage = new Image();
playerImage.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Simple_shopping_cart.svg';

// Player object
const player = {
    x: canvas.width / 2 - 50, 
    y: canvas.height / 2 - 50, 
    width: 150, 
    height: 100, 
    speed: 5,
    dx: 0,
    dy: 0
};

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Update the examples array with the new images and text
let examples_xy = [
    [200, 240], [30, 100], [10, 240], [100, 40], [100, 240],
    [580, 250], [240, 50], [500, 50], [400, 50], [300, 150], 
    [500, 250], [320, 80]
];

let examples_url_text = [
    ['https://upload.wikimedia.org/wikipedia/commons/b/b1/Cartoon_Smartphone_With_A_Lock_Key.svg', 'Älypuhelin', 'Smart phone'],
    ['https://upload.wikimedia.org/wikipedia/commons/0/06/Red_apple.svg', 'Omena', 'Apple'],
    ['https://upload.wikimedia.org/wikipedia/commons/b/bd/Tomato_by_yamachem.svg', 'Tomaatti', 'Tomato'],
    ['https://upload.wikimedia.org/wikipedia/commons/e/e1/Milk_carton_clip_art.png', 'Maito', 'Milk'],
    ['https://upload.wikimedia.org/wikipedia/commons/a/a7/Jean_victor_balin_bread.svg', 'Leipä', 'Bread'],
    ['https://upload.wikimedia.org/wikipedia/commons/b/be/Potato_var._Linda_HC1.JPG', 'Perunat', 'Potatoes'],
    ['https://upload.wikimedia.org/wikipedia/commons/c/c7/Finnish_maksalaatikko.JPG', 'Maksalaatikko', 'Liver casserole'],
    ['https://upload.wikimedia.org/wikipedia/commons/f/f5/Paprika.svg', 'Paprika', 'Red pepper'],
    ['https://upload.wikimedia.org/wikipedia/commons/9/93/Toilet_Paper.jpg', 'WC-paperi', 'Toilet paper'],
    ['https://upload.wikimedia.org/wikipedia/commons/f/f2/Apteekin_Salmiakki.jpg', 'Salmiakki', 'Salty liquorice'],
    ['https://upload.wikimedia.org/wikipedia/commons/2/20/Grolsch_Beer_Bottles.jpg', 'Olut', 'Beer'],
    ['https://upload.wikimedia.org/wikipedia/commons/4/45/Cheese.jpg', 'Juusto', 'Cheese']
];

const examples = examples_url_text.map((item, index) => 
    new Example(examples_xy[index][0], examples_xy[index][1], item[0], item[1], item[2])
);

// Set up event listeners
for (let example of examples) {
    example.setupEventListener(canvas, ctx);
}

function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

const soundEffect = new Audio('seagull-2-89447.mp3');
const soundEffectDog = new Audio('small-dog-barking-84707.mp3');

function checkCollisions() {
    for (let i = 0; i < examples.length; i++) {
        if (isColliding(player, examples[i])) {
            console.log('Collision detected with example:', i);
            if (examples[i].visible == true && i != 0) {
                score++;
                soundEffect.play();
            }
            examples[i].visible = false;
            if (score == examples.length - 1) { drawCongrats(); }
            if (i == 0) {
                drawGameover();
                soundEffectDog.play();
            }
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

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

function updateGame() {
    clearCanvas();
    drawBackground();
    drawPlayer();
    drawScore();
    for (let example of examples) {
        example.draw(ctx);
    }
    updatePlayer();
    requestAnimationFrame(updateGame);
    checkCollisions();
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

updateGame();
