import React from 'react'
import ScoresList from '../Players/ScoresList'
import Round from '../Round/Round'

const InGame = ({ players, scores, current_round, round }) => {
  return (
    <div className="in-game-container grid">
      <ScoresList players={ players } scores={ scores } round={ round } />
      <Round round={ round } scores={ scores } players={ players } current_round={ current_round }/>
    </div>
  )
}

export default InGame
