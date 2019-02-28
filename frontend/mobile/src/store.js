import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
//import {myLogger} from './middlewares/myLogger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;