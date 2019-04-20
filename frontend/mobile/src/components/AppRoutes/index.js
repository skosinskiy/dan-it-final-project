import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewsPage from '../../pages/NewsPage/index'
import Login from '../../pages/LoginPage/index'
import BusinessesEvents from '../../pages/BusinessesEvents'

const AppRoutes = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/places" />
        <Route path="/news" component={NewsPage}/>
        <Route path="/messages" />
        <Route path="/favourites"/>
        <Route path="/more"/>
        <Route path="/businesses-events" component={BusinessesEvents}/>
      </Switch>
    </div>
  )
}

export default AppRoutes