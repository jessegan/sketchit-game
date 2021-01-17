import React from 'react'
import PlayerPoints from '../Players/PlayerPoints';

const PostTurn = ({ players, points }) => {

  const playerRanks = points.map((p,i) => {
    return (<PlayerPoints key={i} player={ players[p[0]] } rank={i+1} points={ p[1] } plus={true} />)
  });

  return (
    <div className="post-turn height-100">

      <div className="post-turn-rankings align-hori-center">
        { playerRanks }
      </div>
    </div>
  )
}

export default PostTurn
