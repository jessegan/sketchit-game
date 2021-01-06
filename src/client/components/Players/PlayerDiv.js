import React from 'react'

const PlayerDiv = ({player}) => {
  return (
    <div className="player text-center">
      <span className="dot align-hori-center" style={{backgroundColor: player.color}} ></span>
      <span className="username">{ player.username }</span>
    </div>
  )
}

export default PlayerDiv