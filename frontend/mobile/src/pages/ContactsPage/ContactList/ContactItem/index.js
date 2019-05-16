import React, { Component } from 'react'
import './contact-item.scss'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { createNewChat } from '../../../../store/chats/operations'

const defaultChat = {
  name: 'Somechat',
  users: []
}

class ContactItem extends Component {
  createChat = (item) => {
    const {currentUser, createNewChat} = this.props
    let flag = false
    currentUser.chats.forEach(chat => {
      if (chat.users.length === 2) {
        chat.users.forEach(user => {
          if (user.id === item.id) {
            flag = true
          }
        })
      }
    })

    if (!flag) {
      defaultChat.name = item.firstName + ' ' + currentUser.firstName
      defaultChat.users.push(item)
      defaultChat.users.push(currentUser)
      createNewChat(defaultChat)
    }
  }
  render () {
    const {item, location, currentUser} = this.props
    console.log(currentUser.chats)
    let presentChat
    currentUser.chats.forEach(chat => {
      if (chat.users.length === 2) {
        chat.users.forEach(user => {
          if (user.id === item.id) {
            presentChat = chat
          }
        })
      }
    })
    const link = presentChat.id ? `/messages/${presentChat.id}` : `/messages`
    return (
      <NavLink to={link}>
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
