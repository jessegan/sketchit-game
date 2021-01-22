import { combineReducers } from 'redux'
import lobby from './lobby'
import session from './session'
import game from './game'

export default combineReducers({
  session,
  lobby,
  game
})