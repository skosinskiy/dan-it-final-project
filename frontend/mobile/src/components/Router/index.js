import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import News from '../../pages/NewsPage'
import SelectBuildings from '../../pages/SelectBuildings'
import BusinesseEvents from '../../pages/BusinessesEvents'

class Router extends Component {
  render () {
    return (
      <Switch>
        <Route path="/news" component={News}/>
        <Route path="/my-buildings" component={SelectBuildings}/>
        <Route path="/businesses-events" component={BusinesseEvents}/>
        <Route path="/"/>
      </Switch>
    )
  }
}

export default Router