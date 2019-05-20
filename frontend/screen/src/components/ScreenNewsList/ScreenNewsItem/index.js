import React from 'react'
import './ScreenNewsItem.scss'

const ScreenEventItem = (props) => {
  return (
    <a className={'screenNewsItem'} href={props.link}>
      <img className={'screenNewsItem-img'} src={props.img} alt="news-item img" />
      <p className={'screenNewsItem-description'}>{props.description}</p>
    </a>
  )
}

export default ScreenEventItem