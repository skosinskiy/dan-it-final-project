import React, { Component } from 'react'
import AppRoutes from './components/AppRoutes'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as usersOperations from './store/users/operations'
import './App.scss'
import Preloader from './components/Preloader'

class App extends Component {
  componentDidMount () {
    this.props.getCurrentUser()
  }

  render () {
    if (this.props.isCurrentUserLoading) {
      return <Preloader />
    }

    return (
      <div className='App'>
        <AppRoutes currentUser={this.props.currentUser} />
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
