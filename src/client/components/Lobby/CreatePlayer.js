import React, { Component } from 'react'
import SubmitButton from '../Buttons/SubmitButton'
import MainCard from '../Cards/MainCard'
import ControlledTextInput from '../Forms/ControlledTextInput'

export class CreatePlayer extends Component {

  state = {
    username: ""
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getUsernameInputOptions = () => {
    return {
      placeholder: "Enter Username",
      value: this.state.username,
      name: "username",
      maxLength: 20,
      onChange: this.handleInputChange
    }
  }

  getSubmitButtonOptions = () => {
    return {
      value: "Create Player!"
    }
  }

  render() {
    return (
      <MainCard>
        <form>
          <ControlledTextInput className={"text-center"} options={ this.getUsernameInputOptions() }/>
          <SubmitButton className={"btn-primary btn-block"} options={ this.getSubmitButtonOptions() } />
        </form>
      </MainCard>
    )
  }
}

export default CreatePlayer
