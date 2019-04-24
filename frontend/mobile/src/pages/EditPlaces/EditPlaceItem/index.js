import React, {Component} from 'react'
import {ReactComponent as Delete} from '../../../img/icons/delete.svg'
import './edit-place-item.scss'

class EditPlaceItem extends Component {
  render () {
    const {place} = this.props
    const placeList = place.places.map(place => {
      return (
        <li key={place.id} className="edit-place-item">
          <div className="place-item_lef-sidebar">
            <div className="delete-icon"><Delete/></div>
            <div className="place-item_text">
              <h3 className="place-item_title">{place.title}</h3>
              <div className="place-address">{place.address}</div>
            </div>
          </div>
          <div className="place-item_burger_menu">
            <div className="burger-menu_line"></div>
            <div className="burger-menu_line"></div>
            <div className="burger-menu_line"></div>
          </div>
        </li>
      )
    })
    return (
      <div className="edit-place-category">
        <h2 className="edit-place-category_title">{place.title}</h2>
        <ul className="edit-places-list">
          {placeList}
        </ul>
      </div>
    )
  }
}

export default EditPlaceItem