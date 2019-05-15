import {combineReducers} from 'redux'
import events from './events'
import users from './users'
import businesses from './businesses'
import places from './places'
import chats from './chats'

const rootReducer = combineReducers({
  users,
  events,
  businesses,
  places,
  chats
})

export default rootReducer
