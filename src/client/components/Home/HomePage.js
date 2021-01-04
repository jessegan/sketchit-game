import React from 'react'
import BlockButton from '../Buttons/BlockButton'
import MainCard from '../Cards/MainCard'
import JoinLobby from './JoinLobby'

const HomePage = () => {
  return (
    <div className="homepage">
      <MainCard >
        <JoinLobby />
        <p className="text-center">----</p>
        <BlockButton className={"btn-secondary"} text={"Create Lobby"} />
      </MainCard>
    </div>
  )
}

export default HomePage
