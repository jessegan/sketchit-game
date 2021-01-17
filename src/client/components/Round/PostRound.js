import React from 'react'
import PlayerPoints from '../Players/PlayerPoints'

const PostRound = ({ players, current_round, scores, standings }) => {

  const playersRanks = standings.map((p,i) => {
    return (<PlayerPoints key={i} player={ players[p] } rank={ i+1 } points={ scores[p] } play={false} />)
  }) 

  return (
    <div className="post-round">
      <h1>Round { current_round } results!</h1>

      <div className="post-round-rankings">
        { playersRanks }
      </div>

    </div>
  )
}

export default PostRound
