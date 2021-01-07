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

let server = app.listen(port, () => {
  console.log(`App listening on port: ${port}`)
})

// Setup socket.io
const io = socketio(server)

io.on('connection', client => {
  console.log("User connected!", client.id)

  client.on("JOIN_LOBBY", joinLobby)
  client.on("LEAVE_LOBBY", leaveLobby)

  client.on('disconnect', onDisconnect)
})

/**
 * MANAGE SOCKET ACTIONS
 */

// Initialize empty lobbies object
var lobbies = {}
var players = {}

function joinLobby(playerData) {
  const lobby = lobbies[playerData.code]

  // Add player to lobby and join socket room
  lobby.addPlayer(this,playerData) 
  this.join(lobby.code)
  players[this.id] = lobby.code

  console.log("Player Added!")

  // Emit UPDATE_PLAYERS w/ updated players list
  sendPlayersUpdate(lobby.code) 
}

// Sends updated players list to all sockets in the lobby
function sendPlayersUpdate(code) {
  const lobby = lobbies[code]

  io.in(code).emit("UPDATE_PLAYERS", { players: Object.values(lobby.players), host: lobby.host })
  console.log("Players Update sent to:", code)
}


/**
 * Disconnects client from socket room and lobby
 * 
 * @param {*} code 
 */
function leaveLobby(code) {
  // remove player from lobby
  const lobby = lobbies[code]

  lobby.removePlayer(this.id)
  delete players[this.id]

  // leave socket room
  this.leave(code)

  console.log("Player disconnected from:", code)

  // remove lobby if empty else send players update to room
  if (lobby.numPlayers === 0) {
    delete lobbies[code]
    console.log("Lobby deleted:", code)
  } else {
    sendPlayersUpdate(code)
  }
  
}

/**
 * Handles when socket disconnects (page closes or refreshes)
 */
function onDisconnect() {
  // remove from lobby object
  if (players[this.id]){
    leaveLobby.call(this, players[this.id])
  }


  console.log("User disconnected!", this.id)
}