import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './dialogue-item.scss'
import {connect} from 'react-redux'

const defaultMessage = {
  message: '',
  createdDate: '',
  user: {
    firstName: ''
  }
}

class DialoguesItem extends Component {
  render () {
    const {item, currentUser} = this.props
    const {name, chatMessages, id} = item
    const lastMessage = chatMessages.length === 0 ? defaultMessage : chatMessages[chatMessages.length - 1]
    const {message, createdDate, user} = lastMessage
    const messageDate = createdDate.slice(0, 10) + ' ' + createdDate.slice(11, 16)

    const chatUsers = item.users.find(user => user.id !== currentUser.id)
    console.log(chatUsers)
    const renderName = item.users.length === 2
      ? (chatUsers ? `${chatUsers.firstName} ${chatUsers.lastName}` : null)
      : name

    return (
      <NavLink to={`/mobile/messages/${id}`} className="chat-link">
        <li className='dialogue-list__item'>
          <div className='dialogue-list__img-content-flexb'>
            <div className='dialogue-list__img-container'>
              {renderName.split(' ').map(name => name.charAt(0)).join('').toUpperCase()}
            </div>
            <div className='dialogue-list__content-container'>
              <div className='dialogue-list__name'>{renderName}</div>
              <div className='dialogue-list__preview'>
                {lastMessage === defaultMessage
                  ? 'No messages yet'
                  : `${user.id === currentUser.id ? 'You' : `${user.firstName}`}: ${message}`}
              </div>
            </div>
          </div>
          <div className='dialogue-list__info-container'>
            <div className='dialogue-list__time'>{messageDate}</div>
          </div>
        </li>
      </NavLink>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps, null)(DialoguesItem)
