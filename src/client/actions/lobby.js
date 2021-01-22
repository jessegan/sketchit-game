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
  return { type: "lobby/leave" }
}