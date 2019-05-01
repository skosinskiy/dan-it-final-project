import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewsPage from '../../pages/NewsPage/index'
import DialoguesPage from '../../pages/DialoguesPage/index'
import ContactsPage from '../../pages/ContactsPage'
import Login from '../../pages/LoginPage/index'
import BusinessesEvents from '../../pages/BusinessesEvents'
import EditPlaces from '../../pages/EditPlaces/editPlaces'
import SelectBuildings from '../../pages/SelectBuildings'

const AppRoutes = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/edit-places" component={EditPlaces}/>
        <Route path="/home" component={SelectBuildings}/>
        <Route path="/my-places/:placeId" component={BusinessesEvents}/>
        <Route path="/news" component={NewsPage} />
        <Route path="/messages" component={DialoguesPage} />
        <Route path="/favourites" component={BusinessesEvents} />
        <Route path="/contacts" component={ContactsPage} />
      </Switch>
    </div>
  )
}

export default AppRoutes
