import React, {Component} from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Admin from './admin'

import Login from './auth/login'
import ForgotPassword from './auth/forgotPassword'
import ResetPassword from './auth/resetPassword'

class AppRoutes extends Component {
  render () {
    const {currentUser} = this.props

    return (
      <Switch>
        <Route path="/admin/login" component={Login}/>
        <Route path="/admin/forgot-password" component={ForgotPassword}/>
        <Route path="/admin/reset-password" component={ResetPassword}/>
        <ProtectedRoute path="/admin" component={Admin} authenticated={!!currentUser}/>
      </Switch>
    )
  }
}

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to="/admin/login"/>
    }
  />
)

const mapStateToProps = ({users}) => {
  return {
    currentUser: users.currentUser,
  }
}

AppRoutes.propTypes = {
  currentUser: PropTypes.object
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps)(AppRoutes))
