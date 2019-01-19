import { socket } from "./socket.js"

let legRot = 0

// function movePlayer() {
//   if (movement.right) {
//     x -= speed
//   }
//   if (movement.left) {
//     x += speed
//   }
// }

// function legRotation() {
//   if (movement.left || movement.right) {
//     if (legRot < 0) {
//       legRot = 10
//     } else {
//       legRot = -10
//     }
//   } else {
//     legRot = 0
//   }
// }

function drawPlayer(context, players) {
  for (var id in players) {
    var player = players[id]
    //body
    context.beginPath()
    context.fillStyle = "white"
    context.fillRect(player.x, player.y, 10, 23)
    context.closePath()

    // leg
    context.beginPath()
    context.moveTo(player.x + 8, player.y + 10)
    context.lineTo(player.x + 8 + legRot, player.y + 32)
    context.moveTo(player.x + 2, player.y + 10)
    context.lineTo(player.x + 2 + legRot, player.y + 32)
    context.strokeStyle = "white"
    context.lineWidth = 2
    context.stroke()
    context.closePath()
  }
}

export function updatePlayer(context, players) {
  //movePlayer()
  //legRotation()
  drawPlayer(context, players)
}
socket.emit("new player")
