import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline'
import ReduxToastr from 'react-redux-toastr'

import Preloader from './components/Preloader'
import { usersOperations } from 'store/users'
import {default as IndexPage} from './pages/index'

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const {isCurrentUserLoading} = this.props

    return isCurrentUserLoading ?
      (<div className="wrapper"><Preloader /></div>) : (
      <React.Fragment>
        <CssBaseline />
        <IndexPage />
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ users }) => {
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
