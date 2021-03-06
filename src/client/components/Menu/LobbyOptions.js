import React from 'react'
import MainCard from '../Cards/MainCard'
import GameForm from './GameForm'

const LobbyOptions = (props) => {
  return (
    <MainCard >
      <GameForm code={ props.code } disabled={ props.userId !== props.host} />
    </MainCard>
  )
}

export default LobbyOptions