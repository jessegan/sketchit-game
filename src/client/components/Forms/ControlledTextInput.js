import React from 'react'

/**
 * name, value, onChange, and other options passed down from props
 */

const ControlledTextInput = ({ className, options }) => {
  return (
    <input className={`${className}`} type='text' {...options} />
  )
}

export default ControlledTextInput
