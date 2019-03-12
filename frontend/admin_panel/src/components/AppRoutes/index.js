import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../../pages/Login'
import Admin from '../../pages/Admin'
import ForgotPasword from '../../pages/ForgorPassword'
import Main from '../../pages/Main'

class AppRoutes extends Component {
    state = {
      isAuthenticated: false
    }
    render () {
      return (
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/admin" render={() => (
            !this.state.isAuthenticated ? (
              <Redirect to="/login"/>
            ) : (
              <Admin/>
            )
          )}/>
          <Route path="/forgot-password" component={ForgotPasword}/>
          <Route path="/" component={Main}/>
        </Switch>
      )
    }
}

export default AppRoutes