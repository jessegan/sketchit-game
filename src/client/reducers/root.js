import { combineReducers } from 'redux'
import lobby from './lobby'
import session from './session'

export default combineReducers({
  session,
  lobby
})