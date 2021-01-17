const util = require('./utility')

class Turn {

  constructor(round, options) {
    this.round = round

    this.stutus = "INACTIVE"

    this.total_time = options.turn_time
    this.word_bank = options.word_bank
  }
  
  /* DRIVER METHOD */

  async start(players, drawing_player) {
    this.reset(players, drawing_player)

    await this._preTurn()
    await this._inTurn()
    await this._postTurn()

    this._endTurn()
  }

  /* HELPER METHODS */

  // resets turn with given list of players, current_drawer

  reset(players, drawing_player) {
    this.timer = this.total_time

    this.players_to_guess = new Set(players)

    this.drawing_player = drawing_player
    this.players_to_guess.delete(drawing_player)

    this.points = {}
    players.forEach((p)=> {this.points[p] = 0})
  }

  // PRE - set word and waits 

  async _preTurn() {
    this.status = "PRE_TURN"
    this.word = "random word" // TODO: Add word list to pick random word from word_bank

    this.sendGameUpdateToAll()

    await util.wait(1000*3)
  }

  // IN - start update cycle and 

  async _inTurn() {
    this.status = "IN_TURN"
    
    await this._runTurn()
  }

  // Starts interval to update turn timers until time is up or all players have guessed correctly

  async _runTurn() {
    const interval = setInterval(this.sendGameUpdateToAll.bind(this), 1000 / 2)

    while (this.timer >= 0 && this.players_to_guess.size > 0) {
      await util.wait(1000*1)
      this.timer --
    }

    clearInterval(interval)    
  }

  // POST - updates points for drawing player
  async _postTurn() {
    this.status = "POST_TURN"
    
    this.addPoints(this.drawing_player, (1000 - (this.players_to_guess.size * 100)) )
    this.sendGameUpdateToAll()

    await util.wait(1000*5)
  }

  // END - sets state to INACTIVE

  _endTurn() {
    this.status = "INACTIVE"
  }


  /* INSTANCE METHODS */

  // add points to a specific player

  addPoints(playerId,points) {
    this.points[playerId] += points
  }

  // validates given string against the chosen word

  validateWord(guess) {
    return guess.toLowerCase() === this.word
  }

  // return object containing points for each player in a given turn

  getResults() {
    return this.points
  }

  // return array of sorted playerIds by points

  getPointsOrdered() {
    let entries = Object.entries(this.points)

    return entries.sort((a,b) => b[1] - a[1])
  }

  // adds player that joins in the middle of the turn

  addPlayer(playerId) {
    this.players_to_guess.add(playerId)
    this.points[playerId] = 0
  }

  // remove player that leaves in middle of turn

  removePlayer(playerId) {
    this.players_to_guess.delete(playerId)
    delete this.points[playerId]
  }

  /* SOCKET METHODS */

  // Return object containing client side data based on state of turn

  createUpdate() {
    switch (this.status) {
      case ("PRE_TURN"):
        return {
          status: this.status,
          drawing_player: this.drawing_player
        }
      case ("IN_TURN"):
        return {
          status: this.status,
          drawing_player: this.drawing_player,
          timer: this.timer,
          word: this.word
        }
      case ("POST_TURN"):
        return {
          status: this.status,
          drawing_player: this.drawing_player,
          points: this.getPointsOrdered(),
          word: this.word
        }
      default:
        return {
          status: this.status
        }
    }
  }

  // Wrap sending game updates from game into its own method

  sendGameUpdateToAll() {
    this.round.sendGameUpdateToAll()
  }

}

module.exports = Turn