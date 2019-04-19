import React, { Component } from 'react'
import AppRoutes from './components/AppRoutes'
import BottomMenu from './components/BottomMenu'
import './App.css'

class App extends Component {
  render () {
    // const Content1 = withHeader(anyComponent, image)
    return (
      <div className='App'>
        <AppRoutes />
        <BottomMenu />
      </div>
    )
  }
}

export default App
