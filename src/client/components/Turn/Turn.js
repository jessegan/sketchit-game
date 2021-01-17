import React, { Component } from 'react'
import InTurn from './InTurn'
import PostTurn from './PostTurn'
import PreTurn from './PreTurn'

export class Turn extends Component {

  renderContent() {
    switch(this.props.turn.status) {
      case("PRE_TURN"):
        return (<PreTurn drawing_player={ this.props.players[this.props.turn.drawing_player] } />)
      case("IN_TURN"):
        return (<InTurn turn={ this.props.turn } />)
      case("POST_TURN"):
        return (<PostTurn players={ this.props.players } points={ this.props.turn.points }/>)
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

export default Turn
