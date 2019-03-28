import React, { Component } from 'react'
import {default as Menu} from './components/Menu'
import './App.css'
import AppRoutes from './components/AppRoutes'
import ScrollbarTest from './components/ScrollbarTest'
import NewsItem from './components/ScrollbarTest/newsItem'

let testArr = [<NewsItem />, <NewsItem />, <NewsItem />, <NewsItem />, <NewsItem />, <NewsItem />, <NewsItem />]

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Menu />
        <AppRoutes />
        <ScrollbarTest newsItems={testArr} />
      </div>
    )
  }
}

export default App
