import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEventById} from '../../store/events/operations'
import Preloader from '../../components/Preloader'
import '../SingleBusinessPage/SingleBusinessesPage.scss'
import SectionItem from '../BusinessesEvents/SectionItem'
import MobileHeader from '../../components/MobileHeader'

class SingleEventPage extends Component {
  componentDidMount () {
    const {getEventById} = this.props
    getEventById(+this.props.match.params.eventId)
  }

  formatDate (dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleTimeString('en-GB', options)
  }

  render () {
    const {currentEvent, currentEventIsLoading} = this.props
    if (currentEventIsLoading) {
      return <Preloader/>
    }

    const business = currentEvent.business
      ? <SectionItem key={currentEvent.business.id} item={currentEvent.business} type={'businesses'}/>
      : <div className="section-item__address">{'There is no business'}</div>

    const photos = currentEvent.photos
      ? currentEvent.photos.filter(photo => photo.id !== currentEvent.mainPhoto.id)
      : []
    if (currentEvent.photos) {
      photos.unshift(currentEvent.photos.find(photo => photo.id === currentEvent.mainPhoto.id))
    }

    return (
      <div className="parallax-container">
        <MobileHeader photos={photos} backLink={'/mobile/home'}/>
        <div className={'business-container'}>
          <h2 className="bp-title">{currentEvent.title}</h2>
          <div className="bp-info__categories">
            <p className="bp-categories-info__text">{currentEvent.categories.map(cat => cat.name).join(',')}</p>
          </div>
          <div className="bp_description">{currentEvent.description}</div>
          <div className="bp-info">
            <div className="bp-info_text">
              <h2 className='bp-subtitle'>Time</h2>
              <p className="bp-info_text__phone">
                {`Start: ${this.formatDate(currentEvent.startDate)}`}
              </p>
              <p className="bp-info_text__phone">
                {`End: ${this.formatDate(currentEvent.endDate)}`}
              </p>
              <a href={`//${currentEvent.webSite}`} className="bp-info_text__site">
                {currentEvent.webSite}
              </a>
            </div>
          </div>
          <div className="bp-info">
            <div className="bp-info_text">
              <h2 className='bp-subtitle'>Address</h2>
              <p className="bp-categories-info__text">{currentEvent.place.title}</p>
              <p className="bp-info_text__address">{currentEvent.address}</p>
            </div>
          </div>
          <div className="bp-info">
            <div className="bp-info_text">
              <h2 className='bp-subtitle__events'>Business</h2>
              <div className="section-list">
                {business}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentEvent: state.events.currentEvent,
    currentEventIsLoading: state.events.currentEventIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventById: (id) => dispatch(getEventById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventPage)