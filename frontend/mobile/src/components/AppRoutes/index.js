import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewsPage from '../../pages/NewsPage/index'
import ContactsPage from '../../pages/ContactsPage'
import Login from '../../pages/LoginPage/index'
import BusinessesEvents from '../../pages/BusinessesEvents'
import SelectBuildings from '../../pages/SelectBuildings'
import DialoguesPage from '../../pages/DialoguesPage'
import CreateChatPage from '../../pages/CreateChatPage'
import ChatPage from '../../pages/ChatPage'
import * as PropTypes from 'prop-types'
import Redirect from 'react-router-dom/es/Redirect'
import {connect} from 'react-redux'
import BottomMenu from '../BottomMenu'
import MapPage from '../../pages/MapPage/MapPage.js'

const AppRoutes = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/places" component={SelectBuildings}/>
        <Route path="/businesses" component={BusinessesEvents}/>
        <Route path="/news" component={NewsPage} />
        <Route path="/messages" component={DialoguesPage} />
        <Route path="/favourites" component={BusinessesEvents} />
        <Route path="/contacts" component={ContactsPage} />
        <ProtectedRoute path="/" component={SelectBuildings} authenticated={!!currentUser}/>
        <Route path="/map" component={MapPage} />
      </Switch>
    </div>
  )
}

export default AppRoutes
