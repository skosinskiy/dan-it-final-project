import {combineReducers} from 'redux'
import businesses from './businesses'
import events from './events'
import places from '../store/places/reducer'

const rootReducer = combineReducers({
  businesses,
  events,
  places
})

export default rootReducer