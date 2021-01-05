import io from 'socket.io-client'

export const socket = io(`ws://${window.location.host}`, { reconnection: false })

export const createLobby = () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`http://${window.location.host}/lobbies`, options)
}