import React from 'react'

import PlayersList from '../Players/PlayersList'
import LobbyOptions from './LobbyOptions'

const Menu = (props) => {
  return (
    <div className="lobby-menu">
      <LobbyOptions />
      <PlayersList code={ props.code }/>
    </div>
  )
}

export default Menu