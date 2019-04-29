import React, { Component } from 'react'
import './chat-page.scss'

class ChatPage extends Component {
  render () {
    return (
      <div className="chat">
        <div className="chat__header">
          Header
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