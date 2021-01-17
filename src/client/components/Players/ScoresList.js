import React from 'react'
import PlayerDiv from './PlayerDiv'
import PlayerScoreDiv from './PlayerScoreDiv'

const ScoresList = ({players, scores, round}) => {

  const renderedPlayers = Object.values(players).map( (player,i) => {
    return <PlayerScoreDiv key={i} player={ player } score={ scores[player.socketid] } />
  })

  const renderDrawingPlayer = () => {
    if (round.status === "IN_ROUND") {
      return (
        <div className="drawing-player">
          <h3 className="text-center">Drawing Now</h3>
          <h3 className="text-center" style={{color: "cornflowerblue"}}>{ players[round.turn.drawing_player].username }</h3>
        </div>
      )
    } else {
      return (<></>)
    }
  }

  return (
    <div className="score-list" >
      { renderDrawingPlayer() }
      { renderedPlayers }
    </div>
  )
}

export default ScoresList
