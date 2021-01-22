import React, { Component } from 'react'
import SubmitButton from '../Buttons/SubmitButton'

import { startGamePromise } from '../../networking'

export class GameForm extends Component {

  state = {
    rounds: 3,
    round_options: {},
    turn_options: {
      turn_time: 5,
      word_bank: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    startGamePromise(this.props.code, this.state)
  }

  render() {
    return (
      <div>
        <p>Select your game options and then hit play!</p>
        <form onSubmit={ this.handleSubmit }>
          <label>Number of Rounds</label>
          <input type='number' name="rounds" value={ this.state.rounds } disabled={ this.props.disabled }/>
          <SubmitButton className={"btn-primary"} options={{value: "Play!", disabled: this.props.disabled}} />
        </form>
        <p>Rules: asdfasdfasdfasdf</p>
      </div>
    )
  }
}

export default GameForm
