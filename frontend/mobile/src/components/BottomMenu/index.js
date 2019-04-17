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
        <div className="bottom__menu__item">
          <NavLink
            to="/places"
            className={'bottom__menu__item__link'}
          >
            <PlacesLogo className="bottom__menu__item__logo"/>
            <p className="bottom__menu__item__text">Places</p>
          </NavLink>
        </div>
        <div className="bottom__menu__item">
          <NavLink
            to="/news"
            className={`bottom__menu__item__link ${path.startsWith('/news') && 'bottom__menu__item__logo__fill'}`}
          >
            <NewsLogo className="bottom__menu__item__logo"/>
            <p className="bottom__menu__item__text">News</p>
          </NavLink>
        </div>
        <div className="bottom__menu__item">
          <NavLink to="/messages" className="bottom__menu__item__link">
            <MessagesLogo className="bottom__menu__item__logo"/>
            <p className="bottom__menu__item__text">Messages</p>
          </NavLink>
        </div>
        <div className="bottom__menu__item">
          <NavLink to="/favourites" className="bottom__menu__item__link">
            <FavouritesLogo className="bottom__menu__item__logo"/>
            <p className="bottom__menu__item__text">Favourites</p>
          </NavLink>
        </div>
        <div className="bottom__menu__item">
          <NavLink to="/more" className="bottom__menu__item__link">
            <MoreLogo className="bottom__menu__item__logo"/>
            <p className="bottom__menu__item__text">More</p>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default withRouter(BottomMenu)