import React, { Component } from 'react'
import CreatePlayer from './CreatePlayer'
import Menu from '../Menu/Menu'

import { joinLobby, leaveLobby, subscribeToPlayers, subscribeToLobbyStatus, getSocketId } from '../../networking'
import Game from '../Game/Game'

export class LobbyPage extends Component {

  state = {
    userId: null,
    lobbyStatus: "menu",
    players: [],
    host: null
  }

  // TESTING
  // state = {
  //   playerCreated: true,
  //   gameStatus: "menu"
  // }

  componentDidMount() {
    subscribeToPlayers(this.updatePlayers)
    subscribeToLobbyStatus(this.updateLobbyStatus)
  }

  componentWillUnmount() {
    this.socketCleanup()
  }

  updatePlayers = ({players, host}) => {
    this.setState({
      players: players,
      host: host
    })
  }

  updateLobbyStatus = (status) => {
    this.setState({
      lobbyStatus: status
    })
  }

  socketCleanup = () => {
    leaveLobby(this.props.match.params.code)
  }

  createPlayer = (playerData) => {
    joinLobby(this.props.match.params.code, playerData.username,playerData.color)

    this.setState({
      userId: getSocketId()
    })
  }

  renderLobby = () => {
    if (this.state.userId){
      switch(this.state.lobbyStatus){
        case("menu"):
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
