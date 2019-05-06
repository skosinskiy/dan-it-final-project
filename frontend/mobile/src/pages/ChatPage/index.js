import React, { Component } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import ChatHeader from '../../components/ChatHeader'
import './chat-page.scss'
import { getChatById, createNewMessage } from '../../store/chats/operations'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'

const defaultMessage = {
  message: ''
}

const currentUser = 1

const ChatList = (props) => {
  const { messages } = props
  return messages.map((msg) => {
    const myMsg = props.currentUser === msg.user.id
    return (
      <div key={msg.id} className='chat-message'>
        { !myMsg &&
          <div className="chat-message__avatar-container">
            <img src={msg.user.photo} alt=" " className="chat-message__avatar"/>
            { msg.online ? <div className="chat-message__online"/> : null}
          </div>
        }
        <div className={`chat-message__text-container${myMsg ? '--my-message' : ''}`}>
          <div className="chat-message__name" >{msg.user.firstName}</div>
          <div className="chat-message__content" >{msg.message}</div>
        </div>
      </div>
    )
  })
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
            <ChatList messages={currentChat.chatMessages} currentUser={currentUser} />
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
    isLoaded: state.chats.isLoaded,
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChatById: (chatId) => dispatch(getChatById(chatId)),
    createNewMessage: (chatId, message) => dispatch(createNewMessage(chatId, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)