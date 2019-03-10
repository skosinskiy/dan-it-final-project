import React, { Component } from 'react'
import Preloader from './components/Preloader'
import {default as Menu} from './components/Menu'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Menu />
        <Preloader />
      </div>
    )
  }
}

export default App