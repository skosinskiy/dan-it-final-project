import React, {Component} from 'react'
import SearchBar from '../Searchbar'

class ManagingBusinesses extends Component {
  render () {
    return (
      <div>
        <SearchBar searchtype='business_by_name' />
      </div>
    )
  }
}

export default ManagingBusinesses
