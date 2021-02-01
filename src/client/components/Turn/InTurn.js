import React from 'react'
import Guesses from './Guesses'
import Header from './Header'
import CanvasContainer from '../Canvas/CanvasContainer'
import { useSelector } from 'react-redux'

const InTurn = () => {
  
  const turn = useSelector(state => state.game.round.turn)

  return (
    <div className="in-turn-container grid height-100">
      <Header timer={ turn.timer } />
      <Guesses word={ turn.word } />
      <CanvasContainer />
    </div>
  )
}

export default InTurn
