import React, { Component } from 'react'

export class Guesses extends Component {

  renderGuessingWord() {

  }

  render() {
    return (
      <div className="in-turn-guesses">
        <div className="guessing-word">
          <h3>{ this.props.word }</h3>
        </div>
      </div>
    )
  }
}

export default Guesses
