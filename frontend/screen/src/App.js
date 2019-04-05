import React, { Component } from 'react'
import './styles/App.scss'
import AppRoutes from './components/AppRoutes'
import Header from './components/Header/Header'
import ScreenEventList from './components/ScreenEventList/ScreenEventList'
import ScreenNewsList from './components/ScreenNewsList/'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
	      <div className="container">
		      <ScreenEventList />
          <AppRoutes />
		      <ScreenNewsList />
	      </div>
      </div>
    )
  }
}

export default App