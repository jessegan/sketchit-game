const util = require('./utility')

class Game {
  
  constructor(lobby, options) {
    this.lobby = lobby

    this.rounds = options.rounds || 3
    this.word_bank = options.word_bank || "default"

    this.game_status = "BEFORE_ROUND"
    this.current_round = 1
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

  /* METHODS FOR PLAYING GAME */

  // Driver function for game will play {this.rounds} number of rounds

  async play() {
    while (this.current_round <= this.rounds) {
      await this.playRound()
      this.current_round ++
    }

    await this.end()
  }

  // Plays through cycle of 1 round

  async playRound() {
    this.game_status = "BEFORE_ROUND"
    this.lobby.sendGameUpdateToAll()

    await util.wait(1000*3)

    this.game_status = "IN_ROUND"
    this.lobby.sendGameUpdateToAll()

    await util.wait(1000*3)

    this.game_status = "AFTER_ROUND"
    this.lobby.sendGameUpdateToAll()

    await util.wait(1000*3)
  }

  // Plays through turn
  async playTurn() {

  }


  // Ends game

  async end() {
    this.game_status = "AFTER_GAME"
    this.lobby.sendGameUpdateToAll()

    await util.wait(1000*3)
  }

  // Create game data object to send through sockets

  createUpdate() {
    return {
      status: this.game_status,
      round: {
        number: this.current_round
      }
    }
  }

}

module.exports = Game