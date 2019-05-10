import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import icon1 from '../../../../img/DialoguesPage/dialogue-icon1.jpg'
import './dialogue-item.scss'

class DialoguesItem extends Component {
  state = {
    newMSG: true
  }
  render () {
    const {newMSG} = this.state
    const {image, name, chatMessages, id} = this.props.item
    const {message, createdDate, user} = chatMessages[chatMessages.length - 1]
    const messageDate = createdDate.slice(0, 10) + ' ' + createdDate.slice(11, 16)
    const chatImg = image || icon1
    return (
      <NavLink to={`/messages/${id}`} className="chat-link">
        <li className='dialogue-list__item'>
          <div className='dialogue-list__img-content-flexb'>
            <div className='dialogue-list__img-container'>
              <img src={chatImg} alt=' ' />
            </div>
            <div className='dialogue-list__content-container'>
              <div className='dialogue-list__name'>{name}</div>
              <div className='dialogue-list__preview'>{`${user.firstName}: ${message}`}</div>
            </div>
          </div>
          <div className='dialogue-list__info-container'>
            <div className='dialogue-list__time'>{messageDate}</div>
            <div className='dialogue-list__notifier'>
              {newMSG ? <div className='dialogue-list__circle' /> : null}
            </div>
          </div>
        </li>
      </NavLink>
    )
  }
}

export default DialoguesItem
