const initialState = {
  status: "LOADING",
  scores: {},
  current_round: null,
  round: null
}

export default function game(state=initialState,action){
  switch(action.type){
    default:
      return state
  }
}

/* TESTING */

const initialTestingState = {
  status: "IN_GAME",
  scores: {
    "1": 1000,
    "2": 300,
    "3": 400,
    "4": 0
  },
  current_round: 1,

  round: {
    status: "IN_ROUND",
    standings: ["1","2","3","4"],

    turn: {
      status: "IN_TURN",
      drawing_player: "3",
      word: "apple"
      // points: [
      //   ["4", 500],
      //   ["2", 400],
      //   ["3", 300],
      //   ["1", 0],
      // ]
    }

  }

}