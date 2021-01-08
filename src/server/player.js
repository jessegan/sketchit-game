class Player {

  constructor(socketid,username,color) {
    this.socketid = socketid
    this.username = username
    this.color = color
    this.score = 0
  }

}

module.exports = Player