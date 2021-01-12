import React from 'react'
import PlayerScoreDiv from './PlayerScoreDiv'

const ScoresList = ({players, scores}) => {

  const renderedPlayers = players.map( (player,i) => {
    return <PlayerScoreDiv key={i} player={ player } score={ scores[player.socketid] } />
  })

  return (
    <div className="game-scores" >
      { renderedPlayers }
    </div>
  )
}

export default ScoresList
