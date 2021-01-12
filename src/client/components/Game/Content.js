import React from 'react'
import BeforeRound from './BeforeRound'

const Content = ( { status, round }) => {

  const renderContent = () => {
    switch(status) {
      case("BEFORE_ROUND"):
        return <BeforeRound round={ round }/>
    }
  }

  return (
    <div className="game-content">
      { renderContent() }
    </div> 
  )
}

export default Content
