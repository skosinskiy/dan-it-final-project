import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import EventsTable from './EventTable'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

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

class ManagingEvents extends Component {

  render () {

    const {classes} = this.props

    return (
      <div>
        <div className={classes.searchbar}>
          <SearchBar searchtype='event' />
          <NavLink to={'/admin/events/add-new'} className={classes.button}>
            <Button size="large" variant="outlined" color="primary">Add new event</Button>
          </NavLink>
        </div>

        <EventsTable />
      </div>
    )
  }
}

ManagingEvents.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ManagingEvents)
