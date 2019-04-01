import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import UsersList from './UsersList'

class ManagingUsersRoles extends Component {
  render () {
    return (
      <div>
        <SearchBar placeholder='Search User By email'/>
        <UsersList/>
      </div>
    )
  }
}

export default ManagingUsersRoles
