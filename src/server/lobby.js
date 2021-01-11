const nanoid = require('nanoid')
const customNanoid = nanoid.customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',6)

const Player = require('./player')
const Game  = require('./game')
const server = require('./server')

class Lobby {

  constructor() {
    this.code = customNanoid()

    this.players = {}
    this.lobby_status = "IN_MENU"
    this.host = null
    this.numPlayers = 0

    this.game = null
  }

  // add_player - adds player to players object and handles settings hosts

  addPlayer(playerId,playerData) {
    this.players[playerId] = new Player(playerId,playerData.username,playerData.color)
    this.numPlayers++

    if (this.numPlayers===1){
      this.host = playerId
    }

    this.sendLobbyUpdateToAll()
  }

  // remove_player - removes player from lobby and check to see if lobby is empty

  removePlayer(playerId) {
    delete this.players[playerId]

    this.numPlayers--

    if (playerId === this.host){
      this.assignHost()
    }

    this.sendLobbyUpdateToAll()
  }

  assignHost(){
    if (this.numPlayers >= 1) {
      this.host = Object.keys(this.players)[0]
    } else {
      this.host = null
    } 
  }

  /* METHODS MANAGING GAME */

  // Create new game and begins server side state of game

  async startGame(options) {
    this.game = new Game(this, options)

    this.lobby_status = "IN_GAME"
    this.sendLobbyUpdateToAll()

    // await this.game.play()
    // this.endGame()
  }

  /**
   * Ends Game before deleting reference to the Game
   */
  endGame() {
    if (this.game) {
      this.game.end()
      this.game = null
    }
  }

  /* SOCKET METHODS */

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

  // Sends game data to all connected sockets

  sendGameUpdateToAll() {
    server.emitToLobby(this.code, "UPDATE_GAME", this.game.createUpdate())

    console.log("Game update sent to all:", this.code)
  }

  // Sends game data to a given socket

  sendGameUpdateToPlayer(playerSocket) {
    playerSocket.emit("UPDATE_GAME", this.game.createUpdate())

    console.log("Game update sent to player:", playerSocket.id)
  }

  createUpdate() {
    return {
      status: this.lobby_status,
      players: Object.values(this.players),
      host: this.host
    }
  }
}

module.exports = Lobby