import React, { Component } from 'react'

import PlayerDiv from './PlayerDiv'

/**
 * Requires code to be passed down in order to load players and connect to lobby socket
 */

export class PlayersList extends Component {

  state = {
    players: []
  }

  componentDidMount() {
    // connect to socket

    // recieve initial players list by emitting 'init_players'
  }

  renderPlayerDivs = () => {
    return this.state.players.map((player,i) => {
      return (<PlayerDiv id={i} player={ player } />)
    })
  }

  render() {
    return (
      <div className="players-list">
        { this.renderPlayerDivs() }
      </div>
    )
  }
}

export default PlayersList