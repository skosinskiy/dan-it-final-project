import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import UserTable from './UserTable'

class ManagingUserRoles extends Component {
  render () {
    return (
      <div>
        <SearchBar searchtype='user' />
        <UserTable />
      </div>
    )
  }
}

export default ManagingUserRoles
