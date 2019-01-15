let speed = 7
let x = 100
let y = 100
let rightPressed = false
let leftPressed = false
let legRot = 0
let isJumping = false
let jumpCount = 0

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true
  }
  if (e.key == "Up" || e.key == "ArrowUp") {
    if (!isJumping) {
      isJumping = true
    }
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false
  }
}

function movePlayer() {
  if (leftPressed) {
    x -= speed
  }
  if (rightPressed) {
    x += speed
  }
}

function legRotation() {
  if (leftPressed || rightPressed) {
    if (legRot < 0) {
      legRot = 10
    } else {
      legRot = -10
    }
  } else {
    legRot = 0
  }
}

function jumping(height, width) {
  if (y + 40 < height && !isJumping) {
    y += 3
  } else if (!isJumping) {
    jumpCount = 0
  }
  if (isJumping) {
    jumpCount++
    y -= 3
    if (jumpCount > 20) {
      isJumping = false
    }
  }
}

export function drawPlayer(context) {
  //body
  context.beginPath()
  context.fillStyle = "black"
  context.fillRect(x, y, 20, 20)
  context.closePath()

  // leg
  context.beginPath()
  context.moveTo(x + 15, y + 10)
  context.lineTo(x + 15 + legRot, y + 40)
  context.moveTo(x + 5, y + 10)
  context.lineTo(x + 5 + legRot, y + 40)
  context.lineWidth = 2
  context.stroke()
  context.closePath()
}

export function updatePlayer(height, width) {
  movePlayer()
  legRotation()
  jumping(height, width)
}
