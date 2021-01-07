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
        uictx.shadowColor = "black"
        uictx.shadowBlur = 15;
        uictx.fillStyle = this.color;
        uictx.fillRect(this.x, this.y, this.width, this.height)
        uictx.fillStyle = "white"
        uictx.font = "30px helvetica"
        uictx.fillText("GAME START", uiwidth/2 - 95, uiheight/2 + 10)
        
    }
}

let startButton = new startBtn(uiwidth/2 - 125, uiheight/2 - 40, 250, 80, "rgb(82, 96, 46)")


// INSERT SOUND
function intro() {
    removeRct();
    ctx.drawImage(startBgImg, 0, 0, cwidth, cheight)
    uictx.drawImage(startUIimg, 0, 0, uiwidth, uiheight)
    startButton.render();
};

uiCanvas.addEventListener("click", (event) => {
    if (
        event.offsetX >= 360 && event.offsetX <= 605 &&
        event.offsetY >= 47 && event.offsetY <= 122
    ) {
        playerTurn = true;
        gameSetup();
    }
});
// Intro Complete

// Delete intro

function removeRct() {
    uiCanvas.removeEventListener("click", (event));
    uictx.clearRect(0, 0, uiwidth, uiheight);
};

// stating elements
let everything = [];
let enemyArray = [];
let wind = 1.5;
let DO1 = Math.PI / 90;
let fireSound = new Audio("sound/roket.mp3");
let dtEnemy = new Audio("sound/crash.mp3");

let player01;
let enemy01;
let enemy02;
let enemy03;
let enemy04;
let cannonBall;
let playerTurn = false;

let moveGauge = 275;
let moveMinus = 10;
let enemySPD = 3;

let cannonVector = 1;
let cannonFirst = 32;
let cannonAngle = 45;
let cannonVo = 1;
let radi = 1;
let enemyDo = 0;
let tid;
let enemytid;
let outofCannon;
let horizonatalVel1;
let horizonatalVel2;
let verticalVel1;
let verticalVel2;
let graviti = 2;
let cannonRadius = 10;
let wave = 1;
let time = 10;

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
let eIMG=["img/enemy02.png", "img/enemy01.png", "img/ermy0.gif", "img/ermy2.gif"]
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
function moveEnemy(dx, dy) { this.x += dx; this.y += dy; };


// drawing deadline

