import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewsPage from '../../pages/NewsPage/index'
import DialoguesPage from '../../pages/DialoguesPage/index'
import ContactsPage from '../../pages/ContactsPage'
import Login from '../../pages/LoginPage/index'
import BusinessesEvents from '../../pages/BusinessesEvents'
import Buildings from '../../pages/SelectBuildings'
import SelectBuildings from '../../pages/SelectBuildings'

const AppRoutes = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/places" component={Buildings}/>
        <Route path="/home" component={SelectBuildings}/>
        <Route path="/businesses" component={BusinessesEvents}/>
        <Route path="/news" component={NewsPage} />
        <Route path="/messages" component={DialoguesPage} />
        <Route path="/favourites" component={BusinessesEvents} />
        <Route path="/contacts" component={ContactsPage} />
      </Switch>
    </div>
  )
}

export default AppRoutes
