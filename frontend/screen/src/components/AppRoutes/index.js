import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Food from '../hooks/Food'
import Shops from '../hooks/Shops'
import Services from '../hooks/Services'
import Fun from '../hooks/Fun'
import Map from '../hooks/Map'
import './index.scss'

const AppRoutes = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/Services" component={Services}/>
        <Route path="/Fun" component={Fun}/>
        <Route path="/Shops" component={Shops}/>
        <Route path="/Food" component={Food}/>
        <Route path="/Map" component={Map}/>
      </Switch>
    </div>
  )
}

export default AppRoutes