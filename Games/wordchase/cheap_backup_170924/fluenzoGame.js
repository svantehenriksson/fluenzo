const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let characterImage = new Image();
characterImage.src = '718star.svg';  // Replace with the path to the star image

let character = { x: canvas.width / 2, y: canvas.height / 2, width: 50, height: 50 };
let bubbles = [];
let currentFinnishWord = '';
let currentEnglishTranslation = '';
let correctAnswer = '';
let score = 0;
let timeLeft = 20;
let gameOver = false;
let showTranslation = false;

let wordPairs = [
    { finnish: 'koira', english: 'dog', imageSrc: 'dog.gif' },
    { finnish: 'auto', english: 'car', imageSrc: 'car.svg' },
    { finnish: 'kissa', english: 'cat', imageSrc: 'cat.png' }
];

// Load images into a dictionary
let images = {};
wordPairs.forEach(pair => {
    let img = new Image();
    img.src = pair.imageSrc;
    images[pair.finnish] = img;
});

document.addEventListener('keydown', moveCharacter);
document.addEventListener('touchstart', handleTouch);

function moveCharacter(e) {
    if (e.key === 'ArrowUp') character.y -= 20;
    if (e.key === 'ArrowDown') character.y += 20;
    if (e.key === 'ArrowLeft') character.x -= 20;
    if (e.key === 'ArrowRight') character.x += 20;
}

function handleTouch(e) {
    let touch = e.touches[0];
    character.x = touch.clientX;
    character.y = touch.clientY;
}

function spawnBubbles() {
    let newWord = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    currentFinnishWord = newWord.finnish;
    currentEnglishTranslation = newWord.english;
    correctAnswer = newWord.finnish;

    document.getElementById('wordFrame').textContent = currentFinnishWord;

    bubbles = wordPairs.map(pair => {
        return {
            finnish: pair.finnish,
            x: Math.random() * (canvas.width - 80),
            y: Math.random() * (canvas.height - 80),
            radius: 40,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1,
            image: images[pair.finnish]
        };
    });
}

function updateBubbles() {
    bubbles.forEach(bubble => {
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;
        if (bubble.x + bubble.radius > canvas.width || bubble.x - bubble.radius < 0) bubble.dx *= -1;
        if (bubble.y + bubble.radius > canvas.height || bubble.y - bubble.radius < 0) bubble.dy *= -1;
    });
}

function checkCollision(bubble) {
    let dist = Math.sqrt(Math.pow(character.x - bubble.x, 2) + Math.pow(character.y - bubble.y, 2));
    return dist < bubble.radius + character.width / 2;
}

function drawCharacter() {
    // Draw the character image
    ctx.drawImage(characterImage, character.x, character.y, character.width, character.height);
}

function drawBubbles() {
    bubbles.forEach(bubble => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
        // Draw the image inside the bubble
        ctx.drawImage(bubble.image, bubble.x - bubble.radius, bubble.y - bubble.radius, 80, 80);
    });
}

function updateTimer() {
    if (!gameOver) {  // Only update the timer if the game isn't over
        timeLeft -= 1;
        document.getElementById('timer').textContent = 'Aikaa jäljellä - Time left: ' + timeLeft;
        if (timeLeft <= 0) {
            endGame();  // End the game when time runs out
        }
    }
}

function checkForCorrectAnswer() {
    bubbles.forEach(bubble => {
        if (checkCollision(bubble)) {
            if (bubble.finnish === correctAnswer) {
                score++;
                document.getElementById('score').textContent = 'Pisteet - Score: ' + score;

                // Set timeLeft to 20 - score, minimum of 5 seconds
                timeLeft = Math.max(20 - score, 5);
                resetGame();
            } else {
                endGame();
            }
        }
    });
}

function endGame() {
    gameOver = true;
    document.getElementById('gameOverPopup').style.display = 'block';
    document.getElementById('finalScore').textContent = 'Pisteet - Score: ' + score;
}

function resetGame() {
    spawnBubbles();
}

function gameLoop() {
    if (gameOver) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter();
    drawBubbles();
    updateBubbles();
    checkForCorrectAnswer();
    
    requestAnimationFrame(gameLoop);
}

function startGame() {
    spawnBubbles();
    timeLeft = 20 - score;
    document.getElementById('timer').textContent = 'Aikaa jäljellä - Time left: ' + timeLeft;
    setInterval(updateTimer, 1000);  // Update timer every second
    gameLoop();
}

startGame();
