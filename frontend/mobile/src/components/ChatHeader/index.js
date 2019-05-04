import React, { Component } from 'react'
import './chat-header.scss'

class ChatHeader extends Component {
  render () {
    const {title} = this.props
    return (
      <div className="chat-header">
        <button className="chat-header__back-button" type="button">Back</button>
        <span className="chat-header__header-title">{title}</span>
        <div className="chat-header__envelope-icon" />
      </div>
    )
  }
}

export default ChatHeader