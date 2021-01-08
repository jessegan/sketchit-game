class Game {
  
  constructor(players, sockets, options) {
    this.player = players
    this.sockets = sockets
    this.rounds = options.rounds || 3
    this.word_bank = options.word_bank || "default"
    this.game_status = "BEFORE_ROUND"

    this.sendUpdate()
  }

  /**
   * Sends game data to all connected sockets
   */
  sendUpdate() {
    Object.keys(this.sockets).forEach(playerId => {
      const socket = this.sockets[playerId]

      socket.emit("GAME_UPDATE", this.createUpdate())
    })
  }

  /**
   * Creates a object that bundles Game data to send to client
   */
  createUpdate() {
    return {
      status: this.game_status
    }
  }

}

module.exports = Game