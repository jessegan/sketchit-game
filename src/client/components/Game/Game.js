import React, { Component } from 'react'
import { connect } from 'react-redux'

import MainCard from '../Cards/MainCard'

import { joinGamePromise } from '../../networking'
import InGame from './InGame'
import LoadingPage from '../Loading/LoadingPage'

export class Game extends Component {

  state={
    loaded: false
  }

  componentDidMount() {
    joinGamePromise(this.props.code)
      .then(() => {
        this.setState({
          loaded: true
        })
      })
  }

  renderContent() {
    switch(this.state.status) {
      case ("IN_GAME"):
        return (
          <InGame />
        )
      case("END_GAME"):
      default:
        return <></> // TODO: Add error page
    }
  }
  
  render() {
    if(this.state.loaded) {
      return (
        <MainCard classes={"game-container align-hori-center"}>
          { this.renderContent() }
        </MainCard>
      )
    } else {
      return (
        <LoadingPage message={ "Loading Game..." } />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    code: state.lobby.code
  }
}

export default connect(mapStateToProps)(Game)
