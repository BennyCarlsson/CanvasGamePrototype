// Dependencies
var express = require("express")
var http = require("http")
var path = require("path")
var socketIO = require("socket.io")
var app = express()
var server = http.Server(app)
var io = socketIO(server)
app.set("port", 5000)
app.use("/", express.static(__dirname + "/"))
// Routing
app.get("/", function(request, response) {
  response.sendFile(path.join(__dirname, "index.html"))
})
// Starts the server.
server.listen(5000, function() {
  console.log("Starting server on port 5000")
})

// Add the WebSocket handlers
io.on("connection", function(socket) {})

var players = {}
let speed = 7
let x = 100
let y = 100
let isJumping = false
let jumpCount = 0

io.on("connection", function(socket) {
  socket.on("new player", function() {
    players[socket.id] = {
      x,
      y
    }
  })
  socket.on("disconnect", function() {
    delete players[socket.id]
  })
  socket.on("movement", function(data) {
    var player = players[socket.id] || {}
    if (data.left) {
      player.x -= speed
    }
    if (data.right) {
      player.x += speed
    }
    //jumping()
  })
})

function jumping() {
  if (y + 40 < 250 && !isJumping) {
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

setInterval(function() {
  io.sockets.emit("state", players)
}, 1000 / 60)

// var lastUpdateTime = (new Date()).getTime();
// setInterval(function() {
//   // code ...
//   var currentTime = (new Date()).getTime();
//   var timeDifference = currentTime - lastUpdateTime;
//   player.x += 5 * timeDifference;
//   lastUpdateTime = currentTime;
// }, 1000 / 60);
