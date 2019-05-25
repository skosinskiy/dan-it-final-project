import React, {Component} from 'react'
import SearchBar from '../../../../components/Searchbar'
import UserTable from './UserTable'
import PropTypes from 'prop-types'
import {usersOperations} from '../../../../store/users'
import {connect} from 'react-redux'

class ManagingUserRoles extends Component {
  render () {

    const {getUsersByEmail, size, searchParam} = this.props

    return (
      <div>
        <SearchBar
          searchFunc={getUsersByEmail}
          size={size}
          value={searchParam}
          placeholder={'Search user by email'}
        />
        <UserTable />
      </div>
    )
  }
}

ManagingUserRoles.propTypes = {
  getUsersByEmail: PropTypes.func.isRequired,
  searchParam: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    size: state.users.size,
    searchParam: state.users.searchParam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersByEmail: (email, page, size) => dispatch(usersOperations.getUsersByEmail(email, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagingUserRoles)
