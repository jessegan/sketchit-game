export default function session(state={
  userId: null
}, action) {
  switch(action.type) {
    case 'session/connect':
      return Object.assign({}, state, action.payload)
    default:
      return Object.assign({}, state)
  }
}