import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Food from '../hooks/Food/food'
import Shops from '../hooks/Shops/shops'
import Services from '../hooks/Services/services'
import Fun from '../hooks/Fun/fun'
import Map from '../hooks/Map/map'
import './index.scss'

const AppRoutes = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/services" component={Services}/>
        <Route path="/fun" component={Fun}/>
        <Route path="/shops" component={Shops}/>
        <Route path="/food" component={Food}/>
        <Route path="/map" component={Map}/>
      </Switch>
    </div>
  )
}

export default AppRoutes