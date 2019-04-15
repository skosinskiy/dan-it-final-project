import React, {Component} from 'react'
import './business-item.scss'

class BusinessItem extends Component {
  render () {
    const {business} = this.props
    console.log(business)
    return (
      <div className="business-item">
        <div className="photo" style={{backgroundImage: `url(${business.photo})`}}></div>
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