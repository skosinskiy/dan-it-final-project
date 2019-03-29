import {combineReducers} from 'redux'
import users from './users/index'
import places from './places/index'
import {reducer as toastrReducer} from 'react-redux-toastr'
import {forgotPassword} from './forgotPassword/index'
import {resetPassword} from './resetPassword/index'
import {businessCategory} from './businessCategory'

const rootReducer = combineReducers({
  users: users,
  places: places,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  businessCategory: businessCategory,
  toastr: toastrReducer
})

export default rootReducer