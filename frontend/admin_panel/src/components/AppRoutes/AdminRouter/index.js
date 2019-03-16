import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddBusinessCategory from '../../AddBusinessCategory'
import ManaginrUserRoles from '../../ManagingUserRoles'

class AppRoutes extends Component {
    state = {
      isAuthenticated: true
    }
    render () {
      return (
        <Switch>
          <Route path="/admin/business-categories" component={AddBusinessCategory}/>
          <Route path="/admin/managing-roles" component={ManaginrUserRoles}/>
        </Switch>
      )
    }
}

export default AppRoutes