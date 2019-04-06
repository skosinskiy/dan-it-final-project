import React, { Component } from 'react'
import {ReactComponent as BoyImg} from '../../../../img/icons/boy.svg'

const Message = (props) => {
  const {link, image, text, openDialog} = props
  const shortify = (text, maxlength = 100) => {
    if (text.length < maxlength) {
      return text
    }
    return `${text.slice(0, maxlength - 3)}...`
  }
  return (
    <li onClick={openDialog} className={'messages__item'}>
      {/* <img src={image} className={'messages__item__photo'} /> */}
      <BoyImg className={'messages__item__photo'}/>
      <a href={link} className={'messages__item__text'}>{shortify(text)}</a>
    </li>
  )
}
  
export default Message