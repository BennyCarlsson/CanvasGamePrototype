import { drawPlayer, updatePlayer, start } from "./src/player.js"
import { socket } from "./src/socket.js"

let gameCanvas = document.getElementById("gameCanvas")
let context = gameCanvas.getContext("2d")

function loop(players) {
  update()
  draw(players)
  //requestAnimationFrame(loop)
}

function update() {
  updatePlayer(gameCanvas.height, gameCanvas.width)
}

function draw(players) {
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
  drawPlayer(context, players)
}

socket.on("state", function(players) {
  console.log(players)
  loop(players)
})

window.onload = start()
//setInterval(update, 10);
//requestAnimationFrame(loop)
