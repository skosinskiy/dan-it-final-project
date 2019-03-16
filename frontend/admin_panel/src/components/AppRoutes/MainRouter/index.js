import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../../../pages/Login'
import Admin from '../../../pages/Admin'
import ForgotPasword from '../../../pages/ForgorPassword'
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
          <Route path="/forgot-password" component={ForgotPasword}/>
          <Route path="/" component={Main}/>
        </Switch>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    userRoles: state.users.userRoles
  }
}

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
  <Route {...rest} render={(props) => authenticated ? <Component {...props} /> : <Redirect to='/login'/>}/>
)

export default AppRoutes