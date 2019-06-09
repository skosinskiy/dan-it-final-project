import React from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import NewsPage from '../../pages/NewsPage/index'
import ContactsPage from '../../pages/ContactsPage'
import Login from '../../pages/LoginPage/index'
import Registration from '../../pages/RegistrationPage/index'
import BusinessesEvents from '../../pages/BusinessesEvents'
import SelectBuildings from '../../pages/SelectBuildings'
import DialoguesPage from '../../pages/DialoguesPage'
import CreateChatPage from '../../pages/CreateChatPage'
import ChatPage from '../../pages/ChatPage'
import SingleBusinessPage from '../../pages/SingleBusinessPage'
import SingleEventPage from '../../pages/SingleEventPage'
import AddPlaceMessage from '../../pages/AddPlaceMessagePage'
import * as PropTypes from 'prop-types'

import {connect} from 'react-redux'
import BottomMenu from '../BottomMenu'
import MapPage from '../../pages/MapPage/MapPage'
import NoPlacesInfo from '../NoPlacesInfo'

const AppRoutes = (props) => {
  const {currentUser} = props
  const bottomMenu =
      props.location.pathname.startsWith('/mobile/login') || props.location.pathname.startsWith('/mobile/registration')
        ? null
        : <BottomMenu/>
  if (
    currentUser &&
      !currentUser.currentPlace &&
      currentUser.places.length === 0 &&
      !props.location.pathname.startsWith('/mobile/login') &&
      !props.location.pathname.startsWith('/mobile/registration')
  ) {
    return (
      <div>
        <NoPlacesInfo/>
        {bottomMenu}
      </div>
    )
  }

  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/mobile/login/placeId/:placeId" component={Login} />
        <Route path="/mobile/login" component={Login}/>
        <Route path="/mobile/registration" component={Registration}/>
        <ProtectedRoute path="/mobile/home/new-place-message" component={AddPlaceMessage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/home/" component={BusinessesEvents} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/places" component={SelectBuildings} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/news" component={NewsPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/messages/:chatId/:userId" component={ChatPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/messages/:chatId" component={ChatPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/messages" component={DialoguesPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/create-chat" component={CreateChatPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/contacts" component={ContactsPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/map" component={MapPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/businesses/:businessId" component={SingleBusinessPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile/events/:eventId" component={SingleEventPage} authenticated={!!currentUser}/>
        <ProtectedRoute path="/mobile" component={BusinessesEvents}/>
      </Switch>
      {bottomMenu}
    </div>
  )
}

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      return authenticated ? <Component {...props} /> : <Redirect to="/mobile/login"/>
    }

    }
  />
)

const mapStateToProps = ({users}) => {
  return {
    currentUser: users.currentUser
  }
}

AppRoutes.propTypes = {
  currentUser: PropTypes.object
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
}

export default withRouter(connect(mapStateToProps)(AppRoutes))
