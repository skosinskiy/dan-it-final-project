import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { ReactComponent as HomeLogo } from '../../img/BottomMenu/home.svg'
import { ReactComponent as PlacesLogo } from '../../img/BottomMenu/places.svg'
import { ReactComponent as NewsLogo } from '../../img/BottomMenu/news.svg'
import { ReactComponent as MessagesLogo } from '../../img/BottomMenu/message.svg'
import { ReactComponent as MoreLogo } from '../../img/BottomMenu/more.svg'
import { ReactComponent as MapLogo } from '../../img/BottomMenu/map.svg'
import './index.scss'

class BottomMenu extends Component {
  render () {
    const {location} = this.props

    const path = location.pathname

    return (
      <div className="bottom__menu">
        <div className="item">
          <NavLink to="/mobile/home" className={`link ${path.startsWith('/mobile/home') && 'fill'}`}>
            <HomeLogo className="logo"/>
            <p className="text">Home</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/mobile/places" className={`link ${path.startsWith('/mobile/places') && 'fill'}`}>
            <PlacesLogo className="logo"/>
            <p className="text">Places</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/mobile/contacts" className={`link ${path.startsWith('/mobile/contacts') && 'fill'}`}>
            <MoreLogo className="logo"/>
            <p className="text">Contacts</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/mobile/messages" className={`link ${path.startsWith('/mobile/messages') && 'fill'}`}>
            <MessagesLogo className="logo"/>
            <p className="text">Messages</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/mobile/news" className={`link ${path.startsWith('/mobile/news') && 'fill'}`}>
            <NewsLogo className="logo"/>
            <p className="text">News</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/mobile/map" className={`link ${path.startsWith('/mobile/map') && 'fill'}`}>
            <MapLogo className="logo"/>
            <p className="text">Map</p>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default withRouter(BottomMenu)