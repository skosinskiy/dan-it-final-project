import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import BusinessList from './BusinessList'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'

import './manageBusinesses.scss'

// TODO: proper class names
class ManagingBusinesses extends Component {
  render () {
    return (
      <div>
        <div className='temp-search-add-new-business'>
          <SearchBar searchtype='business_by_name' />
          <NavLink to={'/admin/businesses/add-new'} className='temporary'>
            <Button variant="contained" color="primary" className={'temp-button'}>Add new business</Button>
          </NavLink>
        </div>

        <BusinessList />
      </div>
    )
  }
}

export default ManagingBusinesses
