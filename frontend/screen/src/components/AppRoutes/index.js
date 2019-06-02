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
        <Route path="/screen/businesses/:id" component={SingleBusinessItem}/>
        <Route path="/screen/events/:id" component={SingleEventItem}/>
        <Route path="/screen/category/:id" component={BusinessList}/>
        <Route path="/screen/map" component={Map}/>
        <Route path="/" component={MainPage}/>
      </Switch>
    </div>
  )
}

export default AppRoutes