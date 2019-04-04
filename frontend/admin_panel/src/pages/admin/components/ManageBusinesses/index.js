import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import BusinessList from './BusinessList'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import './manageBusinesses.scss'

const styles = theme => ({
  buttons: {
    textDecoration: 'none',
    margin: '10px',
    'min-width': '227px',
    height: '100%'
  }
})

// TODO: proper class names
class ManagingBusinesses extends Component {
  render () {
    return (
      <div>
        <div className='temp-search-add-new-business'>
          <SearchBar searchtype='business_by_name' />
          <NavLink to={'/admin/businesses/add-new'} className='temporary'>
            <Button size="large" variant="contained" color="primary" className={this.props.classes.button}>Add new business</Button>
          </NavLink>
        </div>

        <BusinessList />
      </div>
    )
  }
}

export default withStyles(styles)(ManagingBusinesses)
