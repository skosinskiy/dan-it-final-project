import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {eventCategoryOperations} from 'store/eventCategory'
import EventCategoryTable from './EventCategoryTable'

import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Preloader from '../../../../components/Preloader'

const styles = theme => ({
  newItemButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    textDecoration: 'none',
    marginBottom: theme.spacing.unit * 3
  }
})

class EventCategories extends Component {
  componentDidMount () {
    const {getAllEventCategories} = this.props
    getAllEventCategories()
  }

  render () {
    const {classes, isEventCategoriesLoading} = this.props

    if (isEventCategoriesLoading) {
      return <Preloader/>
    }

    return (
      <div>
        <div >
          <NavLink className={classes.newItemButton} to={'/admin/event-categories/add-new'}>
            <Button variant="outlined" size="large" color="primary">Add New Event Category</Button>
          </NavLink>
        </div>
        <EventCategoryTable/>
      </div>
    )
  }
}

EventCategories.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllEventCategories: PropTypes.func.isRequired,
  isEventCategoriesLoading: PropTypes.bool.isRequired
}

const mapStateToProps = ({eventCategory}) => {
  return {
    isEventCategoriesLoading: eventCategory.isEventCategoriesLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEventCategories: () => dispatch(eventCategoryOperations.getAllEventCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventCategories))
