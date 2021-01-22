import io from 'socket.io-client'
import store from './store'
import { setUserId } from'./actions/session'
import { updateLobby, setLobbyCode, leaveLobby } from './actions/lobby'
import { updateGame } from './actions/game'

const socket = io(`ws://${window.location.host}`, { reconnection: false })
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!')
    resolve()
  })
})

/* MAIN METHODS */

// Connect user to socket servers

export const connect = () => {
  connectedPromise.then(() => {

    store.dispatch(setUserId(socket.id))

    socket.on('disconnect', () => {
      console.log("Disconnected from server!")
    })
  })
}

// Add user to lobby and request to load lobby data from socket server

export const joinLobbyPromise = (code, playerData) => {
  return Promise.all([
    subscribeToLobby(),
    emitJoinLobby(code, playerData),
    emitLoadLobby()
  ])
}

// Remove user from lobby and reset store

export const leaveLobbyPromise = () => {
  return Promise.all([
    emitLeaveLobby(),
    unsubscribeToLobby(),
    leaveLobby()
  ])
}

export const createLobbyPromise = () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`http://${window.location.host}/lobbies`, options)
}

export const checkLobbyPromise = (code) => {
  return fetch(`http://${window.location.host}/lobbies/${code}/valid`)
    .then(resp => {
      if (resp.status === 200) {
        store.dispatch(setLobbyCode(code))

        return resp.json()
      } else {
        throw new Error(`Could not find lobby with code: ${code}`)
      }
    })
}

// Starts game on server side

export const startGamePromise = (code, options) => {
  return Promise.all([
    emitStartGame(code, options)
  ])
}

// Promise that fulfills subscribing to and loading game data

export const joinGamePromise = (code) => {
  return Promise.all([
    subscribeToGame(),
    emitLoadGame(code)
  ])
}

// Returns socket.id of current user

export const getSocketId = () => {
  return socket.id
}

/**
 * SOCKET EMITTERS
 */

// Emit JOIN_LOBBY to socket w/ player data from form

const emitJoinLobby = (code, playerData) => {
  socket.emit("JOIN_LOBBY", code, playerData)
}

// Emit LOAD_LOBBY to socket

const emitLoadLobby = () => {
  socket.emit("LOAD_LOBBY")
}

// Emit LEAVE_LOBBY to socket and subscribe to updates

const emitLeaveLobby = () => {
  socket.emit("LEAVE_LOBBY")
}

// Emit START_GAME

const emitStartGame = (code, options) => {
  socket.emit("START_GAME", code, options)
}

// Emit LOAD_GAME to socket

const emitLoadGame = (code) => {
  socket.emit("LOAD_GAME", code)
}

/* SOCKET SUBSCRIPTIONS */

// Subscribe to lobby updates

export const subscribeToLobby = () => {
  socket.on("UPDATE_LOBBY", (lobbyData) => {
    store.dispatch(updateLobby(lobbyData))
  })
}

// Unsubscribe to lobby updates

const unsubscribeToLobby = () => {
  socket.off("UPDATE_LOBBY")
}

// Subscribe to game updates from server

export const subscribeToGame = () => {
  socket.on("UPDATE_GAME", (gameData) => {
    store.dispatch(updateGame(gameData))
  })
}

// Unsubscribe to game updates

const unsubscribeToGame = () => {
  socket.off("UPDATE_GAME")
}