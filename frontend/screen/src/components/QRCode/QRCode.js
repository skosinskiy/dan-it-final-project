import React, {Component} from 'react'
import QR from 'qrcode'
import './QRCode.scss'

export default class QRCode extends Component {
  state = {
    modalIsOpen: false,
    qrImage: null
  }

  getQR = async text => {
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 0.3
      }
    }

    try {
      return await QR.toDataURL(text, opts)
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount () {
    const { id } = this.props.place
    const qrImage = this.getQR(`https://${window.location.hostname}:9000/mobile/login/placeId/${id}`)
    qrImage.then((value) => {
      this.setState({qrImage: value})
    })
  }

  render () {
    const { qrImage } = this.state
    const modalClassName = this.state.modalIsOpen ? 'qrCodeModal qrCode' : 'qrCode'
    return (
      <div
        className= { modalClassName }
        onClick = {() => { this.setState({ modalIsOpen: !this.state.modalIsOpen }) }}>
        <div className={'qrCode-title'}>Scan me</div>
        <img className={'qrCode-img'} src={qrImage} alt="QR generation failed"/>
      </div>
    )
  }
}
