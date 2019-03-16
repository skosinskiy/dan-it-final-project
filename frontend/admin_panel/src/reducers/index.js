import {combineReducers} from 'redux'
import users from './users/index'

const rootReducer = combineReducers({
  users: users
})

export default rootReducer