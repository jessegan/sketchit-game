const PlayerList = require('./player_list')
const Turn = require('./turn')
const util = require('./utility')

class Round {
  
  constructor(game,options,turn_options) {
    this.game = game
    this.status = "INACTIVE"
    this.player_order = new PlayerList(this.game.playerIds)
    this.turn = new Turn(this, turn_options)
  }

  /* DRIVER METHOD */

  // Starts running through all 3 stages of a round

  async start() {    
    this.reset()

    await this._preRound()
    await this._inRound()
    await this._postRound()

    this._endRound()
  }

  /* INSTANCE METHODS */

  // Resets round state to starting state

  reset() {
    this.player_order.reset()
  }

  // PRE - sends update to all about start of round

  async _preRound() {
    this.status = "PRE_ROUND"
    this.sendGameUpdateToAll()

    await util.wait(1000*5)
  }

  // IN - starts playing turns for every player as a drawing player and applies turn results

  async _inRound() {
    this.status = "IN_ROUND"

    while (this.player_order.hasNext()) {
      await this.turn.start(this.game.playerIds, this.player_order.getNext())
      this._applyTurnResults()
    }
  }
  
  // POST - updates status and waits

  async _postRound() {
    this.status = "POST_ROUND"
    this.sendGameUpdateToAll()
    
    await util.wait(1000*5)
  }

  // END - resets status to inactive

  _endRound() {
    this.status = "INACTIVE"
  }

  // Gets turn results and then applies to game scores

  _applyTurnResults() {
    const results = this.turn.getResults()

    Object.keys(results).forEach((playerId) => {
      this.game.addScore(playerId, results[playerId])
    })
  }

  // adds player mid-round

  addPlayer(playerId) {
    this.player_order.add(playerId)

    if (this.turn.status !== "INACTIVE") {
      this.turn.addPlayer(playerId)
    }
  }

  // remove player mid-round

  removePlayer(playerId) {
    this.player_order.remove(playerId)

    if (this.turn.status !== "INACTIVE") {
      this.turn.removePlayer(playerId)
    }
  }

  /* SOCKET METHODS */

  // Returns object containing data for client

  createUpdate() {
    switch (this.status){
      case ("PRE_ROUND"):
        return {
          status: this.status
        }
      case ("IN_ROUND"):
        return {
          status: this.status,
          turn: this.turn.createUpdate()
        }
      case ("POST_ROUND"): 
        return {
          status: this.status,
          standings: this.game.getStandings()
        }
      default:
        return {
          status: this.status
        }
    }
  }

  // Wrap sending game update to all socket in game into its own method

  sendGameUpdateToAll() {
    this.game.sendGameUpdateToAll()
  }

}

module.exports = Round