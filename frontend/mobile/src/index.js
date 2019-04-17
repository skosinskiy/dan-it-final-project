/* eslint-disable no-trailing-spaces */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import RootProviders from './RootProviders'
import * as serviceWorker from './serviceWorker'
import './index.css'

const rootDecorator = RootProviders({
  store
})

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(rootDecorator(Component),
    <BrowserRouter>
      <App />
    </BrowserRouter>, root)
}

render(App)
serviceWorker.unregister()

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>, 
//   document.getElementById('root'))
