import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './place-item.scss'

class PlaceItem extends Component {
  render () {
    const {place} = this.props
    const placeList = place.places.map(place => {
      return (
        <li key={place.id} className="place-item">
          <NavLink to={`/my-places/${place.id}`} className="item-link">
            <h3 className="place-item_title">{place.title}</h3>
            <div className="place-address">{place.address}</div>
          </NavLink>
        </li>

      )
    })
    return (
      <div className="place-category">
        <h2 className="place-category_title">{place.title}</h2>
        <ul className="places-list">
          {placeList}
        </ul>
      </div>
    )
  }
}

export default PlaceItem