import {menu} from './reducers/menu'
import {map} from './reducers/map'
import {combineReducers} from 'redux'

const reducers = {
  menu,
  map
}

export default combineReducers(reducers)
