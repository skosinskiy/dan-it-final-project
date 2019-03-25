import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AddBusinessCategory from '../../AddBusinessCategory'
import ManaginrUserRoles from '../../ManagingUserRoles'
import Places from '../../SidebarMenu/Places'
import PlaceForm from '../../SidebarMenu/Places/PLaceForm'
import {hasGrant} from '../../../util/roles'
import {ProtectedRoute} from '../MainRouter'
import {Grant} from '../../../util/constants'
import {connect} from 'react-redux'

class AppRoutes extends Component {
  render () {
    const {user} = this.props

    return (
      <Switch>
        <AuthorizedRoute authorized={hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES)} path="/admin/business-categories" component={AddBusinessCategory}/>
        <Route path="/admin/managing-roles" component={ManaginrUserRoles}/>
        <Route path="/admin/places/add-new" component={PlaceForm}/>
        <Route path="/admin/places/:placeId" component={PlaceForm}/>
        <Route path="/admin/places" component={Places}/>
      </Switch>
    )
  }
}

export const AuthorizedRoute = ({component: Component, authenticated, authorized, ...rest}) => (
  <Route {...rest} render={(props) => authorized
    ? <Route component={Component} {...props}/>
    : <Redirect to='/'/>}/>
)

const mapStateToProps = ({users}) => {
  return {
    user: users.currentUser
  }
}

export default connect(mapStateToProps)(AppRoutes)