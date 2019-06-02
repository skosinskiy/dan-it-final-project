import React from 'react'
import { NavLink } from 'react-router-dom'
import './ScreenEventItem.scss'

class ScreenEventItem extends React.Component {
  render () {
    const {img, shortDescription, title, id} = this.props
    const bgImg = img != null ? img : 'https://www.film.ru/images/empty/260x400.png'
    return (
      <NavLink to={`/screen/events/${id}`}>
        <div className={'sceenEventItem'}>
          <div className={'sceenEventItem-img'} style={{backgroundImage: `url(${bgImg})`}}></div>
          <h2 className={'sceenEventItem-title'}>{title}</h2>
          <span className={'sceenEventItem-description'}>{shortDescription}</span>
        </div>
      </NavLink>
    )
  }
}

export default ScreenEventItem