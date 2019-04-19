import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import EventsList from './EventsList'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {eventOperations} from "../../../../store/events";
import {connect} from "react-redux";
import Preloader from "../../../../components/Preloader";
import PropTypes from "prop-types";
//
// import './manageEvents.scss'

const styles = theme => ({
  buttons: {
    textDecoration: 'none',
    margin: '10px',
    'min-width': '227px',
    height: '100%'
  }
})

class ManagingEvents extends Component {

  componentDidMount () {
    this.props.getAllEvents()
  }

  render () {

    const {classes, isLoading} = this.props
    if (isLoading) {
      return <Preloader/>
    }

    return (
      <div>
        <div className='searchbar-flexbox'>
          <SearchBar searchtype='event_by_title' />
          <NavLink to={'/admin/events/add-new'} className={classes.buttonLink}>
            <Button size="large" variant="contained" color="primary" className={classes.button}>Add new event</Button>
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
