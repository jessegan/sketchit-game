import React, { Component } from 'react'
import MainCard from '../Cards/MainCard'

import { subscribeToGame } from '../../networking'

export class Game extends Component {

  state = {
    status: "GAME_LOADING",
    round: null,
    turn: null
  }

  componentDidMount() {
    subscribeToGame(this.updateGame)
  }

  updateGame = (gameData) => {
    this.setState({
      ...gameData,
      round: gameData.round,
      turn: gameData.turn
    })
  }
  
  render() {
    return (
      <MainCard>
      </MainCard>

    )
  }
}

export default Game
