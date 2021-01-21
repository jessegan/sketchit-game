import { getSocketId } from '../networking'

export default function lobby(state={
  userId: getSocketId(),
  code: null,
  playerCreated: false,
  status: "LOADING",
  players: null,
  host: null
},action){

  switch(action.type){
    case("UPDATE_LOBBY"):
      return Object.assign({}, state, action.payload)
    case("JOIN_LOBBY"):
      return Object.assign({}, state, {
        playerCreated: true
      })
    case("LEAVE_LOBBY"):
      return Object.assign({}, state, {
        code: null,
        playerCreated: false,
        status: "LOADING",
        players: null,
        host: null
      })
    default:
      return state
  }
}