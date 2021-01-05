const express = require('express')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const port = process.env.PORT || 8080
const DIST_DIR = path.join(__dirname,'../../dist')

const Lobby = require('./lobby')

app.use(express.static(DIST_DIR))

app.post('/lobbies',(req,res) => {
  
  const lobby = new Lobby()
  lobbies[lobby.code] = lobby

  console.log("New Lobby Created at Code:",lobby.code)

  res.json(lobby)
})

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname,'../../dist/index.html'), (err) => {
    if (err){
      res.status(500).send(err)
    }
  })
})

server = app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})

// Setup socket.io
const io = socketio(server)

io.on('connection', client => {
  console.log("User connected!", client.id)

  client.on("JOIN_LOBBY", joinLobby)

  client.on("INIT_PLAYERS", sendPlayersInit)

  client.on('disconnect', () => {
    console.log("User disconnected!")
  })
})

/**
 * MANAGE SOCKET ACTIONS
 */

// Initialize empty lobbies object
var lobbies = {}

function joinLobby(playerData) {
  const lobby = lobbies[playerData.code]

  lobby.addPlayer(this,playerData) // Add player to the lobby
  this.join(lobby.code) // Join Lobby room
  sendPlayersUpdate(lobby.code) // Emit UPDATE_PLAYERS w/ updated players list

  console.log("Player Added!")
}

// Sends updated players list to all sockets in the lobby
function sendPlayersUpdate(code) {

  io.in(code).emit("UPDATE_PLAYERS", { players: Object.values(lobbies[code].players) })
  console.log("Players Update sent to:", code)
}

// Sends current players list to the client requesting
function sendPlayersInit(code) {
  this.emit("UPDATE_PLAYERS", { players: Object.values(lobbies[code].players) })
  
  console.log("Players init sent to:", this.id)
}