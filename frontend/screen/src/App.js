import React, { Component } from 'react'
import './styles/App.scss'
import AppRoutes from './components/AppRoutes'
import Header from './components/Header/Header'
import ScreenEventList from './components/ScreenEventList/ScreenEventList'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <AppRoutes />
        <ScreenEventList />
      </div>
    )
  }
}

export default App