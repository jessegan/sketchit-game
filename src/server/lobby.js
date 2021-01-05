const nanoid = require('nanoid')
const customNanoid = nanoid.customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',6)

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

    if (socketid === this.host){
      this.assignHost()
    }
  }

  assignHost(){
    this.host = this.players.keys().first()
  }

}

module.exports = Lobby