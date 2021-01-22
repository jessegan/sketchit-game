import React from 'react'

import PlayersList from '../Players/PlayersList'
import LobbyOptions from './LobbyOptions'

const Menu = (props) => {
  return (
    <div className="lobby-menu flex">
      <LobbyOptions code={ props.code } userId={ props.userId } host= { props.host } />
      <PlayersList />
    </div>
  )
}

export default Menu