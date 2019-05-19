import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchBar from '../Searchbar'
import PlaceTable from './PlaceTable'

import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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

class Places extends Component {

  render () {
    const {classes} = this.props

    return (
      <div className="placeList">
        <div className={classes.searchbar}>
          <SearchBar searchtype='place'/>
          <NavLink to={'/admin/places/add-new'} className={classes.button}>
            <Button size="large" variant="outlined" color="primary">Add new place</Button>
          </NavLink>
        </div>
        <PlaceTable/>
      </div>
    )
  }
}

Places.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Places)
