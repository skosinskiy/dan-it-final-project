import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from '../../../pages/Login'
import Admin from '../../../pages/Admin'
import ForgotPassword from '../../../pages/ForgotPassword'
import ResetPassword from '../../../pages/ResetPassword'
import Main from '../../..//pages/Main'

class AppRoutes extends Component {
    state = {
      isAuthenticated: true
    }
    render () {
      return (
        <Switch>
          <Route path="/login" component={Login}/>
          <ProtectedRoute path="/admin" component={Admin} authenticated={this.state.isAuthenticated}/>
          <Route path="/forgot-password" component={ForgotPassword}/>
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/" component={Main}/>
        </Switch>
      )
    }
}

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
  <Route {...rest} render={(props) => authenticated ? <Component {...props} /> : <Redirect to='/login'/>}/>
)

export default AppRoutes