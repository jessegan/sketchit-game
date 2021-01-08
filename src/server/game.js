const util = require('./utility')

class Game {
  
  constructor(lobby, options) {
    this.lobby = lobby
    this.rounds = options.rounds || 3
    this.current_round = 1
    this.word_bank = options.word_bank || "default"
    this.game_status = "BEFORE_ROUND"
    this.updateInterval = null
  }

  /**
   * GETTERS AND SETTERS
   */
  get players() {
    return this.lobby.players
  }

  get sockets(){
    return this.lobby.sockets
  }

  /**
   * Starts update interval. Plays all rounds while awaiting previous round to finish before starting the next.
   */
  async play() {
    this.startUpdateInterval()

    while (this.current_round <= this.rounds) {
      await this.playRound()
      this.current_round++
    }

    this.end()
  }

  /**
   * Cleanup any processes when ending game: Stops update interval
   */
  end(){
    this.stopUpdateInterval()
    this.game_status = "GAME_END"
    this.sendUpdate()
  }

  /**
   * Starts a new Round after a 10s delay and plays round.
   * 
   * @returns {Promise}
   */
  async playRound() {
    // Wait 10 seconds before starting round
    this.game_status = "BEFORE_ROUND"
    await util.wait(1000*3)
    this.game_status = "IN_ROUND"
    await util.wait(1000*3)
    this.game_status = "AFTER_ROUND"
    await util.wait(1000*3)
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
      status: this.game_status,
      total_rounds: this.rounds,
      current_round: this.current_round
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