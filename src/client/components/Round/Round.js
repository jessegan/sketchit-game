import React, { Component } from 'react'
import { connect } from 'react-redux'

import InRound from './InRound'
import PostRound from './PostRound'
import PreRound from './PreRound'

export class Round extends Component {

  renderContent() {
    switch(this.props.status) {
      case("PRE_ROUND"):
        return (<PreRound current_round={ this.props.current_round } />)
      case("IN_ROUND"):
        return (<InRound />)
      case("POST_ROUND"):
        return (<PostRound players={ this.props.players } current_round={ this.props.current_round } scores={ this.props.scores } standings={ this.props.standings }/>)
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

function mapStateToProps(state) {
  return {
    status: state.game.round.status,
    current_round: state.game.current_round,
    standings: state.game.round.standings,
    scores: state.game.scores,
    players: state.lobby.players
  }
}

export default connect(mapStateToProps)(Round)
