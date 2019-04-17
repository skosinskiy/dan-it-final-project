import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import BusinessList from './BusinessList'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'


import './manageBusinesses.scss'

const styles = theme => ({
  buttons: {
    textDecoration: 'none',
    margin: '10px',
    'min-width': '227px',
    height: '100%'
  }
})

class ManagingBusinesses extends Component {
  render () {
    const {classes} = this.props
    return (
      <div>
        <div className='searchbar-flexbox'>
          <SearchBar searchtype='business_by_name' />
          <NavLink to={'/admin/businesses/add-new'} className={classes.buttonLink}>
            <Button size="large" variant="contained" color="primary" className={classes.button}>Add new business</Button>
          </NavLink>
        </div>

        <BusinessList />
      </div>
    )
  }
}

ManagingBusinesses.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ManagingBusinesses)
