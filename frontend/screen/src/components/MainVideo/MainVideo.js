import React from 'react'
import './MainVideo.scss'

const MainVideo = () => {
  return (
    <div className={'MainVideo'}>
      <img className={'MainVideo-gif'} src={require('../../img/DummyImg/nature.gif')} alt ='img' />
    </div>
  )
}

export default MainVideo