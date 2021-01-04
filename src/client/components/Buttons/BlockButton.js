import React from 'react'

const BlockButton = ({className,options,text}) => {
  return (
    <button className={`btn btn-block ${className}`} {...options} >{ text }</button>
  )
}

export default BlockButton
