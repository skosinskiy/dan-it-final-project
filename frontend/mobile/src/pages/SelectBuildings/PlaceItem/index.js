import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './place-item.scss'
import {usersOperations} from '../../../store/users'
import {connect} from 'react-redux'
import Preloader from '../../../components/Preloader'

class PlaceItem extends Component {
  state = {
    isItemClicked: false
  }

  changeCurrentPlace = placeId => {
    this.props.updateCurrentPlace(placeId).then(() => {
      this.setState({
        isItemClicked: true
      })
    })
  }

  render () {
    const {place, isLoading} = this.props
    const {isItemClicked} = this.state

    if (isLoading) {
      return <Preloader/>
    }

    if (isItemClicked) {
      return <Redirect to={'/mobile/home'} />
    }

    return (
      <li key={place.id} className="place-item">
        <div
          onClick={() => this.changeCurrentPlace(place.id)}
          className="item-link">
          <h3 className="place-item_title">{place.title}</h3>
          <div className="place-address">{place.address}</div>
        </div>
      </li>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.users.isUpdateCurrentPlaceLoading
  }
}

const mapDispatchToProps = dispatch => ({
  updateCurrentPlace: placeId => dispatch(usersOperations.updateCurrentPlace(placeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceItem)