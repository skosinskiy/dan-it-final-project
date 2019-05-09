import React, { Component } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import ChatHeader from '../../components/ChatHeader'
import './chat-page.scss'
import { getChatById, createNewMessage } from '../../store/chats/operations'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import ChatList from './ChatList/chatlist'

const defaultMessage = {
  message: ''
}

class ChatPage extends Component {
  state = {
    message: ''
  }

  handleChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  componentDidMount () {
    const {getChatById} = this.props
    const chatId = +this.props.match.params.chatId
    getChatById(chatId)
  }

  sendNewMessage = (chatId) => {
    const {createNewMessage} = this.props
    if (this.state.message) {
      defaultMessage.message = this.state.message
      this.setState({
        message: ''
      })
      createNewMessage(chatId, defaultMessage)
    }
  }

  render () {
    const {currentChat, isLoaded} = this.props
    const {message} = this.state
    if (!isLoaded) {
      return <Preloader/>
    }
    return (
      <div className="chat">
        <ChatHeader title={'Current Location'}/>
        <div className="chat__messages">
          <ScrollToBottom className="chat__scrollable-flex" followButtonClassName="chat__scroll-to-bot">
            <ChatList messages={currentChat.chatMessages}/>
          </ScrollToBottom>
        </div>
        <div className="chat__input">
          <input onChange={this.handleChange} type="text" placeholder="Message" value={message}/>
          <button onClick={() => this.sendNewMessage(currentChat.id)}>Send</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentChat: state.chats.currentChat,
    isLoaded: state.chats.isLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChatById: (chatId) => dispatch(getChatById(chatId)),
    createNewMessage: (chatId, message) => dispatch(createNewMessage(chatId, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)