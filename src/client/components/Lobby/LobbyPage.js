import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreatePlayer from './CreatePlayer'
import Menu from '../Menu/Menu'

import { subscribeToLobby } from '../../networking'
import { joinLobby, leaveLobby, updateLobby } from '../../actions/lobby'
import Game from '../Game/Game'

export class LobbyPage extends Component {

  componentDidMount() {
    subscribeToLobby(this.props.updateLobby)
  }

  componentWillUnmount() {
    this.props.leaveLobby()
  }

  createPlayer = (formData) => {
    const playerData = {
      code: this.props.match.params.code,
      ...formData
    }

    this.props.joinLobby(playerData)
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
    joinLobby: (playerData) => dispatch(joinLobby(playerData)),
    leaveLobby: () => dispatch(leaveLobby())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage)
