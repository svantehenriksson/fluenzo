// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

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
    ctx.fillText('Lokki söi kaiken!', 100, 200);
}



function drawGameover() {
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText('Lokki söi koirankakkaa!', 100, 200);
    soundEffectDog.play();
}

// BACKGROUND MUSIC DOESN'T WORK FOR SOME REASON
// Create an audio object for the background music
const backgroundMusic = new Audio('sea-and-seagull-wave-5932.mp3');
backgroundMusic.loop = true;
backgroundMusic.play()


class Example {
    constructor(x, y, imageUrl, text, replacementText, width = 70, height = 70) {
        this.x = x;  // Position x on the canvas
        this.y = y;  // Position y on the canvas
        this.width = width;  // Width of the image
        this.height = height;  // Height of the image
        this.originalText = text;  // Store the original text
        this.text = text;  // Initial text to display
        this.replacementText = replacementText;  // Text to display on mouseover
        this.image = new Image();
        this.image.src = imageUrl;  // Image URL
        this.visible = true;
    }

    // Function to draw the image with text


    draw(ctx) {
        if (this.visible) { // Only draw if the object is visible
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '15px Arial';
        ctx.fillText(this.text, this.x + 10, this.y + this.height + 20);
        }
    }

    // Function to check if the mouse is over the object
    isMouseOver(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height + 20
        );
    }

    // Function to handle mouseover event
    handleMouseOver(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.text = this.replacementText;
        } else {
            this.text = this.originalText;
        }
    }

    // Function to set up the event listener
    setupEventListener(canvas, ctx) {
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            this.handleMouseOver(mouseX, mouseY);
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas
            this.draw(ctx);  // Redraw the object with updated text
        });
    }
}

// Load the player image
const playerImage = new Image();
playerImage.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Seagull_close.svg';

// Player object
const player = {
    x: canvas.width / 2 - 50, // Adjusted for image size
    y: canvas.height / 2 - 50, // Adjusted for image size
    width: 150, // Adjusted to match the image size
    height: 100, // Adjusted to match the image size
    speed: 5,
    dx: 0,
    dy: 0
};

// Function to draw the player
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}






// Initialize an empty array for starting to add example words and coordinates for their pictures
let examples_xy = [];

// Add rows directly
examples_xy[0] = [200, 240]; 
examples_xy[1] = [30, 100]; 
examples_xy[2] = [10, 240]; 
examples_xy[3] = [100, 40]; 
examples_xy[4] = [100, 240]; 
examples_xy[5] = [580, 250]; 
examples_xy[6] = [240, 50]; 
examples_xy[7] = [500, 50]; 
examples_xy[8] = [400, 50]; 
examples_xy[9] = [300, 150]; 
examples_xy[10] = [500, 250]; 
examples_xy[11] = [320, 80]; 


