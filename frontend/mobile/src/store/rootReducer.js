import {combineReducers} from 'redux'
import events from './events'
import users from './users'
import businesses from './businesses'

const rootReducer = combineReducers({
  users,
  events,
  businesses
})

export default rootReducer
