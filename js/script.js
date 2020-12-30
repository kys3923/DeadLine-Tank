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


// drawTank();
// drawEnemyTank();
// drawCannon();


// draw in canvas
function tankDrawing(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
    this.render = function() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, this.width, this.height)
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
    // else if (e.keyCode == "38") {

    // }
    // // arrow down
    // else if (e.keyCode == "40") {

    // }
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