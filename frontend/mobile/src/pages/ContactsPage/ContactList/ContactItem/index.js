import React, { Component } from 'react'
import './contact-item.scss'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { createNewChat } from '../../../../store/chats/operations'

class ContactItem extends Component {
  createChat = (user) => {
    const {currentUser, createNewChat} = this.props
    const defaultChat = {
      name: '',
      users: []
    }
    defaultChat.name = user.firstName + ' ' + currentUser.firstName
    defaultChat.users.push(user)
    defaultChat.users.push(currentUser)
    createNewChat(defaultChat)
  }
  render () {
    const {item, location} = this.props
    return (
      <NavLink to={`/messages/new`} className="chat-link">
        <li onClick={() => this.createChat(item)} className='contact-list__item'>
          <div className='contact-list__img-container'>
            <div>{`${(item.firstName.charAt(0) + item.lastName.charAt(0)).toUpperCase()}`}</div>
          </div>
          <div className='contact-list__text-container'>
            <div className='contact-list__names'>
              <p>{item.firstName}</p>
              <p>{item.lastName}</p>
            </div>
            <div className='contact-list__location' >
              <p>{location}</p>
            </div>
          </div>
        </li>
      </NavLink>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    isCurrentUserLoading: state.users.isCurrentUserLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewChat: (chat) => dispatch(createNewChat(chat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem)
