import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import EventsList from './EventsTable'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import {eventOperations} from "../../../../store/events";
import {connect} from "react-redux";
import Preloader from "../../../../components/Preloader";
import PropTypes from "prop-types";
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

  componentDidMount () {
    this.props.getAllEvents()
  }

  render () {

    const {isLoading, classes} = this.props
    if (isLoading) {
      return <Preloader/>
    }

    return (
      <div>
        <div className={classes.searchbar}>
          <SearchBar searchtype='event_by_title' />
          <NavLink to={'/admin/events/add-new'} className={classes.button}>
            <Button size="large" variant="outlined" color="primary">Add new event</Button>
          </NavLink>
        </div>

        <EventsList />
      </div>
    )
  }
}

ManagingEvents.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllEvents: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.events.isEventDataLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEvents: () => dispatch(eventOperations.getAllEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManagingEvents))
