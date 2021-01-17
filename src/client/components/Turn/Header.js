import React from 'react'

const Header = ({ timer }) => {
  return (
    <div className="in-turn-header">
      <h1 className="text-center">{ timer }</h1>
    </div>
  )
}

export default Header
