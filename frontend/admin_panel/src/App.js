import React, { Component } from 'react'
import AppRouter from './components/AppRoutes/MainRouter'
import './App.css'
import {connect} from 'react-redux'
import fetchCurrentUser from './components/ActionCreators/UserActions'

class App extends Component {
  componentDidMount () {
    console.log('componentDidMount...')
    console.log(this.props)
    this.props.fetchCurrentUser()
  }
  render () {
    console.log(this.props)
    return (
      <div className='App'>
        <AppRouter/>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    ...store.UserReducer,
    currentUser: store.UserReducer.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => dispatch({
      type: 'FETCH_USER',
      fetchCurrentUser: fetchCurrentUser
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)