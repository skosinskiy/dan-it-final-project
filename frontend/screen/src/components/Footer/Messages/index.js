import React, { Component } from 'react'
import Message from './Message'
import Modal from 'react-modal'
import {ReactComponent as BoyImg} from '../../../img/icons/boy.svg'
import 'react-dialog/css/index.css'
import './index.scss'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
Modal.setAppElement('#root')
export default class Messages extends Component {
  state = {
    activeMessage: null
  }
  openDialog = (message) => this.setState({ activeMessage: message })
 
  handleClose = () => this.setState({ activeMessage: null })
  render () {
    const {messages} = this.props
    const {activeMessage} = this.state
    const messageItems = messages.map((message, index) => {
      return (<Message key={`message${index}`} openDialog={() => {
        this.openDialog(message)
      }} {...message}/>)
    })
    return (
      <ul className="messages">
        {messageItems}
        {
          this.state.activeMessage &&
          <Modal
            isOpen={this.state.activeMessage}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleClose}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
          >
            <div className={'messages__item'}>
              <BoyImg className={'messages__item__photo'}/>
              <p href={activeMessage.link} className={'messages__item__text'}>{activeMessage.text}</p>
            </div>
            <button onClick={this.handleClose} className="messages__button">Close</button>
          </Modal>
        }
      </ul>

    )
  }
}
