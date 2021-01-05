import React, { Component } from 'react'
import SubmitButton from '../Buttons/SubmitButton'
import MainCard from '../Cards/MainCard'
import ColorPicker from '../Forms/ColorPicker'
import ControlledTextInput from '../Forms/ControlledTextInput'

export class CreatePlayer extends Component {

  state = {
    username: "",
    color: "#f44336"
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleColorChange = (color) => {
    this.setState({
      color: color.hex || color
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    // TODO: Add form validation

    this.props.createPlayer(this.state)
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
        <form onSubmit={ this.handleSubmit }>
          <ControlledTextInput className={"text-center"} options={ this.getUsernameInputOptions() }/>
          <h4 className="text-center">Pick a Color</h4>
          <ColorPicker color={ this.state.color } onColorChange={ this.handleColorChange }/>
          <SubmitButton className={"btn-primary btn-block"} options={ this.getSubmitButtonOptions() } />
        </form>
      </MainCard>
    )
  }
}

export default CreatePlayer
