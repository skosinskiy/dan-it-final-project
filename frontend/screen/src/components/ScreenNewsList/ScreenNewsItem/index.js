import React from 'react'
import './ScreenNewsItem.scss'

const ScreenEventItem = (props) => {
  return (
    <div className={'screenNewsItem'} onClick={() => (console.log("window.location='http://google.com'"))}>
      <div className={'screenNewsItem-img'}/>
      { /* <img className={'screenNewsItem-img'} src={props.img} alt="news-item img" /> */}
      <p className={'screenNewsItem-description'}>{props.description}</p>
    </div>
  )
}

export default ScreenEventItem