import React, { Component } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import ChatHeader from '../../components/ChatHeader'
import './chat-page.scss'
import {getChatById, createNewMessage, createNewChat} from '../../store/chats/operations'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Preloader from '../../components/Preloader'
import ChatList from './ChatList/chatlist'
import SockJsClient from 'react-stomp'

const defaultMessage = {
  message: ''
}

class ChatPage extends Component {
  state = {
    message: '',
    messages: []
  }

  handleChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  componentDidMount () {
    const {getChatById, match, currentUser, createNewChat} = this.props

    if (match.params.chatId !== 'new') {
      const chatId = +this.props.match.params.chatId
      getChatById(chatId).then(() => {
        console.log(this.props.currentChat)
        this.setState({
          ...this.state,
          messages: this.props.currentChat.chatMessages
        })
      })
    } else {
      const userId = +this.props.match.params.userId
      const newChat = {
        users: [{id: userId}, {id: currentUser.id}],
        chatMessages: []
      }
      createNewChat(newChat).then(() => {
        this.setState({
          ...this.state,
          messages: this.props.currentChat.messages
        })
      })
    }
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

  onMessageReceive = (msg, topic) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }))
  }

  render () {
    const {currentChat, isLoaded, isCurrentUserLoading, currentUser} = this.props
    const {message} = this.state

    if (!isLoaded || isCurrentUserLoading) {
      return <Preloader/>
    }

    const chatUsers = currentChat.users.find(user => user.id !== currentUser.id)
    const chatTitle = currentChat.users.length === 2
      ? (chatUsers ? `${chatUsers.firstName} ${chatUsers.lastName}` : null)
      : '' || currentChat.name
    // const wsSourceUrl = window.location.protocol + '//' + window.location.host + '/ws'
    const wsSourceUrl = 'https://ec2-3-14-226-139.us-east-2.compute.amazonaws.com:9000/ws'
    return (
      <div className="chat">
        <SockJsClient url={wsSourceUrl} topics={[`/topic/chats/${currentChat.id}`]}
          onMessage={this.onMessageReceive}
          ref={ (client) => { this.clientRef = client }} />
        <ChatHeader title={chatTitle}/>
        <div className="chat__messages">
          <ScrollToBottom className="chat__scrollable-flex" followButtonClassName="chat__scroll-to-bot">
            <ChatList messages={this.state.messages}/>
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

ChatPage.propTypes = {
  currentChat: PropTypes.object.isRequired,
  isCurrentUserLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentChat: state.chats.currentChat,
    currentUser: state.users.currentUser,
    isLoaded: state.chats.isLoaded,
    isCurrentUserLoading: state.users.isCurrentUserLoading,
    chatIsCreated: state.chats.chatIsCreated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChatById: (chatId) => dispatch(getChatById(chatId)),
    createNewChat: (chat) => dispatch(createNewChat(chat)),
    createNewMessage: (chatId, message) => dispatch(createNewMessage(chatId, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)