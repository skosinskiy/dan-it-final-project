import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {ReactComponent as PlacesLogo} from '../../img/BottomMenu/places.svg'
import {ReactComponent as NewsLogo} from '../../img/BottomMenu/news.svg'
import {ReactComponent as MessagesLogo} from '../../img/BottomMenu/message.svg'
import {ReactComponent as FavouritesLogo} from '../../img/BottomMenu/favourites.svg'
import {ReactComponent as MoreLogo} from '../../img/BottomMenu/more.svg'
import './index.scss'

class BottomMenu extends Component {
  render () {
    const {location} = this.props

    const path = location.pathname

    return (
      <div className="bottom__menu">
        <div className="item">
          <NavLink to="/home" className={`link ${path.startsWith('/home') && 'fill'}`}>
            <PlacesLogo className="logo"/>
            <p className="text">Home</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/news" className={`link ${path.startsWith('/news') && 'fill'}`}>
            <NewsLogo className="logo"/>
            <p className="text">News</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/messages" className={`link ${path.startsWith('/messages') && 'fill'}`}>
            <MessagesLogo className="logo"/>
            <p className="text">Messages</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/favourites" className={`link ${path.startsWith('/favourites') && 'fill'}`}>
            <FavouritesLogo className="logo"/>
            <p className="text">Favourites</p>
          </NavLink>
        </div>
        <div className="item">
          <NavLink to="/contacts" className={`link ${path.startsWith('/contacts') && 'fill'}`}>
            <MoreLogo className="logo"/>
            <p className="text">Contacts</p>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default withRouter(BottomMenu)