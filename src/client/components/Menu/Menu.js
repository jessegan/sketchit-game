import React from 'react'

import PlayersList from '../Players/PlayersList'
import LobbyOptions from './LobbyOptions'

const Menu = (props) => {
  return (
    <div className="lobby-menu flex">
      <LobbyOptions />
      <PlayersList players={ props.players } />
    </div>
  )
}

export default Menu