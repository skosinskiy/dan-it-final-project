import React, { Component } from 'react'
import './styles/App.scss'
import AppRoutes from './components/AppRoutes'
import Header from './components/Header/Header'
import QRCode from './components/QRCode/QRCode'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <AppRoutes />
        <QRCode />
      </div>
    )
  }
}

export default App