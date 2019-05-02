import {combineReducers} from 'redux'
import events from './events'
import users from './users'
import businesses from './businesses'
import places from './places'

const rootReducer = combineReducers({
  users,
  events,
  businesses,
  places
})

export default rootReducer
