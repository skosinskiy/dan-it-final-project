import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Restaurants from '../hooks/Restaurants'
import Cinema from '../hooks/Cinema'
import Shops from '../hooks/Shops'
import Lorem from '../hooks/Lorem'
import Services from '../hooks/Services'
import FunnyCats from '../hooks/FunnyCats'
import Extra from '../hooks/Extra'
import './index.scss'

const AppRoutes = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/Restaurants" component={Restaurants} />
        <Route path="/Cinema" component={Cinema} />
        <Route path="/Shops" component={Shops} />
        <Route path="/Lorem" component={Lorem} />
        <Route path="/Services" component={Services} />
        <Route path="/FunnyCats" component={FunnyCats} />
        <Route path="/Extra" component={Extra} />
        <Route path="/" component={Restaurants} />
      </Switch>
    </div>
  )
}

export default AppRoutes
