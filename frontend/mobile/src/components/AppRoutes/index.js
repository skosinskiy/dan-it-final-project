import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import NewsPage from '../../pages/NewsPage/index'
import ContactsPage from '../../pages/ContactsPage'
import Login from '../../pages/LoginPage/index'
import Registration from '../../pages/RegistrationPage/index'
import BusinessesEvents from '../../pages/BusinessesEvents'
import EditPlaces from '../../pages/EditPlaces/editPlaces'
import SelectBuildings from '../../pages/SelectBuildings'
import DialoguesPage from '../../pages/DialoguesPage'
import CreateChatPage from '../../pages/CreateChatPage'
import ChatPage from '../../pages/ChatPage'
import * as PropTypes from 'prop-types'
import Redirect from 'react-router-dom/es/Redirect'
import {connect} from 'react-redux'
import BottomMenu from '../BottomMenu'
import MapPage from '../../pages/MapPage/MapPage'

const AppRoutes = (props) => {
  const {currentUser} = props
  const bottomMenu = ['/login', '/registration'].includes(props.location.pathname) ? null : <BottomMenu/>

  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
        <Route path="/edit-places" component={EditPlaces}/>
        <Route path="/home" component={SelectBuildings}/>
        <Route path="/my-places/:placeId" component={BusinessesEvents}/>
        <Route path="/news" component={NewsPage} />
        <Route path="/dialogs" component={DialoguesPage} />
        <Route path="/create-chat" component={CreateChatPage} />
        <Route path="/messages/:chatId" component={ChatPage} />
        <Route path="/favourites" component={BusinessesEvents} />
        <Route path="/contacts" component={ContactsPage} />
        <Route path="/map" component={MapPage} />
        <ProtectedRoute path="/" component={SelectBuildings} authenticated={!!currentUser}/>
      </Switch>
      {bottomMenu}
    </div>
  )
}

export const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to="/login"/>
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
  authenticated: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps)(AppRoutes))
