import React, { Component } from 'react'
import AppRouter from './components/AppRoutes/MainRouter'
import {connect} from 'react-redux'
import {getCurrentUser} from './actions/users/index'
import Preloader from './components/Preloader'
import { withRouter } from 'react-router'
import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline'

class App extends Component {
  componentDidMount () {
    this.props.getCurrentUser()
  }

  render () {
    if (this.props.isCurrentUserLoading) {
      return (
        <div className='wrapper'>
          <Preloader/>
        </div>
      )
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
    isCurrentUserLoading: users.isCurrentUserLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))