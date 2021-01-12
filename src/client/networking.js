import io from 'socket.io-client'

const socket = io(`ws://${window.location.host}`, { reconnection: false })
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!')
    resolve()
  })
})

export const connect = () => {
  connectedPromise.then(() => {
    socket.on('disconnect', () => {
      console.log("Disconnected from server!")
    })
  })
}

export const createLobby = () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`http://${window.location.host}/lobbies`, options)
}

// Returns socket.id of current user

export const getSocketId = () => {
  return socket.id
}

/**
 * SOCKET EMITTERS
 */

// Emit JOIN_LOBBY to socket w/ player data from form

export const joinLobby = (playerData) => {
  socket.emit("JOIN_LOBBY", playerData)
}

// Emit LEAVE_LOBBY to socket and subscribe to updates

export const leaveLobby = () => {
  socket.emit("LEAVE_LOBBY")
  unsubscribeToLobby()
}

// Emit START_GAME

export const startGame = (options) => {
  socket.emit("START_GAME", options)
}

/* SOCKET SUBSCRIPTIONS */

// Subscribe to lobby updates

export const subscribeToLobby = (updateHandler) => {
  socket.on("UPDATE_LOBBY", updateHandler)
  socket.emit("CONNECT_TO_LOBBY")
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