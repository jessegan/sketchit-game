import React from 'react'
import Turn from '../Turn/Turn'

const InRound = ({ turn, players }) => {
  return (
    <div className="in-round-container height-100">
      <Turn turn={ turn } players={ players } />
    </div>
  )
}

export default InRound
