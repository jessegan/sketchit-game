const util = require('./utility')

class Game {
  
  constructor(players, sockets, options) {
    this.player = players
    this.sockets = sockets
    this.rounds = options.rounds || 3
    this.word_bank = options.word_bank || "default"
    this.game_status = "BEFORE_ROUND"
    this.updateInterval = null
  }

  /**
   * Starts update interval. Plays all rounds while awaiting previous round to finish before starting the next.
   */
  async play() {
    this.startUpdateInterval()

    for(let i = 0; i < this.rounds; i++) {
      await this.playRound()
    }
  }

  /**
   * Cleanup any processes when ending game: Stops update interval
   */
  end(){
    this.stopUpdateInterval()
  }

  /**
   * Starts a new Round after a 10s delay and plays round.
   * 
   * @returns {Promise}
   */
  async playRound() {
    // Wait 10 seconds before starting round
    await util.wait(1000*10)
    this.game_status = "IN_ROUND"
  }

  /**
   * Sends game data to all connected sockets
   */
  sendUpdate() {
    const update = this.createUpdate()

    Object.keys(this.sockets).forEach(playerId => {
      const socket = this.sockets[playerId]

      socket.emit("GAME_UPDATE", update)
    })

    console.log("Game Update sent:", update)
  }

  /**
   * Creates a object that bundles Game data to send to client
   */
  createUpdate() {
    return {
      status: this.game_status
    }
  }

  /**
   * Starts 500 ms interval to send updates to all sockets connected to the game
   */
  startUpdateInterval() {
    this.updateInterval = setInterval(this.sendUpdate.bind(this), 1000/2)
  }

  /**
   * Ends update interval
   */
  stopUpdateInterval() {
    if (this.updateInterval){
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

}

module.exports = Game