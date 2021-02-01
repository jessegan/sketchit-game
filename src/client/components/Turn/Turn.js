import React, { Component } from 'react'
import { connect } from 'react-redux'

import InTurn from './InTurn'
import PostTurn from './PostTurn'
import PreTurn from './PreTurn'

export class Turn extends Component {

  renderContent() {
    switch(this.props.status) {
      case("PRE_TURN"):
        return (<PreTurn drawing_player={ this.props.players[this.props.drawing_player] } />)
      case("IN_TURN"):
        return (<InTurn />)
      case("POST_TURN"):
        return (<PostTurn players={ this.props.players } points={ this.props.points }/>)
    }
  }

  render() {
    return (
      <div className="turn-container height-100">
        { this.renderContent() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    status: state.game.round.turn.status,
    drawing_player: state.game.round.turn.drawing_player,
    points: state.game.round.turn.points,
    players: state.lobby.players
  }
}

export default connect(mapStateToProps)(Turn)
