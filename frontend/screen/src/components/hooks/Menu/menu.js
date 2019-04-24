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
          <NavLink to={`/category/${businesses.id}`}>{businesses.iconUrl}
            <div>{businesses.name}</div>
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