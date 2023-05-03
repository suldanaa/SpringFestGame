//board
var blockSize = 25;
var rows = 15;
var cols = 15;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
//food
var foodX;
var foodY;
var score = 0;
var gameOver = false;

var speed = 2;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

// function changeSpeed(incOrDec) {

//     if (incOrDec) {
//         speed += 2;
//     } else {
//         if (speed <= 2) {
//             speed = 2;
//             return;
//         } else {
//             speed -= 2;
//         }
//     }
// }

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "black";//changes color of the board
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red"; //food
    context.fillRect(foodX, foodY, blockSize / 2, blockSize / 2);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        var audio = document.getElementById('eatAudio');
        audio.play();
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime"; //changes color of the snake
    snakeX += velocityX * blockSize / speed; //controls speed
    snakeY += velocityY * blockSize / speed;
    // document.getElementById("speed").innerHTML = speed + " (lower is faster)";
    context.fillRect(snakeX, snakeY, blockSize / 2, blockSize / 2);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize / 2, blockSize / 2);
    }

    //game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        var audio = document.getElementById('failAudio');
        audio.play();
        audio.onended = function () {
            alert("[Game Over] Reason: Out of bounds.\nFinal Score: " + score);
            location.reload();
        };


    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("[Game Over] Reason: Connected with yourself.\nFinal Score: " + score);
            location.reload();
        }
    }
}

//DIRECTIONS
function goUp() {
    velocityX = 0;
    velocityY = -1;
}
function goDown() {
    velocityX = 0;
    velocityY = 1;
}
function goLeft() {
    velocityX = -1;
    velocityY = 0;
}
function goRight() {
    velocityX = 1;
    velocityY = 0;
}

//KEYBOARD
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        goUp();
    }
    else if (e.code == "ArrowDown" && velocityY != 1) {
        goDown();
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        goLeft();
    }
    else if (e.code == "ArrowRight" && velocityX != 1) {
        goRight();
    }
}
function placeFood() {
    //adjust so it doesn't touch the rim
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}