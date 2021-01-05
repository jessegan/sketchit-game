import React from 'react'

const PlayerDiv = ({id,player}) => {
  return (
    <div id={id}>
      { player.username }
    </div>
  )
}

export default PlayerDiv