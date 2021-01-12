import React from 'react'

const PlayerScoreDiv = ({player, score}) => {
  return (
    <div className="player-line">
      <span className="dot" style={{backgroundColor: player.color}} ></span>
      <span className="username">{ player.username }</span>
      <span className="score">{ score }</span>
    </div>
  )
}

export default PlayerScoreDiv
