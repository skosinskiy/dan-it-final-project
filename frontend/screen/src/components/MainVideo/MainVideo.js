import React from 'react'
import './MainVideo.scss'
import QRCode from '../QRCode/QRCode.js'

const MainVideo = () => {
  return (
    <div className={'MainVideo'}>
      <img className={'MainVideo-gif'} src={require('../../img/DummyImg/nature.gif')} alt ='img' />
      <QRCode />
    </div>
  )
}

export default MainVideo