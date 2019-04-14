import React, {Component} from 'react'
import PlaceItem from './PlaceItem'
import './select-buildings.scss'

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

class SelectBuildings extends Component {
  render () {
    const places = placesList.map(place => {
      return <PlaceItem key={place.id} place={place}/>
    })

    return (
      <div className="container">
        <div className="header">
          <div className="header-icon">
            <h2 className="header-title">Malls</h2>
            <h3 className="header-description">Sky Mall</h3>
          </div>
        </div>
        <div className="content">
          <div className="options">
            <div className="options-container">
              <div className="options-title">Explore</div>
              <div className="options-function">Edit</div>
            </div>
          </div>
          <div className="places">
            {places.length ? places : <h3 className="content-title">You have no places</h3>}
            <button className="add-place_button">+</button>
          </div>
          <div className="footer">
            <ul className="footer-menu">
              <li className="menu-item">
                <div className="menu-item_icon"></div>
                <div className="menu-icon_text">Places</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"></div>
                <div className="menu-icon_text">News</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"></div>
                <div className="menu-icon_text">Messages</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"></div>
                <div className="menu-icon_text">Favourites</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"></div>
                <div className="menu-icon_text">More</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectBuildings