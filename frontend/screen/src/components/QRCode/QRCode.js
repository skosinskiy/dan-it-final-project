import React, {Component} from 'react'
import './QRCode.scss'

export default class QRCode extends Component {
  state = {
    modalIsOpen: false
  }

  render () {
    const modalClassName = this.state.modalIsOpen ? 'qrCodeModal qrCode' : 'qrCode'
    return (
      <div
        className= { modalClassName }
        onClick = {() => { this.setState({ modalIsOpen: !this.state.modalIsOpen }) }}>
        <div className={'qrCode-title'}>Scan me</div>
        <div className={'qrCode-img'}>
        </div>
      </div>
    )
  }
}
