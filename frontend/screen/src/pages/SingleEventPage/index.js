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
    const screenId = +this.props.match.params.screenId
  
    if (!Object.keys(eventItem).length) {
      return <Preloader/>
    }
    const startDate = new Date(eventItem.startDate)
    const endDate = new Date(eventItem.endDate)

    console.log(eventItem.photos)

    return (
      <div className='ep-wrapper'>
        <div className={'ep-info'}>
          <NavLink to={`/screen/${screenId}`} className='ep_back-btn'>
            Back
          </NavLink>
          <h2 className='ep__title'>{eventItem.title}</h2>
          <div className='ep-info_text'>
            <p className='ep-info_text__address'>{eventItem.address}</p>
            {(startDate) ? <span className='ep-info_text__date date-start'>{startDate.toLocaleString()}</span> : null}
            {(endDate) ? <span className='ep-info_text__date date-end'>{endDate.toLocaleString()}</span> : null}
            <p className='ep-info_text__description'>{eventItem.description}</p>
            <div className='ep-info__categories'>
              {[...eventItem.categories.map(item => <p key={Math.random()} className='ep-categories-info__text'>{item.name}</p>)]}
            </div>
            <p className='ep-place'>
              {eventItem.place.title}
            </p>
          </div>
        </div>
        <div className={'ep-place-photo-wrapper'}>
          <div className='ep-photos'>
            {[...eventItem.photos.map(item => <div key={Math.random()} className='ep-photo__item' style={{backgroundImage: `url(${item.imageUrl})`}} alt='event-photos-item'></div>)]}
          </div>
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
