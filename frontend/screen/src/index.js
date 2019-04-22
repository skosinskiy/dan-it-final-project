import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {reducer as menuReducer} from './store/MenuReducer'
import {currentPlace} from './store/currentPlace'
import { Provider } from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import { BrowserRouter } from 'react-router-dom'
import businesses from './store/businesses'
import thunk from 'redux-thunk'

const reducers = {
  menuReducer,
  currentPlace,
  businesses: businesses
}

const reducer = combineReducers(reducers)
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()