import {combineReducers} from 'redux'
import menu from './MenuReducer'
import businesses from './businesses/'

const rootReducer = combineReducers({
	businesses: businesses,
	menu: menu
})

export default rootReducer
