import React, { Component } from 'react'
import ContactList from './ContactList'
import MobileHeader from '../../components/MobileHeader'
import headerImage from '../../img/ContactsPage/contactsTemporaryHeaderBg.png'
import headerIcon from '../../img/ContactsPage/home-icon.png'
import { connect } from 'react-redux'
import { getUsersByPlace } from '../../store/users/operations'
import Preloader from '../../components/Preloader'
import { getCurrentPlaceById } from '../../store/places/operations'

class ContactsPage extends Component {
  componentDidMount () {
    const {getUsersByPlace, getCurrentPlaceById} = this.props
    getUsersByPlace(1)
    getCurrentPlaceById(1)
  }

  render () {
    const {usersListByPLace, usersListByPLaceIsLoading, currentUser, isCurrentUserLoading, currentPlaceById, isLoaded} = this.props

    if (usersListByPLaceIsLoading || isCurrentUserLoading || !isLoaded) {
      return <Preloader/>
    }

    const contacts = usersListByPLace.filter(user => {
      return user.id !== currentUser.id
    })
    return (
      <div className='contactsPage parallax-container'>
        <MobileHeader bgImage={headerImage} header='Contacts' location='Pechersky Lypky' icon={headerIcon}/>
        <ContactList contacts={contacts} location={currentPlaceById.title}/>
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
    getUsersByPlace: (placeId) => dispatch(getUsersByPlace(placeId)),
    getCurrentPlaceById: (placeId) => dispatch(getCurrentPlaceById(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage)
