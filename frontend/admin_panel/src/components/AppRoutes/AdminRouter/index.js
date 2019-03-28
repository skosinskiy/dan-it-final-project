import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import AddBusinessCategory from '../../AddBusinessCategory'
import AddEventCategory from '../../AddEventCategory'
import ManaginrUserRoles from '../../ManagingUserRoles'
import Places from '../../SidebarMenu/Places'
import PlaceForm from '../../SidebarMenu/Places/PLaceForm'
import { hasGrant } from '../../../utils/roles'
import { Grant } from '../../../utils/permissions'
import { connect } from 'react-redux'

class AppRoutes extends Component {
  render () {
    const {user} = this.props

    return (
      <Switch>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories" component={AddBusinessCategory}/>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANGAE_USER_ROLES)} path="/admin/managing-roles" component={ManaginrUserRoles}/>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places/add-new" component={PlaceForm}/>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places/:placeId" component={PlaceForm}/>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places" component={Places}/>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories" component={AddBusinessCategory}/>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES)} path="/admin/event-categories" component={AddEventCategory}/>
      </Switch>
    )
  }
}

export const AuthorizedRoute = ({component: Component, authenticated, authorized, ...rest}) => (
  <Route {...rest} render={(props) => authorized
    ? <Route component={Component} {...props}/>
    : <Redirect to='/login'/>}/>
)

const mapStateToProps = ({users}) => {
  return {
    user: users.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(AppRoutes))