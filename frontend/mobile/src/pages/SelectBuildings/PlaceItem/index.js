import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './place-item.scss'

class PlaceItem extends Component {
  render () {
    const {place} = this.props

    return (
      <li key={place.id} className="place-item">
        <NavLink to={`/mobile/home/${place.id}`} className="item-link">
          <h3 className="place-item_title">{place.title}</h3>
          <div className="place-address">{place.address}</div>
        </NavLink>
      </li>
    )
  }
}

export default PlaceItem