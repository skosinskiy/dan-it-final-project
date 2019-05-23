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
import * as PropTypes from 'prop-types'

import {connect} from 'react-redux'
import BottomMenu from '../BottomMenu'
import MapPage from '../../pages/MapPage/MapPage'

const AppRoutes = (props) => {
  const {currentUser} = props
  const bottomMenu = ['/mobile/login', '/mobile/registration'].includes(props.location.pathname) ? null : <BottomMenu/>

  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/mobile/login/placeId/:placeId" component={Login}/>
        <Route path="/mobile/login" component={Login}/>
        <Route path="/mobile/registration" component={Registration}/>
        <Route path="/mobile/home" component={SelectBuildings}/>
        <Route path="/mobile/my-places/:placeId" component={BusinessesEvents}/>
        <Route path="/mobile/news" component={NewsPage} />
        <Route path="/mobile/messages/:chatId" component={ChatPage} />
        <Route path="/mobile/messages" component={DialoguesPage} />
        <Route path="/mobile/create-chat" component={CreateChatPage} />
        <Route path="/mobile/favourites" component={BusinessesEvents} />
        <Route path="/mobile/contacts" component={ContactsPage} />
        <Route path="/mobile/map" component={MapPage} />
        <Route path="/mobile/businesses/:businessId" component={SingleBusinessPage} />
        <Route path="/mobile/events/:eventId" component={SingleEventPage} />
        <ProtectedRoute path="/mobile" component={SelectBuildings} authenticated={!!currentUser}/>
      </Switch>
      {bottomMenu}
    </div>
  )
}

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to="/mobile/login"/>
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
  component: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps)(AppRoutes))
