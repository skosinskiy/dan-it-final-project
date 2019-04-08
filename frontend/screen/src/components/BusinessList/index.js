import React, {Component} from 'react'
import BusinessItem from './BusinessItem'

class BusinessList extends Component {
  render () {
    return (
      <div className="business-list">
        <BusinessItem/>
        <BusinessItem/>
        <BusinessItem/>
        <BusinessItem/>
      </div>
    )
  }
}

export default BusinessList