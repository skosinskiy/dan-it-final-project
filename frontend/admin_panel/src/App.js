import React, { Component } from 'react'
import AppRouter from './components/AppRoutes/MainRouter'
import './App.css'
import {connect} from 'react-redux'
import getCurrentUser from './actions/Users/userActions'
import Preloader from './components/Preloader'

class App extends Component {
  componentDidMount () {
    this.props.getCurrentUser()
  }
  render () {
    if (this.props.currentUserLoading) {
      return <Preloader />
    }
    return (
      <div className='App'>
        <AppRouter/>
      </div>
    )
  }
}

const mapStateToProps = ({store}) => {
  return {
    currentUser: store.currentUser,
    currentUserLoading: store.currentUserLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)