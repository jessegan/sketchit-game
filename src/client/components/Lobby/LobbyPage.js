import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreatePlayer from './CreatePlayer'
import Menu from '../Menu/Menu'
import LoadingPage from '../Loading/LoadingPage'

import { checkLobbyPromise, subscribeToLobby } from '../../networking'
import { joinLobby, leaveLobby } from '../../actions/lobby'
import Game from '../Game/Game'

export class LobbyPage extends Component {

  state={
    validLobby: false
  }

  componentDidMount() {
    checkLobbyPromise(this.props.match.params.code)
      .then(resp => {
        console.log(resp.message)
        this.setState({
          validLobby: true
        })
      })
      .catch(err => {
        console.log(err.message)
        this.props.history.push('/')
      })
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

    subscribeToLobby()
  }

  renderLobby = () => {
    if (this.props.playerCreated && this.props.code){
      switch(this.props.status){
        case("IN_MENU"):
          return (<Menu code={ this.props.code } userId={ "" } host={ "1" } />) // Menu component
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
    if (this.state.validLobby) {
      return (
        <div className="lobbypage">
          { this.renderLobby() }
        </div>
      )
    } else {
      return (
        <LoadingPage message="Connecting to lobby..." />
      )
    }
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
    joinLobby: (playerData) => dispatch(joinLobby(playerData)),
    leaveLobby: () => dispatch(leaveLobby())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage)
