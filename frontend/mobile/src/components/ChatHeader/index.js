import React, { Component } from 'react'
import './chat-header.scss'

class ChatHeader extends Component {
  render () {
    const {title} = this.props
    return (
      <div className="chat__header">
        <button className="chat__back-button" type="button">Back</button>
        <span className="chat__header-title">{title}</span>
        <div className="chat__envelope-icon" />
      </div>
    )
  }
}

export default ChatHeader