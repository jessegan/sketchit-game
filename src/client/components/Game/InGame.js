import React from 'react'
import ScoresList from '../Players/ScoresList'
import Round from '../Round/Round'

const InGame = () => {
  return (
    <div className="in-game-container grid">
      <ScoresList />
      <Round />
    </div>
  )
}

export default InGame
