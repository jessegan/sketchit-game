import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreatePlayer from './CreatePlayer'
import Menu from '../Menu/Menu'

import { leaveLobby, subscribeToLobby } from '../../networking'
import { joinLobby, updateLobby } from '../../actions/lobby'
import Game from '../Game/Game'

export class LobbyPage extends Component {

  componentWillUnmount() {
    this.socketCleanup()
  }

  socketCleanup = () => {
    if (this.state.userId){
      leaveLobby()
    }
  }

  createPlayer = (formData) => {
    const playerData = {
      code: this.props.match.params.code,
      ...formData
    }

    this.props.joinLobby(playerData)

    subscribeToLobby(this.props.updateLobby)
  }

  renderLobby = () => {
    if (this.props.playerCreated && this.props.code){
      switch(this.props.status){
        case("IN_MENU"):
          return (<Menu code={ this.props.code } userId={ "" } players={{} } host={ "1" } />) // Menu component
        case ("IN_GAME"):
          return (<Game players={ this.state.players } />) // Game component
        default: 
          return (<></>) // Some error page
      }
    } else {
      return (<CreatePlayer createPlayer={ this.createPlayer } />) // CreatePlayer Component
    }
  }

  render() {
    return (
      <div className="lobbypage">
        { this.props.playerCreated ? "true":"false"}
        { this.renderLobby() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    status: state.lobby.status,
    playerCreated: state.lobby.playerCreated,
    code: state.lobby.code
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateLobby: (lobbyData) => dispatch(updateLobby(lobbyData)),
    joinLobby: (playerData) => dispatch(joinLobby(playerData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage)
