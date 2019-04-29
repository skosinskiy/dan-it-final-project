import React, { Component } from 'react'
import './chat-page.scss'

class ChatPage extends Component {
  render () {
    return (
      <div className="chat">
        <div className="chat__header">
          <button className="chat__back-button" type="button">Back</button>
          <span className="chat__header-title">Grynchenka 20</span>
          <div className="chat__envelope-icon" />
        </div>
        <div className="chat__messages">Messages</div>
        <div className="chat__input">
          <input type="text"/>
        </div>
      </div>
    )
  }
}

export default ChatPage