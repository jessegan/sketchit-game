const util = require('./utility')

class Game {
  
  constructor(lobby, options) {
    this.rounds = options.rounds || 3
    this.word_bank = options.word_bank || "default"

    this.game_status = "BEFORE_ROUND"
    this.current_round = 1
    
    // this.current_turn = 0
    // this.current_player = null

    // this.playerOrder = Object.keys(lobby.players)

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
    // this.startUpdateInterval()

    while (this.current_round <= this.rounds) {
      await this.playRound()
      this.current_round++
    }

    this.end()
  }

  /**
   * Starts a new Round after a 10s delay and plays round.
   * 
   * @returns {Promise}
   */
  async playRound() {
    // Wait 10 seconds before starting round
    this.game_status = "BEFORE_ROUND"
    this.current_round = 0
    await util.wait(1000*3)

    while (this.current_round < this.playerOrder.length) {
      // this.playTurn(this.current_round)
      this.current_round ++
    }

    this.game_status = "AFTER_ROUND"
    await util.wait(1000*3)
  }

  // /**
  //  * Starts playing a turn
  //  */
  // async playTurn(turnNumber) {
  //   this.current_player = this.playerOrder[turnNumber]
  //   let turnTimer = 60
  //   await util.wait(1000*3)
  // }


  /**
   * Cleanup any processes when ending game: Stops update interval
   */
  end(){
    this.stopUpdateInterval()
    this.game_status = "GAME_END"
    this.sendUpdate()
  }


  // Create game data object to send through sockets

  createUpdate() {
    return {
      status: this.game_status
    }
  }

}

module.exports = Game