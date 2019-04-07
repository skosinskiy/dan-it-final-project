import React, {Component} from 'react'
import ScreenEventItem from './ScreenEventItem/ScreenEventItem'
import './ScreenEventList.scss'

export default class ScreenEventList extends Component {
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

  renderItems (arr) {
    return arr.map((item) => {
      const {id, title, shortDescription, img} = item
      return (
        <ScreenEventItem
          key={id}
          title = {title}
          shortDescription = {shortDescription}
          img = {img}/>
      )
    })
  }

  render () {
    const items = this.renderItems(this.state.listOfEvents)
    return (
      <div className={'screenEventList'}>
        {items}
      </div>
    )
  }
}