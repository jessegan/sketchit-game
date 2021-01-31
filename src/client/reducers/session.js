const initialState = {
  userId: null
}

export default function session(state=initialState, action) {
  switch(action.type) {
    case 'session/connect':
      return Object.assign({}, state, action.payload)
    default:
      return Object.assign({}, state)
  }
}

/* TESTING STATE */

const initialTestState = {
  userId: "1"
}