examples_url_text=[
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


const examples = [
    new Example(examples_xy[0][0], examples_xy[0][1], examples_url_text[0][0], examples_url_text[0][1], examples_url_text[0][2]),
    new Example(examples_xy[1][0], examples_xy[1][1], examples_url_text[1][0], examples_url_text[1][1], examples_url_text[1][2]),
    new Example(examples_xy[2][0], examples_xy[2][1], examples_url_text[2][0], examples_url_text[2][1], examples_url_text[2][2]),
    new Example(examples_xy[3][0], examples_xy[3][1], examples_url_text[3][0], examples_url_text[3][1], examples_url_text[3][2]),
    new Example(examples_xy[4][0], examples_xy[4][1], examples_url_text[4][0], examples_url_text[4][1], examples_url_text[4][2]),
    new Example(examples_xy[5][0], examples_xy[5][1], examples_url_text[5][0], examples_url_text[5][1], examples_url_text[5][2]),
    new Example(examples_xy[6][0], examples_xy[6][1], examples_url_text[6][0], examples_url_text[6][1], examples_url_text[6][2]),
    new Example(examples_xy[7][0], examples_xy[7][1], examples_url_text[7][0], examples_url_text[7][1], examples_url_text[7][2]),
    new Example(examples_xy[8][0], examples_xy[8][1], examples_url_text[8][0], examples_url_text[8][1], examples_url_text[8][2]),
    new Example(examples_xy[9][0], examples_xy[9][1], examples_url_text[9][0], examples_url_text[9][1], examples_url_text[9][2]),
    new Example(examples_xy[10][0], examples_xy[10][1], examples_url_text[10][0], examples_url_text[10][1], examples_url_text[10][2]),
    new Example(examples_xy[11][0], examples_xy[11][1], examples_url_text[11][0], examples_url_text[11][1], examples_url_text[11][2]),

];


/*

// Create an example object
const example0 = new Example(
    examples_xy[0][0], examples_xy[0][1], 
    'https://upload.wikimedia.org/wikipedia/commons/4/43/Makkara_sinapilla.jpg', 
    'Makkara sinapilla', 
    'Sausage with mustard'
);

example0.setupEventListener(canvas, ctx);



const example1 = new Example(
    examples_xy[1][0], examples_xy[1][1], 
    'https://upload.wikimedia.org/wikipedia/commons/2/24/551-soft-ice-cream-1.svg', 
    'Jäätelö', 
    'Ice cream'
);



const example2 = new Example(
    examples_xy[2][0], examples_xy[2][1], 
    'https://upload.wikimedia.org/wikipedia/commons/f/f3/Pepperoni_pizza_slice.svg', 
    'Pizzapala', 
    'Pizza slice (pizza piece)'
);

const example3 = new Example(
    examples_xy[3][0], examples_xy[3][1], 
    'https://upload.wikimedia.org/wikipedia/commons/9/98/Fillet_steak_%2828899685773%29.jpg', 
    'Sisäfilepihvi', 
    'Fillet steak (inner fillet steak)'
);

const example4 = new Example(
    examples_xy[4][0], examples_xy[4][1], 
    'https://upload.wikimedia.org/wikipedia/commons/a/af/Vegan_Burger_%285841255378%29.jpg', 
    'Vegaanihampurilainen', 
    'Vegan burger'
);





// Set up event listeners:
example0.setupEventListener(canvas, ctx);
example1.setupEventListener(canvas, ctx);
example2.setupEventListener(canvas, ctx);
example3.setupEventListener(canvas, ctx);
example4.setupEventListener(canvas, ctx);

*/


// Set up event listeners, CHANGE TO MORE STYLISH WITH LOOP:

for (let example of examples) {
    example.setupEventListener(canvas, ctx); // Assuming each Example object has a draw() method
}

/*
examples[0].setupEventListener(canvas, ctx);
examples[1].setupEventListener(canvas, ctx);
examples[2].setupEventListener(canvas, ctx);
examples[3].setupEventListener(canvas, ctx);
examples[4].setupEventListener(canvas, ctx);
examples[5].setupEventListener(canvas, ctx);
examples[6].setupEventListener(canvas, ctx);
examples[7].setupEventListener(canvas, ctx);
*/

function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}
/*
// Function to check for collisions and take action
function checkCollisions() {
    if (isColliding(player, example1)) {
            console.log('Collision detected with example 0');
            // You can handle the collision here (e.g., stop movement, reduce health, etc.)
            // Create an audio object for the sound effect
            const soundEffect = new Audio('seagull-2-89447.mp3');
            // Play the sound effect
            soundEffect.play();
        }
    }
*/

// Create an audio object for the sound effect
const soundEffect = new Audio('seagull-2-89447.mp3');
const soundEffectDog = new Audio('small-dog-barking-84707.mp3');

// Function to check for collisions and take action
function checkCollisions() {
    for (let i = 0; i < examples.length; i++) {
        if (isColliding(player, examples[i])) {
            console.log('Collision detected with example:', i);
            // You can handle the collision here (e.g., stop movement, reduce health, etc.)
            if (examples[i].visible == true && i!=0) {
                score++;
                soundEffect.play();}
            examples[i].visible=false;
            if (score == examples.length-1) {drawCongrats();}
            if (i == 0) {
                drawGameover();
                soundEffectDog.play();
            }
        }
    }
}




// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update player position
function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Prevent player from going off the canvas
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Function to handle key down events
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

// Function to handle key up events
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



// Function to update the game
function updateGame() {
    clearCanvas();
    drawBackground(); // Draw the background first
    drawPlayer();
    drawScore();
    /*example0.draw(ctx);
    example1.draw(ctx);
    example2.draw(ctx);
    example3.draw(ctx);
    example4.draw(ctx); */
    // Loop over the examples array and draw each Example object
    for (let example of examples) {
        example.draw(ctx); // Assuming each Example object has a draw() method
    }
    updatePlayer();
    requestAnimationFrame(updateGame);
    checkCollisions();
}

// Event listeners for keydown and keyup
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Start the game loop
updateGame();
