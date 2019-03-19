import {combineReducers} from 'redux'
import users from './Users'

const rootReducer = combineReducers({
  users: users
})

export default rootReducer