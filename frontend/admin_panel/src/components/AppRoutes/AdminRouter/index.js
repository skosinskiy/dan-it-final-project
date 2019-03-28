import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddBusinessCategory from '../../AddBusinessCategory'
import ManaginrUserRoles from '../../ManagingUserRoles'
import Places from '../../SidebarMenu/Places'
import PlaceForm from '../../SidebarMenu/Places/PLaceForm'
import PlaceCategories from '../../SidebarMenu/PlaceCategories'

class AppRoutes extends Component {
  render () {
    return (
      <Switch>
        <Route path="/admin/business-categories" component={AddBusinessCategory}/>
        <Route path="/admin/managing-roles" component={ManaginrUserRoles}/>
        <Route path="/admin/place-categories" component={PlaceCategories}/>
        <Route path="/admin/places/add-new" component={PlaceForm}/>
        <Route path="/admin/places/:placeId" component={PlaceForm}/>
        <Route path="/admin/places" component={Places}/>
      </Switch>
    )
  }
}

export default AppRoutes