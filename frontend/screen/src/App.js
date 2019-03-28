import React, { Component } from 'react'
import {default as Menu} from './components/Menu'
import './App.css'
import AppRoutes from './components/AppRoutes'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Menu />
        <AppRoutes />
      </div>
    )
  }
}

export default App
