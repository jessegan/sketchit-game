import React from 'react'

/**
 * name, value, onChange to be passed in directly
 * 
 * other options will be set as a object
 */

const ControlledTextInput = (props) => {
  return (
    <input type='text' {...props} />
  )
}

export default ControlledTextInput
