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
      await QR.toDataURL(text, opts)
    } catch (err) {
      console.log(err)
    }

   /* await QR.toDataURL(text, opts, function (err, url) {
      if (err) throw err
      console.log('<<<>>>')
      console.log(url)
      return url
    })*/
  }

  componentDidMount () {
    const { id } = this.props.place
    const qrImage = this.getQR(`api/mobile/login?placeId=${id}`)
    console.log('<<<>>>')
    console.log(qrImage)
    this.setState({qrImage: qrImage})
  }

  render () {
    const qrImage = this.state
    const modalClassName = this.state.modalIsOpen ? 'qrCodeModal qrCode' : 'qrCode'
    return (
      <div
        className= { modalClassName }
        onClick = {() => { this.setState({ modalIsOpen: !this.state.modalIsOpen }) }}>
        <div className={'qrCode-title'}>Scan me</div>
        <div className={'qrCode-img-cont'}>
          <img className={'qrCode-img'} src={qrImage} alt="QR generation failed"/>
        </div>
      </div>
    )
  }
}
