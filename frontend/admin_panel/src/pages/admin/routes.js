import React, {Component} from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {hasGrant} from 'utils/roles'
import {Grant} from 'constants/permissions'

import ManageBusinessCategories from './components/ManageBusinessCategory'
import BusinessCategoryForm from './components/ManageBusinessCategory/BusinessCategoryForm'
import ManageEventCategories from './components/ManageEventCategory'
import EventCategoryForm from './components/ManageEventCategory/EventCategoryForm'
import ManagingUserRoles from './components/ManagingUserRoles'
import Places from './components/Places'
import ManageBusinesses from './components/ManageBusinesses'
import BusinessForm from './components/ManageBusinesses/BusinessList/BusinessForm'
import PlaceForm from './components/Places/PLaceForm'
import PlaceCategories from './components/PlaceCategories'
import ManagingRoles from './components/ManagingRoles'
import RoleForm from './components/ManagingRoles/RoleForm'

class AdminRouter extends Component {
  render () {
    const {user} = this.props

    return (
      <Switch>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_USER_ROLES)} path="/admin/managing-roles" component={ManagingUserRoles} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_USER_ROLES)} path="/admin/place-categories" component={PlaceCategories} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places/add-new" component={PlaceForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places/:placeId" component={PlaceForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_PLACES)} path="/admin/places" component={Places} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESSES)} path="/admin/businesses/add-new" component={BusinessForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESSES)} path="/admin/businesses/edit/:title" component={BusinessForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESSES)} path="/admin/businesses" component={ManageBusinesses} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories/add-new" component={BusinessCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories/:categoryId" component={BusinessCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories" component={ManageBusinessCategories} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_ROLES)} path="/admin/roles/:roleId" component={RoleForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_ROLES)} path="/admin/roles/add-new" component={RoleForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_ROLES)} path="/admin/roles" component={ManagingRoles} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES)} path="/admin/event-categories/add-new" component={EventCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES)} path="/admin/event-categories/:categoryId" component={EventCategoryForm} />
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES)} path="/admin/event-categories" component={ManageEventCategories} />
      </Switch>
    )
  }
}

export const AuthorizedRoute = ({component: Component, authenticated, authorized, ...rest}) => (
  <Route {...rest} render={(props) => authorized
    ? <Route component={Component} {...props} />
    : <Redirect to='/login' />} />
)

const mapStateToProps = ({users}) => {
  return {
    user: users.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(AdminRouter))
