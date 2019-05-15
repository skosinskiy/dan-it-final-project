import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './chat-header.scss'

class ChatHeader extends Component {
  render () {
    const {title} = this.props
    return (
      <div className="chat-header">
        <NavLink to={`/dialogs`} className="back-btn-link"><button className="chat-header__back-button" type="button">Back</button></NavLink>
        <span className="chat-header__header-title">{title}</span>
        <div className="chat-header__envelope-icon" />
      </div>
    )
  }
}

export default ChatHeader