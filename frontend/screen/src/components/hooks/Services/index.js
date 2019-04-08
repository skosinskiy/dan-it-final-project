import React, {Component} from 'react'
import BusinessList from '../../BusinessList'
import Businesses from '../../../dummy'

const businessesList = Businesses

class Services extends Component {
  render () {
    return (
      <BusinessList/>
    )
  }
}

export default Services