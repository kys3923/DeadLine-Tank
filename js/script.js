const canvas = document.getElementById("gameDisplay");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const tankWidth = 50;
const tankHeight = 50;
let allyTankX = 0;
const allyTankMoveSPD = 1.5;
let enemyTankX = 0;
const enemyTankMovdSPD = 1.5;
let tankLeftPrssd = false;
let tankRightPrssd = false;
let allyCannonAngle = Math.PI / 180;
let enemyCannonAngle = Math.PI / 180; 
const cannonAngleDIF = Math.PI / 60;

// drawTank();
// drawEnemyTank();
// drawCannon();


// draw in canvas
function tankDrawing(x, y, width, height, cannonAngle) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
    this.cannonAngle = cannonAngle
    let cannonLength = width * Math.sqrt(2);
    this.render = function() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        if(allyTank) {
            ctx.beginPath();
            ctx.lineWidth = 5
            ctx.strokeStyle = "red" 
            ctx.moveTo(this.x + 25, this.y + 25)
            ctx.lineTo((this.x + 25) + cannonLength * Math.cos(allyCannonAngle),
            (this.y + 25) - cannonLength * Math.sin(allyCannonAngle)
            );
        } else {
            return;
        };
        ctx.stroke();
        ctx.closePath();
    }
}


let allyTank = new tankDrawing(0, 590, 50, 50)
let enemyTank = new tankDrawing(910, 590, 50, 50)

// after game selection
let gameStart = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (enemyTank.alive) {
        enemyTank.render()
        // detectHit()
    }
    allyTank.render()
    // set timer
    // set wind
    // draw map
}

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
    // else if (e.keyCode == "32") {

    // }
    else {
        console.log("Wrong Key Pressed")
    }
}
let gameInterval = setInterval(gameStart, 100)
document.addEventListener("keydown", movementHandler)

gameStart();