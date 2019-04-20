import React, {Component} from 'react'
import './dialogue-item.scss'

class DialoguesItem extends Component {
  render () {
    const {image, name, lastMessage} = this.props.item
    const {from, content, time, newMSG} = lastMessage
    return (
      <li className='dialogue-list__item'>
        <div className='dialogue-list__img-content-flexb'>
          <div className='dialogue-list__img-container'>
            <img src={image} alt=' ' />
          </div>
          <div className='dialogue-list__content-container'>
            <div className='dialogue-list__name'>{name}</div>
            <div className='dialogue-list__preview'>{`${from}: ${content}`}</div>
          </div>
        </div>
        <div className='dialogue-list__info-container'>
          <div className='dialogue-list__time'>{time}</div>
          <div className='dialogue-list__notifier'>
            {newMSG ? <div className='dialogue-list__circle' /> : null}
          </div>
        </div>
      </li>
    )
  }
}

export default DialoguesItem
