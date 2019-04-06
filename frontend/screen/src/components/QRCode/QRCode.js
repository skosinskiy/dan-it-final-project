import React from 'react'
import {ReactComponent as QRCodeImg} from '../../img/DummyImg/QR_code.svg';
import './QRCode.scss'

const QRCode = () =>{
  return(
      <div className={'qrCode'}>
        <div className={'qrCode-title'}>Scan me</div>
        <div className={'qrCode-img'}>
        </div>
      </div>
  )
}

export default QRCode