import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddBusinessCategory from '../../AddBusinessCategory'
import ManaginrUserRoles from '../../ManagingUserRoles'
import Places from '../../SidebarMenu/Places'
import PlaceForm from '../../SidebarMenu/Places/PLaceForm'
import Buildings from '../../SidebarMenu/Buildings'
import BuildingForm from '../../SidebarMenu/Buildings/BuildingForm'

class AppRoutes extends Component {
  render () {
    return (
      <Switch>
        <Route path="/admin/business-categories" component={AddBusinessCategory}/>
        <Route path="/admin/managing-roles" component={ManaginrUserRoles}/>
        <Route path="/admin/places/add-new" component={PlaceForm}/>
        <Route path="/admin/places/:placeId" component={PlaceForm}/>
        <Route path="/admin/places" component={Places}/>
        <Route path="/admin/buildings/add-new" component={BuildingForm}/>
        <Route path="/admin/buildings/:buildingId" component={BuildingForm}/>
        <Route path="/admin/buildings" component={Buildings}/>
      </Switch>
    )
  }
}

export default AppRoutes