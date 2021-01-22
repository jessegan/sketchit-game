import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreatePlayer from './CreatePlayer'
import Menu from '../Menu/Menu'
import LoadingPage from '../Loading/LoadingPage'

import { checkLobbyPromise, joinLobbyPromise } from '../../networking'
import { leaveLobby } from '../../actions/lobby'
import Game from '../Game/Game'

export class LobbyPage extends Component {

  state={
    validLobby: false,
    playerCreated: false
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
    joinLobbyPromise(this.props.code, formData)
      .then(()=> {
        this.setState({
          playerCreated: true
        })
      })
  }

  renderLobby = () => {
    if (this.state.playerCreated && this.state.validLobby){
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
    code: state.lobby.code
  }
}

function mapDispatchToProps(dispatch) {
  return {
    leaveLobby: () => dispatch(leaveLobby())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage)
