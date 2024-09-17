const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

let characterImage = new Image();
characterImage.src = 'character.png';

let character = { x: canvas.width / 2, y: canvas.height / 2, width: isMobile ? 40 : 50, height: isMobile ? 40 : 50 };
let bubbles = [];
let currentFinnishWord = '';
let currentEnglishTranslation = '';
let correctAnswer = '';
let score = 0;
let timeLeft = 20;
let gameOver = false;

// Show translation on mouseover or click for the Finnish word
const wordFrame = document.getElementById('wordFrame');
wordFrame.addEventListener('mouseover', showTranslation);
wordFrame.addEventListener('mouseout', hideTranslation);
wordFrame.addEventListener('click', toggleTranslation);

// Function to show translation on hover
function showTranslation() {
    wordFrame.textContent = currentEnglishTranslation;
}

// Function to hide translation after hover
function hideTranslation() {
    wordFrame.textContent = currentFinnishWord;
}

// Toggle between Finnish word and translation on click
function toggleTranslation() {
    if (wordFrame.textContent === currentFinnishWord) {
        wordFrame.textContent = currentEnglishTranslation;
    } else {
        wordFrame.textContent = currentFinnishWord;
    }
}

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

// Helper to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function spawnBubbles() {
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    const correctPair = wordPairs[randomIndex];
    currentFinnishWord = correctPair.finnish;
    currentEnglishTranslation = correctPair.english;
    correctAnswer = correctPair.finnish;
    wordFrame.textContent = currentFinnishWord;

    // Select two random wrong answers
    let otherPairs = wordPairs.filter(pair => pair.finnish !== correctPair.finnish);
    shuffleArray(otherPairs);
    let wrongAnswers = otherPairs.slice(0, 2);

    let bubbleSize = isMobile ? 50 : 80;
    bubbles = shuffleArray([correctPair, ...wrongAnswers]).map(pair => {
        return {
            finnish: pair.finnish,
            x: Math.random() * (canvas.width - bubbleSize),
            y: Math.random() * (canvas.height - bubbleSize),
            radius: bubbleSize / 2,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1,
            image: new Image()
        };
    });

    bubbles.forEach(bubble => {
        bubble.image.src = wordImages[bubble.finnish];
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
    ctx.drawImage(characterImage, character.x, character.y, character.width, character.height);
}

function drawBubbles() {
    bubbles.forEach(bubble => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
        ctx.drawImage(bubble.image, bubble.x - bubble.radius, bubble.y - bubble.radius, bubble.radius * 2, bubble.radius * 2);
    });
}

function updateTimer() {
    if (!gameOver) {
        timeLeft -= 1;
        document.getElementById('timer').textContent = 'Aikaa jäljellä - Time left: ' + timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }
}

function checkForCorrectAnswer() {
    bubbles.forEach(bubble => {
        if (checkCollision(bubble)) {
            if (bubble.finnish === correctAnswer) {
                score++;
                document.getElementById('score').textContent = 'Pisteet - Score: ' + score;
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
    setInterval(updateTimer, 1000);
    gameLoop();
}

startGame();
