const nanoid = require('nanoid')
const customNanoid = nanoid.customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',6)

const Player = require('./player')
const Game  = require('./game')
const server = require('./server')

class Lobby {

  constructor() {
    this.code = customNanoid()

    this.players = {}
    this.status = "IN_MENU"
    this.numPlayers = 0
    this.host = null

    this.game = null
  }

  // add_player - adds player to players object and handles settings hosts

  addPlayer(playerId,playerData) {
    this.players[playerId] = new Player(playerId,playerData.username,playerData.color)
    this.numPlayers++

    this.sendLobbyUpdateToAll() 

    if (this.game) {
      this.game.addPlayer(playerId)
    }

    if (this.host === null) {
      this.assignHost(playerId)
    }
  }

  // remove_player - removes player from lobby and check to see if lobby is empty

  removePlayer(playerId) {
    delete this.players[playerId]
    this.numPlayers--

    if (this.game) {
      this.game.removePlayer(playerId)
    }

    if (this.host === playerId) {
      this.assignHost()
    }
    
    this.sendLobbyUpdateToAll()
  }

  // assigns host to a given player or another player from list of players

  assignHost(playerId = null) {
    if (playerId) {
      this.host = playerId
    } else {
      if (this.numPlayers > 0) {
        this.host = Object.keys(this.players)[0]
      }
    }
  }

  /* METHODS MANAGING GAME */

  // Create new game and begins server side state of game

  async startGame(options) {
    this.game = new Game(this, options)

    this.status = "IN_GAME"
    this.sendLobbyUpdateToAll()
    await this.game.start()

    this.endGame()
  }

  // Deletes Game and sets status back to menu

  endGame() {
    if (this.game) {
      this.game = null

      this.status = "IN_MENU"
      this.sendLobbyUpdateToAll()
    }
  }

  /* SOCKET METHODS */

  // Returns object containing client side data

  createUpdate() {
    return {
      status: this.status,
      players: this.players,
      host: this.host
    }
  }

  // Sends updated lobby data to all connected sockets

  sendLobbyUpdateToAll() {
    server.emitToLobby(this.code, "UPDATE_LOBBY", this.createUpdate())

    console.log("Lobby update sent to all:", this.code)
  }

  // Sends updated lobby data to a given socket

  sendLobbyUpdateToPlayer(playerSocket) {
    playerSocket.emit("UPDATE_LOBBY", this.createUpdate())

    console.log("Lobby update sent to:", playerSocket.id)
  }

}

module.exports = Lobby