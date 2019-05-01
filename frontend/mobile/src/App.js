import React, { Component } from 'react'
import AppRoutes from './components/AppRoutes'
import './App.css'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as usersOperations from './store/users/operations'

class App extends Component {
  componentDidMount () {
    this.props.getCurrentUser()
  }

  render () {
    return (
      <div className='App'>
        <AppRoutes />
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

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(usersOperations.getCurrentUser())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
