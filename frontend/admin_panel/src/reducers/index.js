import {combineReducers} from 'redux'
import users from './users/index'
import buildings from './buildings/index'

const rootReducer = combineReducers({
  users: users,
  buildings: buildings
})

export default rootReducer