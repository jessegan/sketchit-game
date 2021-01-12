import React from 'react'

const Header = ({round, turn}) => {
  return (
    <div className="game-header flex">
      <div className="header-sidebar flex">
        <h3>Round { round.number }</h3>
      </div>
      <div className="header-content text-center">
      </div>
    </div>
  )
}

export default Header
