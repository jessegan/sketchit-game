import React, { Component } from 'react'

import { socket } from '../../networking'

import PlayerDiv from './PlayerDiv'

/**
 * Requires code to be passed down in order to load players and connect to lobby socket
 */

export class PlayersList extends Component {

  state = {
    players: []
  }

  componentDidMount() {
    socket.emit("INIT_PLAYERS",this.props.code)

    socket.on("UPDATE_PLAYERS", this.updatePlayers)
  }

  updatePlayers = ({players}) => {
    this.setState({
      players: players
    })
  }

  renderPlayerDivs = () => {
    return this.state.players.map((player,i) => {
      return (<PlayerDiv key={i} player={ player } />)
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