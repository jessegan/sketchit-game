import React, { Component } from 'react'
import { CirclePicker } from 'react-color'

/**
 * ColorPicker
 * 
 * Contains Slider picker from react-color
 */

export class ColorPicker extends Component {

  handleChange = (color,e) => {
    this.props.onColorChange(color)
  }

  render() {
    return (
      <div className="align-hori-center color-picker">
        <CirclePicker color={ this.props.color } width={"100%"} circleSize={20} circleSpacing={5} onChange={this.handleChange} />
      </div>
    )
  }
}

export default ColorPicker
