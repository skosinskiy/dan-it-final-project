import {combineReducers} from 'redux'
import {reducer} from './bottomMenu/reducer'

const rootReducer = combineReducers({
  bottomMenuReducer: reducer
})

export default rootReducer
