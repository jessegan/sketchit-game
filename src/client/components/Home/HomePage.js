import React from 'react'
import BlockButton from '../Buttons/BlockButton'
import MainCard from '../Cards/MainCard'
import JoinLobby from './JoinLobby'

import { createLobbyPromise } from '../../networking'

const HomePage = (props) => {

  const onClick = () => {
    createLobbyPromise()
      .then(resp => resp.json())
      .then(data => props.history.push(`/lobby/${data.code}`))
  }

  return (
    <div className="homepage">
      <MainCard classes={"align-hori-center"}>
        <JoinLobby history={ props.history } />
        <p className="text-center">----</p>
        <BlockButton className={"btn-secondary"} text={"Create Lobby"} onClick={ onClick } />
      </MainCard>
    </div>
  )
}

export default HomePage
