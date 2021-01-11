import React, { Component } from 'react'
import CreatePlayer from './CreatePlayer'
import Menu from '../Menu/Menu'

import { joinLobby, leaveLobby, subscribeToLobby, getSocketId } from '../../networking'
import Game from '../Game/Game'

export class LobbyPage extends Component {

  state = {
    userId: null,
    status: "LOADING",
    players: [],
    host: null
  }

  // TESTING
  // state = {
  //   playerCreated: true,
  //   gameStatus: "menu"
  // }

  componentWillUnmount() {
    this.socketCleanup()
  }

  updateLobby = (lobbyData) => {
    this.setState({
      ...lobbyData
    })
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

    joinLobby(playerData)

    this.setState({
      userId: getSocketId()
    })

    subscribeToLobby(this.updateLobby)
  }

  renderLobby = () => {
    if (this.state.userId){
      switch(this.state.status){
        case("IN_MENU"):
          return (<Menu code={ this.props.match.params.code } userId={ this.state.userId } players={ this.state.players } host={ this.state.host } />) // Menu component
        case ("IN_GAME"):
          return (<Game />) // Game component
        case ("post-game"):
          return (<></>) // Post-game component
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
        { this.renderLobby() }
      </div>
    )
  }
}

export default LobbyPage
