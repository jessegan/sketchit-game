// const initialTestingState = 
// {
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

export default function lobby(state={
  code: null,
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

    case("LEAVE_LOBBY"):
      return Object.assign({}, state, {
        code: null,
        status: "LOADING",
        players: null,
        host: null
      })

    default:
      return state
  }
}