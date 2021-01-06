// function gameflow() {
//     gameSetting1()
//         playerturn
//         draw player
//         draw ui
//         draw enemy
//         set timer
//         bgsound
//         addEventListener
//     checkwin
//         check all enemydead
//         display turn
//         display gameover
//         display win
//     enemyturn
//         enemymove     
// }

const canvas = document.getElementById("gameDisplay");
const ctx = canvas.getContext("2d");
const uiCanvas = document.getElementById("navDisplay")
const uictx = uiCanvas.getContext("2d");
const cwidth = canvas.width;
const cheight = canvas.height;
const uiwidth = uiCanvas.width;
const uiheight = uiCanvas.height;
const body = document.querySelector("body");

let startBgImg = new Image();
startBgImg.src = "img/introbg.png";
let startUIimg = new Image();
startUIimg.src = "img/navibg.png";
let gameBgImg = new Image();
gameBgImg.src = "img/background.png"
let gameUIimg = new Image();
gameUIimg.src = "img/naviplaybg.png"

// Intro Game Set UP
function startBtn(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    startBtnOn = true;
    this.render = function() {
        uictx.fillStyle = this.color;
        uictx.fillRect(this.x, this.y, this.width, this.height)
        uictx.fillStyle = "white"
        uictx.font = "30px helvetica"
        uictx.fillText("GAME START", uiwidth/2 - 95, uiheight/2 + 10)
    }
}

let startButton = new startBtn(uiwidth/2 - 125, uiheight/2 - 40, 250, 80, "rgb(82, 96, 46)")
let buttonClick = () => {

}

// INSERT SOUND
function intro() {
    ctx.drawImage(startBgImg, 0, 0, cwidth, cheight)
    uictx.drawImage(startUIimg, 0, 0, uiwidth, uiheight)
    startButton.render();
};

uiCanvas.addEventListener("click", (event) => {
    if (
        event.offsetX >= 360 && event.offsetX <= 605 &&
        event.offsetY >= 47 && event.offsetY <= 122
    ) {
        gameSetup();
    }
});
// Intro Complete

// Delete intro

function removeRct() {
    uiCanvas.removeEventListener("click", (event));
    uictx.clearRect(0, 0, uiwidth, uiheight);
};

// drawing elements

function gameSetup() {
    removeRct();
    ctx.drawImage(gameBgImg, 0, 0, cwidth, cheight);
    uictx.drawImage(gameUIimg, 0, 0, uiwidth, uiheight)
    playerTurn();
};

// drawing player
function player(x, y, width, height, pic) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
    this.img = new Image();
    this.img.src = pic;
    this.moveit = movePlayer;
    this.draw = drawPlayer;
}
let pIMG=["img/player_right.gif"]
function drawPlayer() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}
function movePlayer(dx, dy) { this.x += dx; this.y += dy; }

// drawing enemy
let eIMG=["img/ermy0.gif"]
function enemy(x, y, width, height, pic) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
    this.img = new Image();
    this.img.src = pic;
    this.moveit = moveEnemy;
    this.draw = drawEnemy;
}

function drawEnemy() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}
function moveEnemy(dx, dy) { this.x += dx; this.y += dy; }

let cannonVector = 1;
let cannonFirst = 32;
let cannonAngle = 45;
let cannonVo = 1;
let radi = 1;

function playerTurn() {
    console.log("okay up to here");
}