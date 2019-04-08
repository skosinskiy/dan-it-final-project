import React from 'react'
import './ScreenEventItem.scss'

const ScreenEventItem = (props) => {
  return (
    <div className={'sceenEventItem'}>
      <div className={'sceenEventItem-img'}></div>
      <h2 className={'sceenEventItem-title'}>{props.title}</h2>
      <span className={'sceenEventItem-description'}>{props.shortDescription}</span>
    </div>
  )
}

export default ScreenEventItem