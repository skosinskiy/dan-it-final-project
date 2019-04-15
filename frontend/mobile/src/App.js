import React, { Component } from 'react'
import Preloader from './components/Preloader'
// import withHeader from './components/withHeaderHOC'
import './App.css'

class App extends Component {
  render () {
    // const Content1 = withHeader(anyComponent, image)
    return (
      <div className='App'>
        {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p> */}
        {/* Edit <code>src/App.js</code> and save to reload. */}
        {/* </p> */}
        {/* <a */}
        {/* className="App-link" */}
        {/* href="https://reactjs.org" */}
        {/* target="_blank" */}
        {/* rel="noopener noreferrer" */}
        {/* > */}
        {/* Learn React */}
        {/* </a> */}
        {/* </header> */}
        {/* <-----------------------> */}
        {/* <Content1 /> */}
        <Preloader />
      </div>
    )
  }
}

export default App
