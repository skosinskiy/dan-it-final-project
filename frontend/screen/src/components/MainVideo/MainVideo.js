import React from 'react'
import './MainVideo.scss'

const MainVideo = () => {
  return (
    <div className={'MainVideo'}>
      <iframe className={'MainVideo__iframe'} title={'video'} src="https://www.youtube.com/embed/dqQEX2ZMeoE" frameBorder="5"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  )
}
// const MainVideo = () => {
//   return (
//     <div className={'MainVideo'}>
//       <img className={'MainVideo-gif'} src={require('../../img/DummyImg/nature.gif')} alt ='img' />
//     </div>
//   )
// }
export default MainVideo