class Game {
  
  constructor(players, options) {
    this.player = players
    this.rounds = options.rounds || 3
    this.word_bank = options.word_bank || "default"
    this.in_round = false
  }

}

module.exports = Game