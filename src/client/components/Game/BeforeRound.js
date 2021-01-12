import React, { Component } from 'react'

export class BeforeRound extends Component {

  render() {
    return (
      <div className="before-round-content">
        <h1 className="text-center">Round { this.props.round.number } Starting Soon...</h1>
      </div>
    )
  }
}

export default BeforeRound
