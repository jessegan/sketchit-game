const nanoid = require('nanoid')
const customNanoid = nanoid.customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',6)

const Player = require('./player')
const Game  = require('./game')

class Lobby {

  constructor() {
    this.code = customNanoid()
    this.sockets = {}
    this.players = {}
    this.game = null
    this.host = null
    this.numPlayers = 0
  }

  // add_player - adds player to players object and handles settings hosts
  addPlayer(socket,playerData) {
    this.sockets[socket.id] = socket
    this.players[socket.id] = new Player(socket.id,playerData.username,playerData.color)
    this.numPlayers++

    if (this.numPlayers===1){
      this.host = socket.id
    }
  }

  // remove_player - removes player from lobby and check to see if lobby is empty
  removePlayer(socketid) {
    delete this.sockets[socketid]
    delete this.players[socketid]

    this.numPlayers--

    if (socketid === this.host){
      this.assignHost()
    }
  }

  assignHost(){
    if (this.numPlayers >= 1) {
      this.host = Object.keys(this.players)[0]
    } else {
      this.host = null
    }
    
  }

  // Methods Managing the Game

  startGame(options) {
    this.game = new Game(this.players, options)

    Object.values(this.sockets).forEach((socket) => {
      socket.emit("LOBBY_STATUS", "IN_GAME")
    })
  }

}

module.exports = Lobby