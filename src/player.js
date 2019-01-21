import { socket } from "./socket.js"

let lastPlayers = {}
let currentPlayers = {}

function getLegRotation(player, id) {
  const lastPlayer = lastPlayers[id]
  let legRotation = lastPlayer ? lastPlayer.legRotation : 0
  if (lastPlayer && player.x !== lastPlayer.x) {
    if (legRotation < 0) {
      legRotation = 5
    } else {
      legRotation = -5
    }
  } else {
    legRotation = 0
  }
  console.log(legRotation)
  currentPlayers[id] = {
    ...player,
    legRotation
  }

  return legRotation
}

function drawPlayer(context, players) {
  for (let id in players) {
    const player = players[id]
    const legRotation = getLegRotation(player, id)
    //body
    context.beginPath()
    context.fillStyle = "white"
    context.fillRect(player.x, player.y, 10, 23)
    context.closePath()

    // legs
    context.beginPath()
    context.moveTo(player.x + 8, player.y + 10)
    context.lineTo(player.x + 8 + legRotation, player.y + 32)
    context.moveTo(player.x + 2, player.y + 10)
    context.lineTo(player.x + 2 + legRotation, player.y + 32)
    context.strokeStyle = "white"
    context.lineWidth = 2
    context.stroke()
    context.closePath()
  }
}

export function updatePlayer(context, players) {
  drawPlayer(context, players)
  lastPlayers = currentPlayers
}
socket.emit("new player")
