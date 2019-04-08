import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
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
        <Route path="/services" component={Services}/>
        <Route path="/fun" component={Fun}/>
        <Route path="/shops" component={Shops}/>
        <Route path="/food" component={Food}/>
        <Route path="/map" component={Map}/>
      </Switch>
    </div>
  )
}

export default withRouter((AppRoutes))