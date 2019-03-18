import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import store from './store'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {default as UserReducer} from './reducers/UserReducer'

const reducers = {
  UserReducer
}

const reducer = combineReducers(reducers)
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
<<<<<<< HEAD
  </Provider>,
  document.getElementById('root'))
=======
  </Provider>, document.getElementById('root'))
>>>>>>> b3597bb929c59e9bb560da45f5b9345e6783d27c

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
