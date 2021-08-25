const gameBoard = document.querySelector('.game-board')
const context = gameBoard.getContext("2d")
const boardSource = new Image();
boardSource.src = "image/board.png";
const foodSource = new Image();
foodSource.src = "image/food.png";
const snakeHeadSource = new Image();
const box = 32; 
let score = 0;
let direction; 
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
}
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if(event.keyCode == 37 && direction != "right")
        direction = "left"
    if(event.keyCode == 38 && direction != "down")
        direction = "up"
    if(event.keyCode == 39 && direction != "left")
        direction = "right"
    if(event.keyCode == 40 && direction != "up")
        direction = "down"
}

function drawEverything() {
    context.drawImage(boardSource, 0, 0);
    context.drawImage(foodSource, food.x, food.y)
    for (let i = 0; i < snake.length; i++) {
        if (direction == "left") {
            context.drawImage(snakeHeadSource, snake[i].x, snake[i].y)
            snakeHeadSource.src = "image/headLeft.png"
        }
        if (direction == "up") {
            context.drawImage(snakeHeadSource, snake[i].x, snake[i].y)
            snakeHeadSource.src = "image/headUp.png"
        }
        if (direction == "right") {
            context.drawImage(snakeHeadSource, snake[i].x, snake[i].y)
            snakeHeadSource.src = "image/headRight.png"
        }
        if (direction == "down") {
            context.drawImage(snakeHeadSource, snake[i].x, snake[i].y)
            snakeHeadSource.src = "image/headDown.png"
        }
    }
    for (let j = 1; j < snake.length; j++) {
        context.fillStyle = "#a1c52e";
		context.fillRect(snake[j].x, snake[j].y, box, box);
        
    }
    context.fillStyle = "white";
	context.font = "50px Arial";
	context.fillText(score, box * 2.1, box * 1.7);
}

function moveSnake() {
    let snakeX = snake[0].x
        snakeY = snake[0].y
    if (direction == "left") 
        snakeX -= box
    if (direction == "up") 
        snakeY -= box
    if (direction == "right") 
        snakeX += box        
    if (direction == "down") 
        snakeY += box
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

function eatFood() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        }
        score++
    } else{
        snake.pop();
    }
}

function smashWall() {
    if (snake[0].x < box || snake[0].x > box * 17 
        || snake[0].y < box * 3 || snake[0].y > box * 17) {
            clearInterval(gameInterval)
    }
}

function smashBody(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (snake[0].x == arr[i].x && snake[0].y == arr[i].y) {
            clearInterval(gameInterval)
        }
        
    }
}

function game() {
    drawEverything()
    moveSnake()
    eatFood()
    smashBody(snake)
    smashWall()
}

let gameInterval = setInterval(game, 130)
