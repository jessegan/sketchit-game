import React from 'react'

import PlayersList from '../Players/PlayersList'
import LobbyOptions from './LobbyOptions'

const Menu = (props) => {
  return (
    <div className="lobby-menu flex">
      <LobbyOptions userId={ props.userId } host= { props.host } />
      <PlayersList players={ props.players } host={ props.host } />
    </div>
  )
}

export default Menu