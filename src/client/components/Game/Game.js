import React, { Component } from 'react'
import MainCard from '../Cards/MainCard'

import { subscribeToGame } from '../../networking'
import ScoresList from '../Players/ScoresList'
import Header from './Header'

export class Game extends Component {

  // state = {
  //   status: "GAME_LOADING",
  //   round: null,
  //   turn: null
  // }

  // TESTING
  state = {
    status: "BEFORE_ROUND",
    round: {
      number: 1
    },
    turn: {
      drawing_player: null
    },
    scores: {
      1: 1000,
      2: 300,
      3: 400,
      4: 0
    }
  }

  // Remove for testing without socket updates
  // componentDidMount() {
  //   subscribeToGame(this.updateGame)
  // }

  updateGame = (gameData) => {
    this.setState({
      ...gameData,
      round: gameData.round,
      turn: gameData.turn
    })
  }
  
  render() {
    return (
      <MainCard classes={"game-container align-hori-center grid"}>
        <Header round={ this.state.round } player={ this.state.turn } />
        <ScoresList players={ this.props.players } scores={ this.state.scores } />
        <div className="game-canvas" style={{backgroundColor: "black"}}></div>
        <div className="game-chat" style={{backgroundColor: "yellow"}}></div>
      </MainCard>

    )
  }
}

export default Game
