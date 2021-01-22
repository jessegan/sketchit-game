import React, { Component } from 'react'
import { connect } from 'react-redux'

import MainCard from '../Cards/MainCard'
import PlayerDiv from './PlayerDiv'

/**
 * Requires code to be passed down in order to load players and connect to lobby socket
 */

export class PlayersList extends Component {

  renderPlayerDivs = () => {
    return this.props.players.map((player,i) => {
      return (<PlayerDiv key={i} player={ player } isHost={ player.socketid === this.props.host }/>)
    })
  }

  render() {
    return (
      <MainCard styles={{ width: "300px" }}>
        <h2 className="text-center">Players</h2>
        <div className="players-list grid block">
          { this.renderPlayerDivs() }
        </div>
      </MainCard>
    )
  }
}

function mapStateToProps(state) {
  return {
    players: Object.values(state.lobby.players),
    host: state.lobby.host
  }
}

export default connect(mapStateToProps)(PlayersList)