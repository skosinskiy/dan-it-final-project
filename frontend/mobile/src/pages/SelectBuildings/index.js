import React, {Component} from 'react'
import MobileHeader from '../../components/MobileHeader'
import PlaceItem from './PlaceItem/index'
import bag from '../../img/icons/bag.svg'
import './select-buildings.scss'
import {connect} from 'react-redux'
import {usersOperations} from '../../store/users'

class SelectBuildings extends Component {
  state = {
    places: []
  }

  componentDidMount () {
    this.props.getCurrentUser()
  }

  componentWillReceiveProps (nextProps, nextContext) {
    this.setState({
      places: nextProps.user.places
    })
  }

  render () {
    const {places} = this.state
    const placeCategories = []
    places.map(place => place.placeCategory).forEach(category => {
      if (placeCategories.filter(uniqueCategory => uniqueCategory.id === category.id).length === 0) {
        placeCategories.push(category)
      }
    })
    const placeList = placeCategories.map(category => {
      const categoryPlaces = places.filter(place => place.placeCategory.id === category.id)
      return (
        <div className="place-category" key={`category-${category.id}`}>
          <h2 className="place-category_title">{category.name}</h2>
          <ul className="places-list">
            {
              categoryPlaces.map(place => {
                return <PlaceItem key={place.id} place={place} categories={placeCategories}/>
              })
            }
          </ul>
        </div>
      )
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
            {places.length ? placeList : <h3 className="content-title">You have no places</h3>}
            <button className="add-place_button">+</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({users}) => ({
  user: users.currentUser
})

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(usersOperations.getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectBuildings)