import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../Login'
import Admin from '../Admin'
import ForgotPasword from '../ForgotPassword'
import Main from '../Main'

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