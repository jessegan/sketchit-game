import React from 'react'

const SubmitButton = ({className , options}) => {
  return (
    <input className={`btn ${className}`} type='submit' { ...options }/>
  )
}

export default SubmitButton
