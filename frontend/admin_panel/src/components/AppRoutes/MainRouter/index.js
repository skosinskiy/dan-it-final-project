import React, { Component } from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Login from '../../../pages/Login'
import Admin from '../../../pages/Admin'
import ForgotPassword from '../../../pages/ForgotPassword'
import ResetPassword from '../../../pages/ResetPassword'
import {connect} from 'react-redux'

class AppRoutes extends Component {
  render () {
    const {currentUser} = this.props
    
    return (
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/reset-password" component={ResetPassword} />
        <ProtectedRoute path="/" component={Admin} authenticated={currentUser}/>
      </Switch>
    )
  }
}

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
  <Route {...rest} render={(props) => authenticated ? <Component {...props} /> : <Redirect to='/login'/>}/>
)

const mapStateToProps = ({users}) => {
  return {
    currentUser: users.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(AppRoutes))