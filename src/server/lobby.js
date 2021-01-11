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

    this.game = null
    this.host = null
    this.numPlayers = 0
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

  // Methods Managing the Game

  /**
   * Creates a new game with options paased in and then starts playing game.
   * Emits "LOBBY_STATUS" update to client sockets.
   * 
   * @param {*} options 
   */
  async startGame(options) {
    this.game = new Game(this, options)

    Object.values(this.sockets).forEach((socket) => {
      socket.emit("LOBBY_STATUS", "IN_GAME")
    })

    await this.game.play()
    this.endGame()
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

  createUpdate() {
    return {
      status: this.lobby_status,
      players: Object.values(this.players),
      host: this.host
    }
  }
}

module.exports = Lobby