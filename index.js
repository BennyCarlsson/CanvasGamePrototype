import { updatePlayer } from "./src/player.js"
import { socket } from "./src/socket.js"

let gameCanvas = document.getElementById("gameCanvas")
let context = gameCanvas.getContext("2d")

function loop(players) {
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
  var grd = context.createLinearGradient(0, 0, 200, 0)
  grd.addColorStop(0, "#FF0844")
  grd.addColorStop(1, "#FF4563")
  context.fillStyle = grd
  context.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
  updatePlayer(context, players)
  //requestAnimationFrame(loop)
}

let movement = {
  right: false,
  left: false,
  up: false
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    movement.right = true
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    movement.left = true
  }
  if (e.key == "Up" || e.key == "ArrowUp") {
    movement.up = true
    if (!isJumping) {
      isJumping = true
    }
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    movement.right = false
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    movement.left = false
  }
  if (e.key == "Up" || e.key == "ArrowUp") {
    movement.up = false
  }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

let consoleCount = 0
socket.on("state", function(players) {
  if (consoleCount > 100) {
    console.log(players)
    consoleCount = 0
  }
  consoleCount++
  loop(players)
})

function start() {
  setInterval(function() {
    socket.emit("movement", movement)
  }, 1000 / 60)
}

window.onload = start()
//setInterval(update, 10);
//requestAnimationFrame(loop)
