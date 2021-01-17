import React from 'react'

const PlayerPoints = ({player, rank, points, plus}) => {
  return (
    <div className="player-points-rank">
      <span>{rank}.</span>
      <span className="username">{ player.username }</span>
      <span className="score">{plus && points>0 ? "+ " : ""}{ points }</span>
    </div>
  )
}

export default PlayerPoints
