import React from 'react'

const PreTurn = ({ drawing_player }) => {
  return (
    <div className="pre-turn">
      <h1>{ drawing_player.username } is drawing next!</h1>
    </div>
  )
}

export default PreTurn
