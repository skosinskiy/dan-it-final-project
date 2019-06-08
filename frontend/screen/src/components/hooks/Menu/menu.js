import React from 'react'
import './menu.scss'
import { NavLink } from 'react-router-dom'
import { getCurrentPlace } from '../../../actions/currentPlace'
import { connect } from 'react-redux'
import { getAllBusinessesByCategory, getBusinessCategoryById } from '../../../store/businesses/operations'

class Menu extends React.Component {
  componentDidMount () {
    const {getCurrentPlace, screenId} = this.props
    getCurrentPlace(screenId)
  }

  getCurrentCategory = (categoryId, placeId) => {
    const {getBusinessCategoryById, getBusinessesByCategory} = this.props
    getBusinessCategoryById(categoryId)
    getBusinessesByCategory(categoryId, placeId)
  }

  render () {
    const {currentPlace, screenId} = this.props
    const businesses = currentPlace.placeCategory.businessCategories
    const menuItems = businesses.map(businesses => {
      return (
        <div key={businesses.id} className={'menu__item'} onClick={() => this.getCurrentCategory(businesses.id, screenId)}>
          <NavLink to={`/screen/${screenId}/category/${businesses.id}`}>
            <div className="menu-item_icon" style={{backgroundImage: `url(${businesses.iconUrl})`}}></div>
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
          <div className={'menu__item'}>
            <NavLink to={`/screen/${screenId}/map`}>
              <div className="menu-item_icon" style={{backgroundImage: `url(https://img.icons8.com/color/420/google-maps.png)`}}></div>
              <div className="menu-item_text">Map</div>
            </NavLink>
          </div>
        </div>
        <div className={!this.props.isOpen ? 'place-title__visible' : 'place-title__hidden'}>
          <h1> {currentPlace.title}</h1>
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
    getCurrentPlace: (id) => dispatch(getCurrentPlace(id)),
    getBusinessCategoryById: (categoryId) => dispatch(getBusinessCategoryById(categoryId)),
    getBusinessesByCategory: (categoryId, placeId) => dispatch(getAllBusinessesByCategory(categoryId, placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)