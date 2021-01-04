import React, { Component } from 'react'
import CreatePlayer from './CreatePlayer'

export class LobbyPage extends Component {

  state = {
    playerCreated: false,
    gameStatus: "menu"
  }

  createPlayer = () => {
    this.setState({
      playerCreated: true
    })
  }

  renderLobby = () => {
    if (this.state.playerCreated){
      switch(this.state.gameStatus){
        case("menu"):
          return (<></>) // Menu component
        case ("playing"):
          return (<></>) // Game component
        case ("post-game"):
          return (<></>) // Post-game component
        default: 
          return (<></>) // Some error page
      }
    } else {
      return (<CreatePlayer />) // CreatePlayer Component
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
