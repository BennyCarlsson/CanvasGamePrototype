import { drawPlayer, updatePlayer } from "./src/player.js"

let gameCanvas = document.getElementById("gameCanvas")
let context = gameCanvas.getContext("2d")

function loop() {
  update()
  draw()
  requestAnimationFrame(loop)
}

function update() {
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
  drawPlayer(context)
}

function draw() {
  updatePlayer(gameCanvas.height, gameCanvas.width)
}

//setInterval(update, 10);
requestAnimationFrame(loop)
