export default function lobby(state={
  code: null,
  playerCreated: false,
  status: "LOADING",
  players: null,
  host: null
},action){

  switch(action.type){
    case("lobby/set"):
      return Object.assign({}, state, {
        code: action.payload
      })
    case("lobby/update"):
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