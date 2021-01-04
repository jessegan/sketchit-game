import React, { Component } from 'react'
import SubmitButton from '../Buttons/SubmitButton'
import ControlledTextInput from '../Forms/ControlledTextInput'

export class JoinLobby extends Component {

  state = {
    code: ""
  }

  handleCodeInput = e => {
    // check if valid character
    const regex = RegExp('^[a-zA-Z0-9]*$')

    if (regex.test(e.target.value)) {
      this.setState({
        code: e.target.value.toUpperCase()
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    if (true) { // TODO: add validation for lobby existing
      this.props.history.push(`/lobby/${this.state.code}`)
    }

    console.log("JOIN FORM SUBMITTED")
  }

  getCodeTextInputOptions = () => {
    return {
      name: "code",
      value: this.state.code,
      onChange: this.handleCodeInput,
      placeholder: "Enter Code",
      maxLength: 6,
      autoComplete: "off",
      className: "text-center"
    }
  }

  getSubmitButtonOptions = () => {
    return {
      value: "Join"
    }
  }

  render() {
    return (
      <div className="join-lobby form-container">
        <form onSubmit={ this.handleSubmit } >
          <ControlledTextInput {...this.getCodeTextInputOptions()} /> 
          <SubmitButton className={"btn-primary btn-block"} options={this.getSubmitButtonOptions()} />
        </form>
      </div>
    )
  }
}

export default JoinLobby
