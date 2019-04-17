import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateSelectedKey} from '../../store/bottomMenu/operations'
import {ReactComponent as PlacesLogo} from '../../img/BottomMenu/places.svg'
import {ReactComponent as NewsLogo} from '../../img/BottomMenu/news.svg'
import {ReactComponent as MessagesLogo} from '../../img/BottomMenu/message.svg'
import {ReactComponent as FavouritesLogo} from '../../img/BottomMenu/favourites.svg'
import {ReactComponent as MoreLogo} from '../../img/BottomMenu/more.svg'
import './index.scss'

class BottomMenu extends Component {
  clickHandler (selectedKey) {
    this.props.updateSelectedKey(selectedKey)
  }
  isSelected (elementKey) {
    return elementKey === this.props.selectedKey
  }
  render () {
    let elementKey = 0
    return (
      <div className="bottom__menu">
        <div className="bottom__menu__item">
          <NavLink onClick={() => this.clickHandler(elementKey)} to="/places" className={'bottom__menu__item__link ' + this.isSelected(elementKey++) ? 'bottom__menu__item__logo__fill' : ''}>
            <PlacesLogo className="bottom__menu__item__logo"/>
            <p className="bottom__menu__item__text">Places</p>
          </NavLink>
        </div>
        <div className="bottom__menu__item"><NavLink to="/news" className="bottom__menu__item__link"><NewsLogo className="bottom__menu__item__logo"/><p className="bottom__menu__item__text">News</p></NavLink></div>
        <div className="bottom__menu__item"><NavLink to="/messages" className="bottom__menu__item__link"><MessagesLogo className="bottom__menu__item__logo"/><p className="bottom__menu__item__text">Messages</p></NavLink></div>
        <div className="bottom__menu__item"><NavLink to="/favourites" className="bottom__menu__item__link"><FavouritesLogo className="bottom__menu__item__logo"/><p className="bottom__menu__item__text">Favourites</p></NavLink></div>
        <div className="bottom__menu__item"><NavLink to="/more" className="bottom__menu__item__link"><MoreLogo className="bottom__menu__item__logo"/><p className="bottom__menu__item__text">More</p></NavLink></div>
      </div>
    )
  }
}
BottomMenu.propTypes = {
  selectedKey: PropTypes.number.isRequired,
  updateSelectedKey: PropTypes.func.isRequired
}

const mapStateToProps = store => {
  return {
    selectedKey: store.BottomMenuReducer.selectedKey
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedKey: (selectedKey) => dispatch(updateSelectedKey(selectedKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu)