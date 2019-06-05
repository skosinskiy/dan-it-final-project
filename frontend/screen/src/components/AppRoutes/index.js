import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Map from '../hooks/Map/map'
import MainPage from '../../pages/MainPage/MainPage'
import SingleBusinessItem from '../../pages/SingleBusinessPage/'
import SingleEventItem from '../../pages/SingleEventPage/'
import BusinessList from '../BusinessList/businessList'
import './index.scss'

const AppRoutes = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/screen/:screenId/businesses/:id" component={SingleBusinessItem}/>
        <Route path="/screen/:screenId/events/:id" component={SingleEventItem}/>
        <Route path="/screen/:screenId/category/:id" component={BusinessList}/>
        <Route path="/screen/:screenId/map" component={Map}/>
        <Route path="/screen/:screenId" component={MainPage}/>
      </Switch>
    </div>
  )
}

export default AppRoutes