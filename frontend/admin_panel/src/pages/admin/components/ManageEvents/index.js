import React, {Component} from 'react'
import SearchBar from '../../../../components/Searchbar'
import EventsTable from './EventTable'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {eventOperations} from '../../../../store/events'

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

    const {classes, getAllEvents, size, searchParam} = this.props

    return (
      <div>
        <div className={classes.searchbar}>
          <SearchBar
            searchFunc={getAllEvents}
            size={size}
            value={searchParam}
            placeholder={'Search events'}
          />
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
  classes: PropTypes.object.isRequired,
  getAllEvents: PropTypes.func.isRequired,
  searchParam: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    size: state.events.size,
    searchParam: state.events.searchParam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEvents: (param, page, size) => dispatch(eventOperations.getAllEventsByParams(param, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManagingEvents))
