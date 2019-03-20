import {combineReducers} from 'redux'
import users from './users/index'
import places from './places/index'
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
  users: users,
  places: places,
  toastr: toastrReducer
})

export default rootReducer