import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import BusinessList from './BusinessList'

class ManagingBusinesses extends Component {
  render () {
    return (
      <div>
        <SearchBar searchtype='business_by_name' />
        <BusinessList />
      </div>
    )
  }
}

export default ManagingBusinesses
