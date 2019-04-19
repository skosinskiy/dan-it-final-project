import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewsPage from '../../pages/NewsPage/index'
import DialoguesPage from '../../pages/DialoguesPage/index'

const AppRoutes = (props) => {
  return (
    <div className={'AppRoutes'}>
      <Switch>
        <Route path="/places" />
        <Route path="/news" component={NewsPage} />
        <Route path="/messages" component={DialoguesPage} />
        <Route path="/favourites" />
        <Route path="/more" />
      </Switch>
    </div>
  )
}

export default AppRoutes
