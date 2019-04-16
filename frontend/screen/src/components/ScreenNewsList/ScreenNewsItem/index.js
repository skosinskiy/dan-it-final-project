import React from 'react'
import './ScreenNewsItem.scss'

const ScreenEventItem = (props) => {
  return (
    <div className={'screenNewsItem'} onClick={() => (console.log("window.location='http://google.com'"))}>
      <div className={'screenNewsItem-img'}/>
      <p className={'screenNewsItem-description'}>{props.description}</p>
    </div>
  )
}

export default ScreenEventItem