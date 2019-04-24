import React, {Component} from 'react'
import './business-item.scss'

class BusinessItem extends Component {
  render () {
    const {business} = this.props
    const img = business.photos.length ? business.photos[0].imageUrl : 'https://foodcity.ru/storage/services/August2018/HHEX6ItB8AM42tyUAR5g.jpg'
    return (
      <div className="business-item">
        <div className="photo" style={{backgroundImage: `url(${img})`}}></div>
        <div className="description">
          <h2>{business.title}</h2>
          <h3>{business.address}</h3>
          <p>{business.description}</p>
        </div>
      </div>
    )
  }
}

export default BusinessItem