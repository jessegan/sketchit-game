import { emitLeaveLobby } from '../networking'

export const setLobbyCode = (code) => {
  return {
    type: "lobby/set",
    payload: code
  }
}

export const updateLobby = (lobbyData) => {
  return {
    type: "lobby/update",
    payload: lobbyData
  }
}

export const leaveLobby = () => {
  emitLeaveLobby()

  return { type: "LEAVE_LOBBY" }
}