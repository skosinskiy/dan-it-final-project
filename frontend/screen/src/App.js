import React, { Component } from 'react'
import './styles/App.scss'
import AppRoutes from './components/AppRoutes'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScreenEventList from './components/ScreenEventList/ScreenEventList'
import ScreenNewsList from './components/ScreenNewsList'

class App extends Component {
  render () {
    return (

      <div className='App'>
        <Header />
        <div className="grid-wrapper">
          <aside className="left-sidebar"><ScreenEventList /></aside>
          <main className="main-section">
            <AppRoutes />
            <Footer />
          </main>
          <aside className="right-sidebar"><ScreenNewsList /></aside>
        </div>
        
      </div>
      
    )
  }
}

export default App