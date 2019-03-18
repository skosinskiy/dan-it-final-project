import React, { Component } from 'react'
import SearchBar from './Searchbar'
import BuildingsList from './BuildingsList'

class ManagingBuildingsTypes extends Component {
  render () {
    return (
      <div>
        <SearchBar/>
        <BuildingsList/>
      </div>
    )
  }
}

export default ManagingBuildingsTypes