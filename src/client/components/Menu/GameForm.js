import React, { Component } from 'react'
import SubmitButton from '../Buttons/SubmitButton'

export class GameForm extends Component {

  render() {
    return (
      <div>
        <p>Select your game options and then hit play!</p>
        <form>
          <label>Number of Rounds</label>
          <input type='number' name="rounds" disabled={ this.props.disabled }/>
          <label>Number of Skips</label>
          <input type='number' name="skips" disabled={ this.props.disabled }/>
          <SubmitButton className={"btn-primary"} options={{value: "Play!", disabled: this.props.disabled}} />
        </form>
        <p>Rules: asdfasdfasdfasdf</p>
      </div>
    )
  }
}

export default GameForm
