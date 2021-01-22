import io from 'socket.io-client'
import store from './store'
import { setUserId } from'./actions/session'
import { updateLobby, setLobbyCode } from './actions/lobby'

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

/* FETCH REQUESTS */

export const createLobby = () => {
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

export const emitLeaveLobby = () => {
  socket.emit("LEAVE_LOBBY")
  unsubscribeToLobby()
}

// Emit START_GAME

export const startGame = (options) => {
  socket.emit("START_GAME", options)
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

export const subscribeToGame = (updateHandler) => {
  socket.on("UPDATE_GAME", updateHandler)
  socket.emit("CONNECT_TO_GAME")
}

// Unsubscribe to game updates

const unsubscribeToGame = () => {
  socket.off("UPDATE_GAME")
}