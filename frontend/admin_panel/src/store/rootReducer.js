import {combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import users from './users'
import places from './places'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import buildings from './buildings'
import businessCategory from './businessCategory'
import eventCategory from './eventCategory'
import menuItems from './menuItems'
import roles from './roles'

const rootReducer = combineReducers({
  users: users,
  places: places,
  buildings: buildings,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  businessCategory: businessCategory,
  eventCategory: eventCategory,
  menuItems: menuItems,
  roles: roles,
  toastr: toastrReducer
})

export default rootReducer
