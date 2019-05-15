import React, { Component } from 'react'
import MessageItem from './MessageItem/messageItem'

class ChatList extends Component {
  render () {
    const {messages} = this.props
    return messages.map((msg) => {
      return <MessageItem key={msg.id} message={msg}/>
    })
  }
}

export default ChatList