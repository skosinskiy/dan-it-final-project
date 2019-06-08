import React, { Component } from 'react'
import ContactList from './ContactList'
import MobileHeader from '../../components/MobileHeader'
import { connect } from 'react-redux'
import { getUsersByPlace } from '../../store/users/operations'
import Preloader from '../../components/Preloader'
import {ReactComponent as Search} from '../../img/icons/search.svg'
import './contacts-page.scss'

class ContactsPage extends Component {
  state = {
    searchParam: '',
    currentPlace: {
      photos: []
    }
  }
  componentDidMount () {
    const {getUsersByPlace, currentUser} = this.props
    getUsersByPlace(currentUser.currentPlace.id)
    this.setState({
      ...this.state,
      currentPlace: currentUser.currentPlace
    })
  }

  handleChange = event => {
    this.setState({
      searchParam: event.target.value
    })
  }

  render () {
    const {usersListByPLace, usersListByPLaceIsLoading, currentUser, currentPlaceById} = this.props
    const {searchParam, currentPlace} = this.state

    if (usersListByPLaceIsLoading) {
      return <Preloader/>
    }

    const contacts = usersListByPLace.filter(user => {
      return user.id !== currentUser.id
    })

    let contactsList

    if (!searchParam) {
      contactsList = contacts
    } else {
      contactsList = contacts.filter(user => {
        return user.firstName.toLowerCase().indexOf(searchParam.toLowerCase()) !== -1 || user.lastName.toLowerCase().indexOf(searchParam.toLowerCase()) !== -1
      })
    }

    const photos = currentPlace.photos.length > 0
      ? currentPlace.photos.filter(photo => photo.id !== currentPlace.mainPhoto.id)
      : []
    if (currentPlace.photos.length > 0) {
      photos.unshift(currentPlace.photos.find(photo => photo.id === currentPlace.mainPhoto.id))
    }

    return (
      <div className='contacts parallax-container'>
        <MobileHeader
          photos={photos}
          header='Contacts'
          location={currentPlace.title}
          icon={currentPlace.placeCategory && currentPlace.placeCategory.iconKey}/>
        <div className={'content'}>
          <div className="search-bar">
            <input className="contacts-search" onChange={this.handleChange} type="text" placeholder="Search" value={searchParam}/>
            <span className="search-icon"><Search/></span>
          </div>
          <ContactList contacts={contactsList} location={currentPlaceById.title}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersListByPLace: state.users.usersListByPLace,
    usersListByPLaceIsLoading: state.users.usersListByPLaceIsLoading,
    currentUser: state.users.currentUser,
    isCurrentUserLoading: state.users.isCurrentUserLoading,
    currentPlaceById: state.places.currentPlaceById,
    isLoaded: state.places.isLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersByPlace: places => dispatch(getUsersByPlace(places))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage)
