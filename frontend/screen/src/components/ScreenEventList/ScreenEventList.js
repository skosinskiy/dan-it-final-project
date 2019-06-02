import React, {Component} from 'react'
import ScreenEventItem from './ScreenEventItem/ScreenEventItem'
import {connect} from 'react-redux'
import {getEvantsByPlace} from '../../store/events/operations'
import './ScreenEventList.scss'

class ScreenEventList extends Component {
  state = {
    listOfEvents: [
      { id: 1,
        title: 'Manufactura',
        shortDescription: 'Season sale',
        img: './../../../img/DummyImg/manufactura.svg'},
      { id: 2,
        title: 'Addidas',
        shortDescription: '20 % off',
        img: ''},
      { id: 3,
        title: 'Mail Haircut',
        shortDescription: '100 hrn',
        img: ''},
      { id: 4,
        title: 'Mail Haircut',
        shortDescription: '100 hrn',
        img: ''
      }
    ]
  }

  componentDidMount () {
    const {getEvantsByPlace} = this.props
    getEvantsByPlace(1)
  }

  renderItems (arr) {
    return arr.map((item) => {
      const {id, title, description, mainPhoto} = item
      return (
        <ScreenEventItem
          key={id}
          id = {id}
          title = {title}
          shortDescription = {description}
          img = {mainPhoto}/>
      )
    })
  }

  render () {
    const {eventsByPlace, eventsByPlaceIsLoading} = this.props

    if (eventsByPlaceIsLoading) {}
    const items = this.renderItems(eventsByPlace)
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