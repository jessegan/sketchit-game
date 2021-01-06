import React, { Component } from 'react'
import SubmitButton from '../Buttons/SubmitButton'

export class GameForm extends Component {
  render() {
    return (
      <div>
        <p>Select your game options and then hit play!</p>
        <form>
          <label for='rounds'>Number of Rounds</label>
          <input type='number' name="rounds" />
          <label for='skips'>Number of Skips</label>
          <input type='number' name="skips" />
          <SubmitButton className={"btn-primary"} options={{value: "Play!"}} />
        </form>
        <p>Rules: asdfasdfasdfasdf</p>
      </div>
    )
  }
}

export default GameForm
