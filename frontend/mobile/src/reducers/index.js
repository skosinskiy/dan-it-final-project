import {combineReducers} from 'redux'
import businesses from './businesses'
import events from './events'

const rootReducer = combineReducers({
  businesses,
  events
})

export default rootReducer