function drawDL(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color
    this.render = function() {
        ctx.fillStyle = "white"
        ctx.font = "bold 30px helvetica"
        ctx.fillText("← DEFENSE LINE", 320, 50)
        ctx.beginPath();
        ctx.strokeStyle = this.color
        ctx.lineWidth = 5;
        ctx.setLineDash([15, 15]);
        ctx.moveTo(300, 0);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

let deadLine = new drawDL(300, 480, "red")


// drawing cannonball
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


function waveOne() {
    if((!everything.length == 0) || (!enemyArray.length == 0)) {
        enemyArray.splice(0, enemyArray.length);
        everything.splice(0, everything.length);
    };

    everything = [];
    enemyArray = [];
    moveGauge = 275;
    enemySPD = 3;
    cannonVector = 1;
    cannonFirst = 32;
    cannonAngle = 45;
    cannonVo = 1;
    enemyDo = 0;
    radi = 1;
    time = 10;
    // wave = 1
    playerTurn = true;

    player01 = new player(20, 400, 32, 25, pIMG[0]);
    cannonBall = new cannon(player01.x + cannonFirst, player01.y, 3, "red");
    enemy01 = new enemy(800, 400, 42, 38, eIMG[0]);
    enemy02 = new enemy(1200, 400, 52, 32, eIMG[1]);

    everything.push(player01);
    everything.push(cannonBall);
    enemyArray.push(enemy01);
    enemyArray.push(enemy02);
    
};

function waveTwo() {
    if((!everything.length == 0) || (!enemyArray.length == 0)) {
        enemyArray.splice(0, enemyArray.length);
        everything.splice(0, everything.length);
    };

    everything = [];
    enemyArray = [];
    moveGauge = 275;
    enemySPD = 3;
    cannonVector = 1;
    cannonFirst = 32;
    cannonAngle = 45;
    cannonVo = 1;
    enemyDo = 0;
    radi = 1;
    time = 10;
    wave = 2;
    playerTurn = true;

    player01 = new player(20, 400, 32, 25, pIMG[0]);
    cannonBall = new cannon(player01.x + cannonFirst, player01.y, 3, "red");
    enemy01 = new enemy(800, 400, 42, 38, eIMG[0]);
    enemy02 = new enemy(1200, 400, 52, 32, eIMG[1]);
    enemy03 = new enemy(0, 0, 34, 25, eIMG[2]);

    everything.push(player01);
    everything.push(cannonBall);
    enemyArray.push(enemy01);
    enemyArray.push(enemy02);
    enemyArray.push(enemy03);
    
};

function finalWave() {
    if((!everything.length == 0) || (!enemyArray.length == 0)) {
        enemyArray.splice(0, enemyArray.length);
        everything.splice(0, everything.length);
    };

    everything = [];
    enemyArray = [];
    moveGauge = 275;
    enemySPD = 3;
    cannonVector = 1;
    cannonFirst = 32;
    cannonAngle = 45;
    cannonVo = 1;
    enemyDo = 0;
    radi = 1;
    time = 10;
    wave = 3;
    playerTurn = true;

    player01 = new player(20, 400, 32, 25, pIMG[0]);
    cannonBall = new cannon(player01.x + cannonFirst, player01.y, 3, "red");
    enemy01 = new enemy(800, 400, 42, 38, eIMG[0]);
    enemy02 = new enemy(1200, 400, 52, 32, eIMG[1]);
    enemy03 = new enemy(0, 0, 34, 25, eIMG[2]);
    enemy04 = new enemy(0, 0, 42, 30, eIMG[3]);

    everything.push(player01);
    everything.push(cannonBall);
    enemyArray.push(enemy01);
    enemyArray.push(enemy02);
    enemyArray.push(enemy03);
    enemyArray.push(enemy04);

};


// key listners
function movementHandler(event) {
    let keyCode;
    if(event == null) {
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    }else {
        keyCode = event.keyCode;
    }
    switch(keyCode){
        // left arrow
        case 37:
                player01.img.src = pIMG[0];
                if(moveGauge > 0) {
                    player01.moveit(-5, 0);
                    moveGauge = moveGauge - moveMinus;
                }
                
                if(player01.x < 0) {player01.x = 0;};
                
                // uiDraw();
            break;
        // right arrow
        case 39:
                player01.img.src = pIMG[0];
                if(moveGauge > 0) {
                    player01.moveit(5, 0);
                    moveGauge = moveGauge - moveMinus;
                }
                
                if(player01.x + player01.width > 300) {
                    let farRight = player01.x + player01.width;
                    farRight = 300;
                };
                // uiDraw();
            break;
        // arrow up
        case 38:
                if(cannonAngle >= 90) {
                    cannonAngle = 90;
                } else if(cannonAngle <= -1) {
                    cannonAngle = 0;
                } else {
                    cannonAngle++;
                }
                // uiDraw();
            break;
        // arrow down
        case 40:
                if(cannonAngle >= 91) {
                    cannonAngle = 90;
                } else if(cannonAngle <= -1) {
                    cannonAngle = 0;
                } else {
                    cannonAngle--;
                }
                // uiDraw();
            break;
            default:
    }
    drawAll();       
}
let fillBox;

function cannonPowerGauge(event) {
    let keyCode = window.event.keyCode;
    if(!(cannonVo > 100)) {
        switch(keyCode) {
            case 32:
                fillBox = 0;
                cannonVo = cannonVo + 1;
                fillBox = cannonVo * 5;
                if(fillBox > 275) {
                    fillBox = 275;
                }
                
            break;
            default:
            break;
        }
    }
}

function keyupHandler(event) {
    let keyCode;
    if(event == null) {
        keyCode = window.event.keyCode;
        window.event.preventDefault();
    }else {
        keyCode = event.keyCode;
        event.preventDefault();
    }
    switch(keyCode) {
        case 32:
            fireCannon();
            clearInterval(uiDraw);
            clearInterval(setTimer);
            cannonVo = 1;
            uictx.clearRect(528, 24, 275, 19)
            uictx.drawImage(gameUIimg, 0, 0, uiwidth, uiheight);
            // uiDraw();
        break;
        default:
    }
    drawAll();
}

function fireCannon() {
    fireSound.currentTime = 0.8;
    fireSound.play();
    clearInterval(tid);
    let angle = cannonAngle;
    let outofCannon = cannonVo;
    let angleRadian = angle*Math.PI/180;
    horizonatalVel1 = cannonVector * outofCannon * Math.cos(angleRadian);
    verticalVel1 = - outofCannon * Math.sin(angleRadian);
    cannonBall.sx = cannonFirst + player01.x + 0 + 1 * Math.cos(angleRadian);
    cannonBall.sy = 400;
    drawAll();
    tid = setInterval(change, 50);
    return false;
};

function change() {
    // cannonball physics
    horizonatalVel2 = horizonatalVel1 + wind
    let dx = (horizonatalVel1 + horizonatalVel2)/2;
    horizonatalVel1 = horizonatalVel2;
    verticalVel2 = verticalVel1 + graviti;
    let dy = (verticalVel1 + verticalVel2)/2;
    verticalVel1 = verticalVel2;
    cannonBall.moveit(dx, dy);

    let bx = cannonBall.sx;
    let by = cannonBall.sy;

    for(let i = 0; i < enemyArray.length; i++) {
        if((bx >= enemyArray[i].x) && (bx <= (enemyArray[i].x + enemyArray[i].width)) &&
        (by >= enemyArray[i].y) && (by <= (enemyArray[i].y + enemyArray[i].height))) {
            dtEnemy.play();
            dtEnemy.currentTime = 0.2;
            enemyArray.splice(i, 1);
        }
    }
    
    if((enemyArray.length == 0) && (wave = 1)){
        wave++;
        gameSetup();
        // (display wave interval)
    } else if((enemyArray.length == 0) && (wave = 2)) {
        wave++;
        gameSetup();
    } else if((enemyArray.length == 0) && (wave = 3)) {
        setTimeout("clearGame()",2000);
    }

    if (by >= cheight + 20) {
        console.log("is it work?")
        clearInterval(tid);
        playerTurn = false;
        playerTurns();
        let windState = Math.floor(Math.random()*4);
        if(windState == 0) {
            wind = -Math.random()*1.5;
        }else if(windState == 1){
            wind = Math.random()*1.5;
        }else{}
        // uiDraw();
    }
    drawAll();    
}
function angleWrite() {
    uictx.fillStyle = "white"
    uictx.font = "bold 50px helvetica"
    uictx.fillText(cannonAngle, 285, 100)
};

function setTimer() {
    time--;
    if (time <= 0 || !playerTurn) {
        clearInterval(setTimer);
        playerTurn = false;
        moveEnemy();
    }
};

function twoDigit(time) {
    return (time < 10 ? "0" : "") + time;
}

function timeWrite() {
    uictx.fillStyle = "white"
    uictx.font = "bold 50px helvetica"
    uictx.fillText(twoDigit(time), 417, 100);
}

function uiDraw() {
    uictx.clearRect(0, 0, uiwidth, uiheight);
    uictx.drawImage(gameUIimg, 0, 0, uiwidth, uiheight);
    // wave
    if(wave = 1) {
        uictx.fillStyle = "white"
        uictx.font = "bold 50px helvetica"
        uictx.fillText("01", 155, 100);
    }else if(wave = 2) {
        uictx.fillStyle = "white"
        uictx.font = "bold 50px helvetica"
        uictx.fillText("02", 155, 100)
    }else if(wave = 3) {
        uictx.fillStyle = "white"
        uictx.font = "bold 50px helvetica"
        uictx.fillText("03", 155, 100)
    };
    // angle
        angleWrite();
    // Timer
        timeWrite();
    // move
        uictx.fillStyle = "rgb(82, 96, 46)";
        uictx.fillRect(528, 64, moveGauge, 19);
    // wind
        uictx.fillStyle = "white";
        uictx.fillRect(668, 101, wind*40, 19);
        uictx.beginPath();
        uictx.moveTo(668, 96);
        uictx.lineTo(668, 125);
        uictx.strokeStyle = "rgb(82, 96, 46)"
        uictx.lineWidth = 5;
        uictx.stroke();

        uictx.fillStyle = "rgb(82, 96, 46)";
        uictx.fillRect(528, 24, fillBox, 19);
};

function drawAll() {
    let i;
    ctx.clearRect(0, 0, cwidth, cheight);
    ctx.drawImage(gameBgImg, 0, 0, cwidth, cheight);
    deadLine.render();
    uictx.shadowBlur = 0;
    for(i = 0; i<everything.length; i++) {
        everything[i].draw();
    }
    for(i = 0; i<enemyArray.length; i++) {
        enemyArray[i].draw();
    }
}

function gameSetup() {
    tid = setInterval(change, 50);
    ctx.drawImage(gameBgImg, 0, 0, cwidth, cheight);
    uictx.clearRect(0, 0, uiwidth, uiheight);
    uictx.drawImage(gameUIimg, 0, 0, uiwidth, uiheight);
    if(wave = 1) {
        waveOne();
        drawAll();
        playerTurns();
    } else if(wave = 2) {
        waveTwo();
        drawAll();
    } else if(wave = 3) {
        finalWave();
        drawAll();
    }
    setInterval(uiDraw, 60);
};

function playerTurns() {
    if(playerTurn) {
        console.log("playerturn works")
        moveGauge = 275;
        time = 10;
        window.addEventListener("keydown", movementHandler, true);
        window.addEventListener("keypress", cannonPowerGauge, false);
        window.addEventListener("keyup", keyupHandler, false);
        setInterval(setTimer, 1000)
        // drawAll();
        // uiDraw();
    } else if(!playerTurn) {
        moveEnemy();
    }
}

function moveEnemy() {
    if(!playerTurn) {
        console.log("enermy turn works")
        window.removeEventListener("keydown", movementHandler, true);
        window.removeEventListener("keypress", cannonPowerGauge, false);
        window.removeEventListener("keyup", keyupHandler, false);
        if(wave = 1) {
            // enemy01.moveit(-enemySPD/10, 0/15);
            // enemy02.moveit(-enemySPD/10, 0/15);
            drawAll();

            for (let i = 0; i < enemyArray.length; i++) {
                console.log(" is it working? ")
                if (enemyArray[i].x <= deadLine.x) {
                    gameOver();
                }else {
                    playerTurn = true;
                    playerTurns();
                }
            }
            if(enemyArray.length == 0) {
                setTimeout("clearGame()", 2000);
            }
            console.log("wave1 worksin enemyturn")
        } else if(wave = 2) {
            // enemy01.moveit(enemy01.x - 50, enemy01.y);
            // enemy02.moveit(enemy02.x - 50, enemy02.y);
            // enemy03.moveit(enemy03.x - 50, enemy03.y);
            // drawAll();
            
            for (let i = 0; i < enemyArray.length; i++) {
                if (enemyArray[i].x <= deadLine.x) {
                    gameOver();
                }else {
                    playerTurn = true;
                    playerTurns();
                }
            }

            if(enemyArray.length == 0) {
                setTimeout("clearGame()", 2000);
            }
            
        } else if(wave = 3) {
            // enemy01.moveit(-Enmy_spd/15, -1.1/15);
            // enemy02.moveit(enemy02.x - 50, enemy02.y);
            // enemy03.moveit(enemy03.x - 50, enemy03.y);
            // enemy04.moveit(enemy04.x - 90, enemy04.y);
            // drawAll();
            
            for (let i = 0; i < enemyArray.length; i++) {
                if (enemyArray[i].x <= deadLine.x) {
                    gameOver();
                } else {
                    playerTurn = true;
                    playerTurns();
                }
            }

            if(enemyArray.length == 0) {
                setTimeout("clearGame()", 2000);
            }
            
        }
    } else {
        playerTurns();
    }
}

// clear game
let clearBgImg = new Image();
clearBgImg.src = "img/gameClearbg.png";
function startagainBtn(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    startBtnOn = true;
    this.render = function() {
        uictx.shadowColor = "black"
        uictx.shadowBlur = 15;
        uictx.fillStyle = this.color;
        uictx.fillRect(this.x, this.y, this.width, this.height)
        uictx.fillStyle = "white"
        uictx.font = "30px helvetica"
        uictx.fillText("START AGAIN", uiwidth/2 - 95, uiheight/2 + 10)
        
    }
}

function clearGame() {
    clearInterval(tid);
    removeRct();
    window.removeEventListener("keydown", movementHandler, true);
    window.removeEventListener("keypress", cannonPowerGauge, false);
    window.removeEventListener("keyup", keyupHandler, false);
    ctx.drawImage(clearBgImg,0,0,cwidth,cheight);
    uictx.clearRect(0, 0, uiwidth, uiheight);
    uictx.drawImage(startUIimg, 0, 0, uiwidth, uiheight)
    startagainButton.render();
    console.log("game finished");

    uiCanvas.addEventListener("click", (event) => {
        if (
            event.offsetX >= 360 && event.offsetX <= 605 &&
            event.offsetY >= 47 && event.offsetY <= 122
        ) {
            intro();
        }
    });
};
let startagainButton = new startagainBtn(uiwidth/2 - 125, uiheight/2 - 40, 250, 80, "rgb(82, 96, 46)")

// game Over
let goBgImg = new Image();
goBgImg.src = "img/gameoverbg.png";
function startagainBtn(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    startBtnOn = true;
    this.render = function() {
        uictx.shadowColor = "black"
        uictx.shadowBlur = 15;
        uictx.fillStyle = this.color;
        uictx.fillRect(this.x, this.y, this.width, this.height)
        uictx.fillStyle = "white"
        uictx.font = "30px helvetica"
        uictx.fillText("START AGAIN", uiwidth/2 - 95, uiheight/2 + 10)
        
    }
}

function gameOver() {
    clearInterval(tid);
    removeRct();
    window.removeEventListener("keydown", movementHandler, true);
    window.removeEventListener("keypress", cannonPowerGauge, false);
    window.removeEventListener("keyup", keyupHandler, false);
    ctx.drawImage(goBgImg,0,0,cwidth,cheight);
    uictx.clearRect(0, 0, uiwidth, uiheight);
    uictx.drawImage(startUIimg, 0, 0, uiwidth, uiheight)
    startagainButton.render();
    console.log("game over");

    uiCanvas.addEventListener("click", (event) => {
        if (
            event.offsetX >= 360 && event.offsetX <= 605 &&
            event.offsetY >= 47 && event.offsetY <= 122
        ) {
            intro();
        }
    });
}





// initsetting, drawui
// tanksound
// gameover

// function gameflow() {
//     gameSetting1()
//         set wave
//         playerturn
//              draw player
//              draw ui
//              set timer
//              
//           
//              
//              checkwin
//         enemyturn
//              move enemy
//              checkwin
//         check all enemydead
//         display turn
//         display gameover
//         display win
//     enemyturn
//         enemymove     
// }

