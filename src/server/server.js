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
  client.on("CONNECT_TO_LOBBY", connectToLobby)
  client.on("LEAVE_LOBBY", leaveLobby)

  client.on("START_GAME", startGame)
  client.on("CONNECT_TO_GAME", connectToGame)

  client.on('disconnect', onDisconnect)
})

/**
 * MANAGE SOCKET ACTIONS
 */

// Initialize empty lobbies object
var lobbies = {}
var players = {}

// Emits event to all sockets in room 

function emitToLobby(code, eventType, payload) {
  io.in(code).emit(eventType, payload)
}

// Add new player to lobby and add socket to lobby's room

function joinLobby(playerData) {
  const lobby = lobbies[playerData.code]

  lobby.addPlayer(this.id, playerData) 
  players[this.id] = lobby.code

  this.join(lobby.code)

  console.log("Player Added!", lobby.code)
}

// Connects player to lobby by sending lobby update to socket

function connectToLobby() {
  if (players[this.id]) {
    lobbies[players[this.id]].sendLobbyUpdateToPlayer(this)
  }

  console.log("Player connecting to lobby:", this.id)
}

// Removes player from lobby

function leaveLobby() {
  if (players[this.id]){
    const lobby = lobbies[players[this.id]]

    lobby.removePlayer(this.id)
    delete players[this.id]

    this.leave(lobby.code)

    console.log("Player disconnected from:", lobby.code)
    
    if (lobby.numPlayers === 0) {
      lobby.endGame()
      delete lobbies[lobby.code]

      console.log("Lobby deleted:", lobby.code)
    }
  }  
}

/**
 * startGame
 * 
 * @param {Object} gameData contains code and options key
 */
function startGame( gameData ) {

  // find the lobby
  const lobby = lobbies[gameData.code]

  // Start game for the lobby
  lobby.startGame(gameData.options)

  console.log("Starting Game:", lobby.code)
}

/**
 * Handles when socket disconnects (page closes or refreshes)
 */
function onDisconnect() {
  // remove from lobby object
  if (players[this.id]){
    leaveLobby.call(this)
  }

  console.log("User disconnected!", this.id)
}

exports.emitToLobby = emitToLobby