import React, {Component} from 'react'
import MobileHeader from '../../components/MobileHeader'
import PlaceItem from './PlaceItem/index'
import bag from '../../img/icons/bag.svg'
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
  },

  {
    id: 4,
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
    id: 5,
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
  },

  {
    id: 6,
    title: 'Home',
    places: [
      {
        id: 1,
        title: 'Pechersky Lypky',
        address: 'Lesy Ukrainky, 28'
      }
    ]
  }
]

class SelectBuildings extends Component {
  render () {
    const places = placesList.map(place => {
      return <PlaceItem key={place.id} place={place}/>
    })
    const bgImageURL = 'https://i.lb.ua/121/60/5b1501c46a520.jpeg'

    return (
      <div className="place-container parallax-container">
        <MobileHeader header="Malls" location="Sky Mall" bgImage={bgImageURL} icon={bag} />
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
        </div>
      </div>
    )
  }
}

export default SelectBuildings