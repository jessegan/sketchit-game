import { emitJoinLobby, emitLeaveLobby } from '../networking'

export const updateLobby = (lobbyData) => {
  return {
    type: "UPDATE_LOBBY",
    payload: lobbyData
  }
}

export const joinLobby = (playerData) => {
    emitJoinLobby(playerData)

    return {type: "JOIN_LOBBY"}
}

export const leaveLobby = () => {
  emitLeaveLobby()

  return { type: "LEAVE_LOBBY" }
}

  // TESTING
  // state = {
  //   userId: "1",
  //   status: "IN_GAME",
  //   players: {
  //     "1": {
  //       username: "test1",
  //       socketid: "1",
  //       color: "#FF6900"
  //     },
  //     "2": {
  //       username: "test2",
  //       socketid: "2",
  //       color: "#2CCCE4"
  //     },
  //     "3": {
  //       username: "test3",
  //       socketid: "3",
  //       color: "#BA68C8"
  //     },
  //     "4": {
  //       username: "test4",
  //       socketid: "4",
  //       color: "#ABB8C3"
  //     }
  //   },
  //   host: "1"
  // }