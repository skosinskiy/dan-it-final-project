import {combineReducers} from 'redux'
import users from './users/index'
import places from './places/index'
import buildings from './buildings/index'
import {reducer as toastrReducer} from 'react-redux-toastr'
import {forgotPassword} from './forgotPassword/index'
import {resetPassword} from './resetPassword/index'
import {businessCategory} from './businessCategory'
import menuItems from './menuItems'

const rootReducer = combineReducers({
  users: users,
  places: places,
  buildings: buildings,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  businessCategory: businessCategory,
  menuItems: menuItems,
  toastr: toastrReducer
})

export default rootReducer