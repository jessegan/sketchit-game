import React, { Component } from 'react'

import { requestPlayers, subscribeToPlayers, unsubscribeToPlayers } from '../../networking'
import MainCard from '../Cards/MainCard'

import PlayerDiv from './PlayerDiv'

/**
 * Requires code to be passed down in order to load players and connect to lobby socket
 */

export class PlayersList extends Component {

  state = {
    players: []
  }

  componentDidMount() {
    requestPlayers(this.props.code)
    subscribeToPlayers(this.updatePlayers)
  }

  componentWillUnmount() {
    unsubscribeToPlayers()
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
      <MainCard styles={{ width: "300px" }}>
        <h1 className="text-center text-underline">Players</h1>
        <div className="players-list grid">
          { this.renderPlayerDivs() }
        </div>
      </MainCard>

    )
  }
}

export default PlayersList