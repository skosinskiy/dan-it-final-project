import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AddBusinessCategory from './components/AddBusinessCategory'
import ManaginrUserRoles from './components/ManagingUserRoles'
import Places from './components/Places'
import PlaceForm from './components/Places/PLaceForm'

class AdminRouter extends Component {
  render () {
    return (
      <Switch>
        <Route path="/admin/business-categories" component={AddBusinessCategory}/>
        <Route path="/admin/managing-roles" component={ManaginrUserRoles}/>
        <Route path="/admin/places/add-new" component={PlaceForm}/>
        <Route path="/admin/places/:placeId" component={PlaceForm}/>
        <Route path="/admin/places" component={Places}/>
      </Switch>
    )
  }
}

export default AdminRouter
