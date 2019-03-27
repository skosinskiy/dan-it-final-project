import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddBusinessCategory from '../../ManageBusinessCategory'
import ManaginrUserRoles from '../../ManagingUserRoles'
import Places from '../../SidebarMenu/Places'
import PlaceForm from '../../SidebarMenu/Places/PLaceForm'
import BusinessCategoryForm from '../../ManageBusinessCategory/BusinessCategoryForm'

class AppRoutes extends Component {
  render () {
    return (
      <Switch>
        <Route path="/admin/business-categories" component={AddBusinessCategory}/>
        <Route path="/admin/managing-roles" component={ManaginrUserRoles}/>
        <Route path="/admin/places/add-new" component={PlaceForm}/>
        <Route path="/admin/places/:placeId" component={PlaceForm}/>
        <Route path="/admin/business-categories/add-new" component={BusinessCategoryForm}/>
        <Route path="/admin/business-categories/:categoryId" component={BusinessCategoryForm}/>
        <Route path="/admin/places" component={Places}/>
      </Switch>
    )
  }
}

export default AppRoutes