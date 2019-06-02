import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import * as eventOperations from '../../store/events/operations'
import Preloader from '../../components/Preloader'
import './SingleEventPage.scss'

class SingleEventPage extends Component {
  componentWillMount () {
    const {getEventById} = this.props
    getEventById(this.props.match.params.id)
  }
  render () {
    const {eventItem} = this.props
  
    if (!Object.keys(eventItem).length) {
      return <Preloader/>
    }

    const mainPhoto = eventItem.mainPhoto != null ? eventItem.mainPhoto : 'https://www.film.ru/images/empty/260x400.png'
    return (
      <div className='ep-wrapper'>
        <NavLink to='/screen/businesses/' className='bp_back-btn'>
          Back
        </NavLink>
        <h2 className='ep__title'>{eventItem.title}</h2>
        <div className='ep-info'>
          <div style={{backgroundImage: `url(${mainPhoto})`}} className='ep-info__photo'/>
          <div className='ep-info_text'>
            <p className='ep-info_text__address'>{eventItem.address}</p>
            <p className='ep-info_text__description'>{eventItem.description}</p>
            <span className='ep-info_text__date date-start'>{eventItem.startDate ? eventItem.startDate : '1.1.11111 18:00'}</span>
            <span className='ep-info_text__date date-end'>{eventItem.endDate ? eventItem.startDate : '1.1.11111 20:00'}</span>
            <div className='ep-info__categories'>
              {[...eventItem.categories.map(item => <p key={Math.random()} className='ep-categories-info__text'>{item.name}</p>)]}
            </div>
            <p className='ep-place'>
              {eventItem.place.title}
            </p>
          </div>
        </div>
        <div className='ep-photos'>
          {[...eventItem.photos.map(item => <img key={Math.random()} className='ep-photo__item' src={item.imageUrl} alt='event-photos-item'/>)]}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    eventItem: state.events.eventItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEventById: (id) => dispatch(eventOperations.getEventById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventPage)