import {combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import users from './users'
import places from './places'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'

const rootReducer = combineReducers({
  users: users,
  places: places,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  toastr: toastrReducer
})

export default rootReducer
