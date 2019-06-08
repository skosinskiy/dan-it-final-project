import React from 'react'
import './MainVideo.scss'

const MainVideo = (props) => {
  let url = ''
  if (props.currentPlase.id === 1) {
    url = 'xtxMAfNDk-E'
  } else if (props.currentPlase.id === 3) {
    url = 'dqQEX2ZMeoE'
  } else {
    url = 'SwFw-5IDbsw'
  }
  return (
    <div className={'MainVideo'} onClick={ (event) => { event.stopPropagation(); console.log(event) } }>
      <div className={'overlay'}></div>
      <iframe autoplay className={'MainVideo__iframe'} title={'video'} src={`https://www.youtube.com/embed/${url}?version=3&autoplay=1&playlist=${url}&loop=1&controls=1`} frameBorder="5"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
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