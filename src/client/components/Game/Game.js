import React, { Component } from 'react'
import MainCard from '../Cards/MainCard'

import { subscribeToGameUpdates } from '../../networking'

export class Game extends Component {

  state = {
    status: "BEFORE_ROUND"
  }

  componentDidMount() {
    subscribeToGameUpdates(this.updateGame)
  }

  updateGame = (payload) => {
    this.setState(payload)
  }
  

  render() {
    return (
      <MainCard>
        <h1>{ this.state.status }</h1>
      </MainCard>

    )
  }
}

export default Game
