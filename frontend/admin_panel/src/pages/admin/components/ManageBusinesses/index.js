import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import BusinessTable from './BusinessTable'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  button: {
    textDecoration: 'none',
  },

  searchbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

class ManagingBusinesses extends Component {

  render() {

    const {classes} = this.props

    return (
      <div>
        <div className={classes.searchbar}>
          <SearchBar searchtype='business_by_name'/>
          <NavLink to={'/admin/businesses/add-new'} className={classes.button}>
            <Button size="large" variant="outlined" color="primary">Add new business</Button>
          </NavLink>
        </div>
        <BusinessTable/>
      </div>
    )
  }
}

ManagingBusinesses.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ManagingBusinesses)
