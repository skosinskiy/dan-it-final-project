/* eslint-disable no-trailing-spaces */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import store from './store'
import * as serviceWorker from './serviceWorker'
import './index.css'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'))

serviceWorker.unregister()