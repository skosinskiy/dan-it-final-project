import React, {Component} from 'react'
import EditPlaceItem from './EditPlaceItem/index'
import {ReactComponent as Search} from '../../img/icons/search.svg'
import './edit-place.scss'

const placesList = [
  {
    id: 1,
    title: 'Home',
    places: [
      {
        id: 1,
        title: 'Pechersky Lypky',
        address: 'Lesy Ukrainky, 28'
      }
    ]
  },

  {
    id: 2,
    title: 'Office',
    places: [
      {
        id: 2,
        title: 'Silver Breeze',
        address: 'Tychyny, 2'
      }
    ]
  },

  {
    id: 3,
    title: 'Home',
    places: [
      {
        id: 3,
        title: 'Sky Mall',
        address: 'Pochayna, 25'
      },

      {
        id: 4,
        title: 'Forum',
        address: 'Soborna, 122'
      }
    ]
  }
]

class EditPlaces extends Component {
  render () {
    const places = placesList.map(place => {
      return <EditPlaceItem key={place.id} place={place}/>
    })

    return (
      <div className="edit-place_container">
        <div className="edit-place_header">
          <div className="top-menu">
            <div className="side-title">Cancel</div>
            <div className="centr-title">My places</div>
            <div className="side-title">Done</div>
          </div>
        </div>
        <div className="search-bar">
          <input className="search-bar_item" placeholder="Search places"/>
          <span className="searh-icon"><Search/></span>
        </div>
        <div className="line"></div>
        <div className="edit-place_content">
          <div className="edit-place_items">
            {places.length ? places : <h3 className="content-title">You have no places</h3>}
          </div>
        </div>
      </div>
    )
  }
}

export default EditPlaces