const util = require('./utility')
const Round = require('./round')
const server = require('./server')

class Game {
  
  constructor(lobby, options) {
    this.lobby = lobby

    this.status = "IN_GAME"

    this.rounds = options.rounds || 3
    this.current_round = 1
    this.round = new Round(this,options.round_options,options.turn_options)
  }

  /* GETTERS AND SETTERS */

  // GET - players of lobby (as object)

  get playerIds() {
    return Object.keys(this.lobby.players)
  }

  /* DRIVER METHOD */

  // Driver function for game will play {this.rounds} number of rounds

  async start() {
    this._reset()

    await this._inGame()
    await this._endGame()
  }

  /* INSTANCE METHODS */

  // Reset - sets game scores for all players in lobby to 0

  _reset() {
    this.scores = {}
    Object.keys(this.lobby.players).forEach( p => {
      this.scores[p] = 0
    })
  }

  // IN - starts rounds until finished all of them

  async _inGame() {
    while (this.current_round <= this.rounds) {
      await this.round.start()
      this.current_round ++
    }
  }

  // END - sends end game status to all clients

  async _endGame() {
    this.status = "END_GAME"
    this.sendGameUpdateToAll()

    await util.wait(1000*3)
  }

  // Adds a given points to player's score

  addScore(playerId, points) {
    this.scores[playerId] += points
  }

  // Returns ordered list of playerId's by current score

  getStandings() {
    return Object.keys(this.scores).sort((a,b) => this.scores[b] - this.scores[a])
  }

  // Adds player that joins mid-game

  addPlayer(playerId) {
    this.scores[playerId] = 0

    if (this.round.status !== "INACTIVE") {
      this.round.addPlayer(playerId)
    }
  }

  // Remove player that joins mid-game

  removePlayer(playerId) {
    delete this.scores[playerId]

    if (this.round.status !== "INACTIVE") {
      this.round.removePlayer(playerId)
    }
  }

  /* SOCKET METHODS */
  
  // Create game data object to send through sockets

  createUpdate() {
    switch(this.status) {
      case ("IN_GAME"):
        return {
          status: this.status,
          scores: this.scores,
          current_round: this.current_round,
          round: this.round.createUpdate()
        }
      case ("END_GAME"): 
        return {
          status: this.status,
          scores: this.scores
        }
      default:
        return{
          status: this.status,
          standings: this.getStandings()
        }
    }
  }

  // Sends game updates to lobby

  sendGameUpdateToAll() {
    server.emitToLobby(this.lobby.code, "UPDATE_GAME", this.createUpdate())

    console.log("Game update sent to all:", this.lobby.code)
  }

  // Sends game update to specific player

  sendGameUpdateToPlayer(playerSocket) {
    playerSocket.emit("UPDATE_GAME", this.createUpdate())

    console.log("Game update sent to player:", playerSocket.id)
  }

}

module.exports = Game