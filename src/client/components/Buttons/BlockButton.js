import React from 'react'

const BlockButton = ({className,text,onClick}) => {
  return (
    <button className={`btn btn-block ${className}`} onClick={ onClick } >{ text }</button>
  )
}

export default BlockButton
