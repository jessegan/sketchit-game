const util = require('./utility')
const PlayerList = require('./player_list')

class Game {
  
  constructor(lobby, options) {
    this.lobby = lobby

    this.rounds = options.rounds || 3
    this.word_bank = options.word_bank || "default"

    this.game_status = "BEFORE_ROUND"
    this.current_round = 1

    this.current_player = null
    this.playerOrder = new PlayerList(Object.keys(this.lobby.players))
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
    this.playerOrder.reset()
    this.lobby.sendGameUpdateToAll()

    await util.wait(1000*3)

    this.game_status = "IN_ROUND"
    this.lobby.sendGameUpdateToAll()

    while (this.playerOrder.hasNext()) {
      await this.playTurn()
    }
    
    this.current_player = null

    this.game_status = "AFTER_ROUND"
    this.lobby.sendGameUpdateToAll()

    await util.wait(1000*3)
  }

  // Plays through turn
  async playTurn() {
    this.current_player = this.playerOrder.getNext()
    this.lobby.sendGameUpdateToAll()

    await util.wait(1000*3)
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
      },
      turn: {
        drawing_player: this.current_player
      }
    }
  }

}

module.exports = Game