import React, { Component } from 'react'
import AppRouter from './components/AppRoutes/MainRouter'
import './App.css'
import {connect} from 'react-redux'
import getCurrentUser from './actions/users/userActions'
import Preloader from './components/Preloader'
import { withRouter } from 'react-router'
import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline'

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
        <CssBaseline/>
        <AppRouter/>
      </div>
    )
  }
}

const mapStateToProps = ({users}) => {
  return {
    currentUser: users.currentUser,
    currentUserLoading: users.currentUserLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))