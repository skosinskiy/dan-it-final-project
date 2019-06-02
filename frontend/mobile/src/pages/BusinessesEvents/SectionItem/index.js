import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './section-item.scss'

class SectionItem extends Component {
  render () {
    const {item, type} = this.props
    const image = item.photos && item.mainPhoto
      ? item.photos.find(photo => photo.id === item.mainPhoto.id).imageUrl
      : ''

    return (
      <NavLink to={`/mobile/${type}/${item.id}`} className="item-link">
        <div className="section-item">
          <div className="section-item__img" style={{backgroundImage: `url(${image})`}} />
          <div className="section-item__text">
            <div className="section-item__title">{item.title}</div>
            <div className="section-item__address">{item.address}</div>
          </div>
        </div>
      </NavLink>
    )
  }
}

export default SectionItem