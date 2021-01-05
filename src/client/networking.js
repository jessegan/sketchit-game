import io from 'socket.io-client'

export const socket = io(`ws://${window.location.host}`, { reconnection: false })
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

// Emit JOIN_LOBBY to socket w/ code, username, color 
export const joinLobby = (code,username,color) => {
  socket.emit("JOIN_LOBBY", {code , username, color })
}

// Emit LEAVE_LOBBY to socket w/ code
export const leaveLobby = code => {
  socket.emit("LEAVE_LOBBY", code)
}

// Subscribe to players updates
export const subscribeToPlayers = (updateHandler) => {
  socket.on("UPDATE_PLAYERS", updateHandler)
}

// Unsubscribe to players updates
export const unsubscribeToPlayers = () => {
  socket.off("UPDATE_PLAYERS")
}

// Request initial players
export const requestPlayers = (code) => {
  socket.emit("INIT_PLAYERS", code)
}