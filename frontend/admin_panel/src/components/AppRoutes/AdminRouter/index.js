import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddBusinessCategory from '../../AddBusinessCategory'
import ManaginrUserRoles from '../../ManagingUserRoles'
import ManagingTypesOfBuildings from '../../ManagingTypesOfBuildings'

class AppRoutes extends Component {
    state = {
      isAuthenticated: true
    }
    render () {
      return (
        <Switch>
          <Route path="/admin/business-categories" component={AddBusinessCategory}/>
          <Route path="/admin/managing-roles" component={ManaginrUserRoles}/>
          <Route path="/admin/managing-types" component={ManagingTypesOfBuildings}/>
        </Switch>
      )
    }
}

export default AppRoutes