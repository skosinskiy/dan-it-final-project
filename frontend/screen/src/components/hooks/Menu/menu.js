import React from 'react'
import './menu.scss'
import { NavLink } from 'react-router-dom'
import { getCurrentPlace } from '../../../actions/currentPlace'
import { connect } from 'react-redux'

class Menu extends React.Component {
  componentDidMount () {
    const {getCurrentPlace} = this.props
    getCurrentPlace(1)
  }

  render () {
    const {currentPlace} = this.props
    const businesses = currentPlace.placeCategory.businessCategories

    const menuItems = businesses.map(businesses => {
      return (
        <div key={businesses.id} className={'menu__item'}>
          <NavLink to={`/screen/category/${businesses.id}`}>
            <div className="menu-item_icon" style={{backgroundImage: `url(${businesses.imageUrl})`}}></div>
            <div className="menu-item_text">{businesses.name}</div>
          </NavLink>
        </div>
      )
    })
    return (
      <div className="menu">
        <div onClick={this.props.onClick} className={'menu-hamburger'}>
          <div className={`menu__icon ${this.props.isOpen ? 'menu__icon-crossed' : ''}`}></div>
          <div className={`menu__icon ${this.props.isOpen ? 'menu-hidden' : 'menu-visible'}`}></div>
          <div className={`menu__icon ${this.props.isOpen ? 'menu__icon-crossed-reverse' : ''}`}></div>
        </div>
        <div className={this.props.isOpen ? 'menu-visible' : 'menu-hidden'}>
          {menuItems}
          <NavLink to={`/screen/map`}>
            <div className="menu-item_icon" style={{backgroundImage: `url(https://img.icons8.com/color/420/google-maps.png)`}}></div>
            <div className="menu-item_text">Map</div>
          </NavLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPlace: state.currentPlace.currentPlace
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentPlace: (id) => dispatch(getCurrentPlace(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)