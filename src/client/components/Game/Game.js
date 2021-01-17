import React, { Component } from 'react'
import MainCard from '../Cards/MainCard'

import { subscribeToGame } from '../../networking'
import InGame from './InGame'

export class Game extends Component {

  state = {
    status: "GAME_LOADING",
    scores: {},
    current_round: null,
    round: null
  }

  // TESTING
  // state = {
  //   status: "IN_GAME",
  //   scores: {
  //     "1": 1000,
  //     "2": 300,
  //     "3": 400,
  //     "4": 0
  //   },
  //   current_round: 1,

  //   round: {
  //     status: "POST_ROUND",
  //     standings: ["1","2","3","4"]

  //     // turn: {
  //     //   status: "POST_TURN",
  //     //   drawing_player: "3",
  //     //   word: "apple",
  //     //   points: [
  //     //     ["4", 500],
  //     //     ["2", 400],
  //     //     ["3", 300],
  //     //     ["1", 0],
  //     //   ]
  //     // }

  //   }

  // }

  // Remove for testing without socket updates
  componentDidMount() {
    subscribeToGame(this.updateGame)
  }

  // componentWillUnmount() {
  // }

  updateGame = (gameData) => {

    console.log(gameData)

    this.setState({
      status: gameData.status,
      current_round: gameData.current_round,
      scores: gameData.scores,
      round: gameData.round
    })
  }

  renderContent() {
    switch(this.state.status) {
      case ("IN_GAME"):
        return (
          <InGame players={ this.props.players } scores={ this.state.scores } current_round={ this.state.current_round } round= { this.state.round } />
        )
      case("END_GAME"):
      default:
        return <></> // TODO: Add error page
    }
  }
  
  render() {
    return (
      <MainCard classes={"game-container align-hori-center"}>
        { this.renderContent() }
      </MainCard>

    )
  }
}

export default Game
