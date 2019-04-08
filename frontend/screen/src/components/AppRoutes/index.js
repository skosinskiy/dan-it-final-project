import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Food from '../hooks/Food/food'
import Shops from '../hooks/Shops/shops'
import Services from '../hooks/Services/services'
import Fun from '../hooks/Fun/fun'
import Map from '../hooks/Map/map'
import MainPage from '../../pages/MainPage/MainPage'
import './index.scss'

const AppRoutes = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/" component={MainPage}/>
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