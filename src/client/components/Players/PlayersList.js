import React, { Component } from 'react'

import { requestPlayers, subscribeToPlayers, unsubscribeToPlayers } from '../../networking'
import MainCard from '../Cards/MainCard'

import PlayerDiv from './PlayerDiv'

/**
 * Requires code to be passed down in order to load players and connect to lobby socket
 */

export class PlayersList extends Component {

  state = {
    players: [
      {
        username: "test1",
        color: "#AAAAAA"
      },
      {
        username: "usernamewithmax",
        color: "#BBBBBB"
      },
      {
        username: "test3",
        color: "#CCCCCC"
      },
      {
        username: "test4",
        color: "#DDDDDD"
      },

    ]
  }

  componentDidMount() {
    // requestPlayers(this.props.code)
    // subscribeToPlayers(this.updatePlayers)
  }

  componentWillUnmount() {
    //unsubscribeToPlayers()
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
        <h2 className="text-center">Players</h2>
        <div className="players-list grid block">
          { this.renderPlayerDivs() }
        </div>
      </MainCard>

    )
  }
}

export default PlayersList