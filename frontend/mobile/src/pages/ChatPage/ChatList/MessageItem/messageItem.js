import React, { Component } from 'react'
import { deleteMessage } from '../../../../store/chats/operations'
import { connect } from 'react-redux'

class MessageItem extends Component {
  state = {
    hidden: true
  }

  deleteMessage = (chatId) => {
    const {deleteMessage, message, currentUser} = this.props
    if (message.user.id === currentUser.id) {
      deleteMessage(chatId, message.id)
    }
  }

  deleteWindowHandler = () => {
    const {message, currentUser} = this.props
    if (message.user.id === currentUser.id) {
      this.setState({
        hidden: !this.state.hidden
      })
    }
  }

  render () {
    const {message, currentChat, currentUser} = this.props
    const {hidden} = this.state
    const myMsg = message.user.id === currentUser.id
    return (
      <div key={message.id} className='chat-message'>
        {!myMsg &&
        <div className="chat-message__avatar-container">
          <img src={message.user.photo} alt=" " className="chat-message__avatar"/>
          {message.online ? <div className="chat-message__online"/> : null}
        </div>
        }
        <div className={`chat-message__text-container${myMsg ? '--my-message' : ''}`}>
          <div className="chat-message__name">{message.user.firstName}</div>
          <div className="chat-message__content" onClick={() => this.deleteWindowHandler()}>
            {message.message}
            <div
              className="chat-message__delete-message"
              hidden={hidden}
              onClick={() => this.deleteMessage(currentChat.id)}>delete</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentChat: state.chats.currentChat,
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: (chatId, messageId) => dispatch(deleteMessage(chatId, messageId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageItem)