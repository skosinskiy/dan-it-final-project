import React, {Component} from 'react'
import MobileHeader from '../../components/MobileHeader'
import PlaceItem from './PlaceItem/index'
import './select-buildings.scss'
import {connect} from 'react-redux'
import {usersOperations} from '../../store/users'
import Preloader from '../../components/Preloader'

class SelectBuildings extends Component {
  state = {
    places: [],
    showUnpairButtons: false
  }

  componentDidMount () {
    this.setState({
      places: this.props.user.places
    })
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.user) {
      this.setState({
        places: nextProps.user.places
      })
    }
  }

  showUnpairButtons = () => {
    this.setState({
      ...this.state,
      showUnpairButtons: !this.state.showUnpairButtons
    })
  }

  render () {
    const {places, showUnpairButtons} = this.state
    const {currentPlace, isLoading} = this.props

    if (isLoading) {
      return <Preloader/>
    }

    const placeCategories = []
    places.map(place => place.placeCategory).forEach(category => {
      if (placeCategories.filter(uniqueCategory => uniqueCategory.id === category.id).length === 0) {
        placeCategories.push(category)
      }
    })
    const placeList = placeCategories
      .sort((category1, category2) => category1.name.localeCompare(category2.name))
      .map(category => {
        const categoryPlaces = places.filter(place => place.placeCategory.id === category.id)
        return (
          <div className="place-category" key={`category-${category.id}`}>
            <h2 className="place-category_title">{category.name}</h2>
            <ul className="places-list">
              {
                categoryPlaces.map(place => {
                  return <PlaceItem
                    key={place.id}
                    place={place}
                    categories={placeCategories}
                    showDelete={showUnpairButtons}
                  />
                })
              }
            </ul>
          </div>
        )
      })

    const photos = currentPlace.photos.filter(photo => photo.id !== currentPlace.mainPhoto.id)
    photos.unshift(currentPlace.photos.find(photo => photo.id === currentPlace.mainPhoto.id))

    return (
      <div className="place-container parallax-container">
        <MobileHeader
          photos={photos}
          header={currentPlace.placeCategory ? currentPlace.placeCategory.name : ''}
          location={currentPlace.title} icon={currentPlace.placeCategory && currentPlace.placeCategory.iconKey}/>
        <div className="content">
          <div className="options">
            <div className="options-container">
              <div className="options-title">Explore</div>
              <h2 className="section-action_title" onClick={this.showUnpairButtons}>
                {showUnpairButtons ? 'done' : 'edit'}
              </h2>
            </div>
          </div>
          <div className="places">
            {places.length ? placeList : <h3 className="content-title">You have no places</h3>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPlace: state.users.currentUser.currentPlace,
    user: state.users.currentUser,
    isLoading: state.users.isCurrentUserLoading
  }
}

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(usersOperations.getCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectBuildings)