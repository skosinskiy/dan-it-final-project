import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddBusinessCategory from '../../AddBusinessCategory'
import ManaginrUserRoles from '../../ManagingUserRoles'
import Places from '../../SidebarMenu/Places'
import PlaceForm from '../../SidebarMenu/Places/PLaceForm'

class AppRoutes extends Component {
    state = {
      isAuthenticated: true
    }
    render () {
      return (
        <Switch>
          <Route path="/admin/business-categories" component={AddBusinessCategory}/>
          <Route path="/admin/managing-roles" component={ManaginrUserRoles}/>
          <Route path="/admin/places/edit" component={PlaceForm}/>
          <Route path="/admin/places" component={Places}/>
        </Switch>
      )
    }
}

export default AppRoutes