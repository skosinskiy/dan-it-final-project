import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from '../../pages/HomePage/homePage'

const MainRouter = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/screen/:screenId" component={HomePage}/>
      </Switch>
    </div>
  )
}

export default MainRouter