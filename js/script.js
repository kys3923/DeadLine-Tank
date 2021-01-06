const canvas = document.getElementById("gameDisplay");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const tankWidth = 50;
const tankHeight = 50;
let allyTankX = 0;
const allyTankMoveSPD = 1.5;
let enemyTankX = 0;
let tankLeftPrssd = false;
let tankRightPrssd = false;
let allyCannonAngle = Math.PI / 180;
let enemyCannonAngle = Math.PI / 180; 
const cannonAngleDIF = Math.PI / 60;
let cannonLength = tankWidth * Math.sqrt(2);
let enemyArray = [];
let wind = 1.5;
let fireSound = new Audio("sound/roket.mp3");
let hitSound = new Audio("sound/crash.mp3");


const uiCanvas = document.getElementById("navDisplay")
const uictx = uiCanvas.getContext("2d")
let moveGauge = 500;
let moveMinus = 20;
let enemySPD = 3;



// shooting mechanism
let isCharging = false;
let isFired = false;
let isHit = false;
let powGauge = Math.PI;
const gaugeDIF = Math.PI / 60;
const gaugeRadius = 30;
let cannonPower;
let cannonRadius = 5;
const gravityAccel = 0.098;
let cannonMx;
let cannonMy;
// shoots at a certain wind factor, anagle, power
// calculate graviti factor
// on hit, disable  trajectory
// event lister reset on spacebar


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

function cannon(sx, sy, rad, stylestring) {
    this.sx = sx;
    this.sy = sy;
    this.rad = rad;
    this.draw = drawCannon;
    this.moveit = moveCannon;
    this.fillstyle = stylestring;
}

function drawCannon() {
    ctx.fillstyle = this.fillstyle;
    ctx.beginPath();
    ctx.arc(this.sx, this.sy, this.rad, 0, Math.PI*2, true);
    ctx.fill();
}

function moveCannon(dx, dy) {
    this.sx += dx;
    this.sy += dy;
}

function gameSetting1() {
    if((!everything.length == 0) ||(!enemyArry.length == 0)){
		enemyArry.splice(0,enemyArry.length);
		everything.splice(0,everything.length);
    }
    
    everything = [];
    evemyArray = [];
    moveGauge = 500;
    enemySPD = 3;
    cannonVector = 1;
    cannonFirst = 32;
    cannonAngle = 45;
    cannonVo = 1;
    radi = 1;

    player01 = new player(0, 430, 32, 25, pIMG[0]);
    enemy01 = new enemy(910, 430, 34, 25, eIMG[0]);
    cannon01 = new cannon(player01.x, player.y, 3, "blue");

    everything.push(player01);
    everything.push(cannon01);

    enemyArray.push(enemy01);
}

function fireCannon() {
    fireSound.currentTime = 0.8;
    fireSound.play();

    let angle = cannonAngle;
    let outofCannon = cannonVo;
    let angleRadian = angle * Math.PI/180;
    horizonatalVel1 = cannonVector * outofCannon * Math.cos(angleRadian);
    verticalVel1 = outofCannon * Math.sin(angleRadian);

}

// let backgroundImage = new Image();
// backgroundImage.src = "img/background.png"

// ctx.drawImage(backgroundImage, 0, 0, 960, 480)

// let allyTank = new allyTankDrawing(0, 430, 50, 50)
// let enemyTank = new enemyTankDrawing(910, 430, 50, 50)

// // after game selection
// let gameStart = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     if (enemyTank.alive) {
//         enemyTank.render()
//         // detectHit()
//     }
//     if (isCharging && !isFired) {
//         if (powGauge < Math.PI * 2) {
//             powGauge += gaugeDIF;
//         }
//         powerGaugeDrawing();
//     }
//     if (!isFired) {
//         cannonX = allyTankX + tankWidth * Math.cos(cannonAngle);
//         cannonY = height - tankHeight * Math.sin(cannonAngle)
//     } else {
//         cannonMy -= gravityAccel;
//         cannonX = (allyTankX + tankWidth * Math.cos(cannonAngle)) + cannonMx;
//         cannony = (height - tankHeight * Math.sin(cannonAngle)) - cannonMy;
//     }
//     allyTank.render()
//     missleDrawing();
    // set timer
    // set wind
    // draw map


// moving the tank
let movementHandler = (e) => {
    // right arrow
    if (e.keyCode == "39") {
        allyTank.x += allyTankMoveSPD
    }
    // left arrow
    else if (e.keyCode == "37") {
        allyTank.x -= allyTankMoveSPD
    }
    // arrow up
    else if (e.keyCode == "38" && allyCannonAngle <= Math.PI) {
        allyCannonAngle += cannonAngleDIF
    }
    // // arrow down
    else if (e.keyCode == "40" && allyCannonAngle >= 0) {
        allyCannonAngle -= cannonAngleDIF
    }
    // // space bar
    else if (e.keyCode == "32" && !isFired) {
        isCharging = true;
    }
    else {
        console.log("Wrong Key Pressed")
    }
}

let keyupHandler = (e) => {
    if(e.keyCode == "32" && !isFired) {
        isCharging = false;
        isFired = true;
        cannonPower = powGauge * 1.6;
        cannonMx = cannonPower * Math.cos(cannonAngle);
        cannonMy = cannonPower * Math.sin(cannonAngle);
        powGauge = Math.PI;
    }
}

// function gameflow() {
//     Intro()
//         start button
//         display tutorial
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