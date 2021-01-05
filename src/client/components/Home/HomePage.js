import React from 'react'
import BlockButton from '../Buttons/BlockButton'
import MainCard from '../Cards/MainCard'
import JoinLobby from './JoinLobby'

import { createLobby } from '../../networking'

const HomePage = (props) => {

  const onClick = () => {
    createLobby()
      .then(resp => resp.json())
      .then(data => props.history.push(`/lobby/${data.code}`))
  }

  return (
    <div className="homepage">
      <MainCard >
        <JoinLobby history={ props.history } />
        <p className="text-center">----</p>
        <BlockButton className={"btn-secondary"} text={"Create Lobby"} onClick={ onClick } />
      </MainCard>
    </div>
  )
}

export default HomePage
