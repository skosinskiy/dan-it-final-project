import React, { Component } from 'react'
import './styles/App.scss'
import AppRoutes from './components/AppRoutes'
import Header from './components/Header/Header'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <AppRoutes />
      </div>
    )
  }
}

export default App