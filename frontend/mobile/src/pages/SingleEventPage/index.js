import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import './SingleEventPage.scss'
import {getEventById} from '../../store/events/operations'
import Preloader from '../../components/Preloader'

class SingleEventPage extends Component {
  componentDidMount () {
    const {getEventById} = this.props
    getEventById(+this.props.match.params.eventId)
  }
  render () {
    const {currentEvent, currentEventIsLoading, currentPlaceById} = this.props
    if (currentEventIsLoading) {
      return <Preloader/>
    }
    const link = currentPlaceById.id ? `/mobile/my-places/${currentPlaceById.id}` : '/mobile/home'
    const img = currentEvent.mainPhoto
    return (
      <div className="bp-wrapper">
        <NavLink to={link} className="bp_back-btn">
          Back
        </NavLink>
        <h2 className="bp__title">{currentEvent.title}</h2>
        <div className="bp-info">
          <div style={{backgroundImage: `url(${img})`}} className="bp-info__photo"/>
          <div className="bp-info_text">
            <p className="bp-info_text__address">{currentEvent.address}</p>
            <div className="bp-info_text__phone">{currentEvent.phoneNumber}</div>
            <a href={currentEvent.webSite} className="bp-info_text__site">{currentEvent.webSite}</a>
            <div className="bp-info__categories">
              {[...currentEvent.categories.map(item => <p key={Math.random()} className="bp-categories-info__text">{item.name}</p>)]}
            </div>
          </div>
        </div>
        <div className="bp_description">{currentEvent.description}</div>
        <div className="bp-place-photo-wrapper">
          <div className="bp-places">
            <p className="bp-places__item">{currentEvent.place.title}</p>
          </div>
          <div className="bp-photos">
            {[...currentEvent.photos.map(item => <p key={Math.random()} className="bp-photo__item">{item.photo}</p>)]}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentEvent: state.events.currentEvent,
    currentEventIsLoading: state.events.currentEventIsLoading,
    currentPlaceById: state.places.currentPlaceById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventById: (id) => dispatch(getEventById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventPage)