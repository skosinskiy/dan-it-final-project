import {combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import users from './users'
import places from './places'
import businesses from './businesses'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import businessCategory from './businessCategory'
import eventCategory from './eventCategory'
import menuItems from './menuItems'
import placeCategories from './placeCategory'
import roles from './roles'
import events from './events'

const rootReducer = combineReducers({
  users: users,
  places: places,
  businesses: businesses,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  businessCategory: businessCategory,
  eventCategory: eventCategory,
  menuItems: menuItems,
  toastr: toastrReducer,
  placeCategories: placeCategories,
  roles: roles,
  events: events
})

export default rootReducer
