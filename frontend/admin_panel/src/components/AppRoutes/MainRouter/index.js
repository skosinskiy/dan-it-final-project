import React, { Component } from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Login from '../../../pages/Login'
import Admin from '../../../pages/Admin'
import ForgotPassword from '../../../pages/ForgotPassword'
import ResetPassword from '../../../pages/ResetPassword'
import {connect} from 'react-redux'

class AppRoutes extends Component {
  render () {
    const {isAuthenticated} = this.props

    // if (isAuthenticated) {
    //   return (<RootRoute path="/" authenticated={isAuthenticated}/>)
    // }
    
    return (
      <Switch>
        <Route path="/login" component={Login}/>
        <ProtectedRoute path="/admin" component={Admin} authenticated={isAuthenticated}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/reset-password" component={ResetPassword} />
        <RootRoute path="/" authenticated={isAuthenticated}/>
      </Switch>
    )
  }
}

export const RootRoute = (authenticated) => (
  <Route render={() => authenticated ? <Redirect to='/admin'/> : <Redirect to='/login'/>}/>
)

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
  <Route {...rest} render={(props) => authenticated ? <Component {...props} /> : <Redirect to='/login'/>}/>
)

const mapStateToProps = ({users}) => {
  return {
    isAuthenticated: users.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(AppRoutes))