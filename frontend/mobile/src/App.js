import React, { Component } from 'react'
// import Preloader from './components/Preloader'
import NewsPage from './pages/NewsPage'
import './App.css'

class App extends Component {
  render () {
    // const Content1 = withHeader(anyComponent, image)
    return (
      <div className='App'>
        <NewsPage />
      </div>
    )
  }
}

export default App
