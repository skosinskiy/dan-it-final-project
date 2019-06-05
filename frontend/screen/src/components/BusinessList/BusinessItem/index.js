import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import './business-item.scss'

class BusinessItem extends Component {
  render () {
    const {business, screenId} = this.props
    const img = business.mainPhoto != null ? business.mainPhoto : 'https://www.film.ru/images/empty/260x400.png'
    return (
      <NavLink to={`/screen/${screenId}/businesses/${business.id}`}>
        <div className="business-item">
          <div className="photo" style={{backgroundImage: `url(${img})`}}></div>
          <div className="description">
            <h2>{business.title}</h2>
            <h3>{business.address}</h3>
            <p>{business.description}</p>
          </div>
        </div>
      </NavLink>
    )
  }
}

export default BusinessItem