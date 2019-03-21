import {combineReducers} from 'redux'
import users from './users/index'
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
  users: users,
  toastr: toastrReducer
})

export default rootReducer