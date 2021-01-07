import React, { Component } from 'react'
import CreatePlayer from './CreatePlayer'
import Menu from '../Menu/Menu'

import { joinLobby, leaveLobby, requestPlayers, subscribeToPlayers, unsubscribeToPlayers } from '../../networking'

export class LobbyPage extends Component {

  state = {
    playerCreated: false,
    gameStatus: "menu",
    players: []
  }

  // TESTING
  // state = {
  //   playerCreated: true,
  //   gameStatus: "menu"
  // }

  componentDidMount() {
    requestPlayers(this.props.match.params.code)
    subscribeToPlayers(this.updatePlayers)
  }

  componentWillUnmount() {
    this.socketCleanup()
    unsubscribeToPlayers()
  }

  updatePlayers = ({players}) => {
    this.setState({
      players: players
    })
  }

  socketCleanup = () => {
    leaveLobby(this.props.match.params.code)
  }

  createPlayer = (playerData) => {
    joinLobby(this.props.match.params.code, playerData.username,playerData.color)

    this.setState({
      playerCreated: true
    })
  }

  renderLobby = () => {
    if (this.state.playerCreated){
      switch(this.state.gameStatus){
        case("menu"):
          return (<Menu code={ this.props.match.params.code } players={ this.state.players } />) // Menu component
        case ("playing"):
          return (<></>) // Game component
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
