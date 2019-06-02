import React, { Component } from 'react'
import { connect } from 'react-redux'
import SectionItem from './SectionItem'
import MobileHeader from '../../components/MobileHeader'
import bag from '../../img/icons/bag.svg'
import './businesses-events.scss'
import { placeOperations } from '../../store/places'
import { getCurrentPlaceById } from '../../store/places/operations'
import { getEventsByPlace } from '../../store/events/operations'
import Preloader from '../../components/Preloader'
import PlaceMessage from './PlaceMessage'
import {NavLink} from 'react-router-dom'

const emptyCurrentPlace = {
  address: '',
  description: '',
  id: '',
  mainPhoto: null,
  photos: [],
  placeCategory: null,
  title: ''
}

class BusinessesEvents extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPlace: this.props.currentPlaceById !== undefined ? this.props.currentPlaceById : emptyCurrentPlace,
      businessesByCategory: null,
      eventsByCategory: null,
      placeMessages: this.props.placeMessages !== undefined ? this.props.placeMessages : []
    }
  }

  componentDidMount () {
    const {fetchBusinessesEventsData} = this.props
    const placeId = +this.props.match.params.placeId
    fetchBusinessesEventsData(placeId)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    console.log(nextProps)
    if (nextProps.currentPlaceById && nextProps.currentPlaceById !== this.props.currentPlaceById) {
      this.setState({
        currentPlace: nextProps.currentPlaceById !== undefined ? nextProps.currentPlaceById : emptyCurrentPlace
      })
    }

    this.setState({
      placeMessages: nextProps.placeMessages !== undefined ? nextProps.placeMessages : []
    })
  }

  getBusinessesByCategory (id) {
    const businesses = this.props.businesses.filter(business => business.categories.map(category => category.id).includes(id))
    const events = this.props.events.filter(event => event.business.categories.map(category => category.id).includes(id))

    this.setState({
      businessesByCategory: businesses,
      eventsByCategory: events
    })
  }

  resetBusinessesByCategory () {
    this.setState({
      businessesByCategory: null,
      eventsByCategory: null
    })
  }

  render () {
    const {businesses, events, isLoaded, currentUser, isBusinessesEventsDataLoading} = this.props
    const placeId = +this.props.match.params.placeId
    const { placeMessages, currentPlace, businessesByCategory, eventsByCategory } = this.state

    if (isBusinessesEventsDataLoading) {
      return <Preloader/>
    }

    const allowPlaceMessages = currentPlace.placeCategory.allowMessages

    const messageList = placeMessages.map(item => {
      const allowDelete = currentUser.id === item.user.id
      return <PlaceMessage key={item.id} placeId={placeId} item={item} context={this} del={allowDelete} />
    })

    const placeMessagesSection = allowPlaceMessages
      ? <div className="place-messages section">
        <div className="section-header">
          <h2 className="section-title">Messages</h2>
          <NavLink to={`/mobile/my-places/${placeId}/new-place-message`} className="section-action_title">add</NavLink>
        </div>
        <div className="section-list">
          {messageList}
        </div>
      </div> : null

    const filteredBusinesses = businessesByCategory !== null ? businessesByCategory : businesses
    const filteredEvents = eventsByCategory !== null ? eventsByCategory : events

    const businessesList = filteredBusinesses.map(item => {
      return <SectionItem key={item.id} item={item} type={'businesses'}/>
    })
    const eventsList = filteredEvents.map(item => {
      return <SectionItem key={item.id} item={item} type={'events'}/>
    })

    let menuItems = []
    if (isLoaded) {
      menuItems = currentPlace.placeCategory.businessCategories.map(item => {
        return (
          <li key={item.id} className="menu-item" onClick={() => this.getBusinessesByCategory(item.id)}>
            <div className="menu-item_icon"><img style={{width: '30px', height: '30px'}} src={item.iconUrl} alt={item.name}/></div>
            <div className="menu-item_text">{item.name}</div>
          </li>
        )
      })
    }

    const photos = currentPlace.photos
      ? currentPlace.photos.filter(photo => photo.id !== currentPlace.mainPhoto.id)
      : []
    if (currentPlace.photos) {
      photos.unshift(currentPlace.photos.find(photo => photo.id === currentPlace.mainPhoto.id))
    }

    return (
      <div className="businesse-container parallax-container">
        <MobileHeader
          backLink={'/mobile/home'}
          photos={photos}
          header={currentPlace.placeCategory ? currentPlace.placeCategory.name : ''}
          location={currentPlace.title} bgImage={''} icon={bag} />
        <div className="content">
          <div className="navbar section">
            <div className="section-header">
              <h2 className="section-title">Explore</h2>
              <h2 className="section-action_title" onClick={() => this.resetBusinessesByCategory()}>clear</h2>
            </div>
            <ul className="menu">
              {menuItems}
            </ul>
          </div>
          <div className="businesses section">
            <div className="section-header">
              <h2 className="section-title">
                Popular near {currentPlace.title}
              </h2>
            </div>
            <div className="section-list">
              {businessesList}
            </div>
          </div>
          <div className="events section">
            <div className="section-header">
              <h2 className="section-title">Events</h2>
            </div>
            <div className="section-list">
              {eventsList}
            </div>
          </div>
          {placeMessagesSection}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const currentPlaceById = !state.places.currentPlaceById.id && state.users.currentUser
    ? state.users.currentUser.places[0]
    : state.places.currentPlaceById

  return {
    currentUser: state.users.currentUser,
    businesses: state.businesses.businessesByPlace,
    events: state.events.events,
    currentPlaceById: currentPlaceById,
    placeMessages: state.places.placeMessages,
    isLoaded: state.places.isLoaded,
    isBusinessesEventsDataLoading: state.places.isBusinessesEventsDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventsByPlace: (placeId) => dispatch(getEventsByPlace(placeId)),
    getCurrentPlaceById: (placeId) => dispatch(getCurrentPlaceById(placeId)),
    fetchBusinessesEventsData: placeId => dispatch(placeOperations.fetchBusinessesEventsData(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessesEvents)