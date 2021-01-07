import React, { Component } from 'react'
import SubmitButton from '../Buttons/SubmitButton'

import { startGame } from '../../networking'

export class GameForm extends Component {

  state = {
    rounds: 3
  }

  handleSubmit = (e) => {
    e.preventDefault()

    startGame(this.props.code, this.state)
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
