import React, { Component } from 'react'
import InRound from './InRound'
import PostRound from './PostRound'
import PreRound from './PreRound'

export class Round extends Component {

  renderContent() {
    switch(this.props.round.status) {
      case("PRE_ROUND"):
        return (<PreRound current_round={ this.props.current_round } />)
      case("IN_ROUND"):
        return (<InRound turn={ this.props.round.turn } players={ this.props.players } />)
      case("POST_ROUND"):
        return (<PostRound players={ this.props.players } current_round={ this.props.current_round } scores={ this.props.scores } standings={ this.props.round.standings }/>)
    }
  }

  render() {
    return (
      <div className="round-container height-100">
        { this.renderContent() }
      </div>
    )
  }
}

export default Round
