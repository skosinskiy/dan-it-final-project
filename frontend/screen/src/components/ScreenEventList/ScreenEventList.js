import React, {Component} from 'react'
import ScreenEventItem from './ScreenEventItem/ScreenEventItem'
import {connect} from 'react-redux'
import {getEvantsByPlace} from '../../store/events/operations'
import './ScreenEventList.scss'

class ScreenEventList extends Component {
  componentDidMount () {
    const {getEvantsByPlace, screenId} = this.props
    getEvantsByPlace(screenId)
  }

  renderItems (arr, screenId) {
    return arr.map((item) => {
      const {id, title, description, mainPhoto} = item
      return (
        <ScreenEventItem
          key={id}
          id = {id}
          title = {title}
          shortDescription = {description}
          img = {mainPhoto}
          screenId={screenId}/>
      )
    })
  }

  render () {
    const {eventsByPlace, eventsByPlaceIsLoading, screenId} = this.props

    if (eventsByPlaceIsLoading) {}
    const items = this.renderItems(eventsByPlace, screenId)
    return (
      <div className={'screenEventList'}>
        {items}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    eventsByPlace: state.events.eventsByPlace,
    eventsByPlaceIsLoading: state.events.eventsByPlaceIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEvantsByPlace: placeId => dispatch(getEvantsByPlace(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenEventList)