import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import {eventCategoryOperations} from 'store/eventCategory'
import EventCategoryItem from './EventCategoryItem'

import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Preloader from '../../../../components/Preloader'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },

  buttons: {
    textDecoration: 'none',
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center'
  },

  button: {
    marginTop: '30px'
  }
})

class EventCategories extends Component {
  componentDidMount () {
    const {getAllEventCategories} = this.props
    getAllEventCategories()
  }

  render () {
    const {classes, eventCategories} = this.props

    if (eventCategories.length === 0) {
      return <Preloader/>
    }

    const eventCategoryItems = eventCategories.map((category) => {
      return <EventCategoryItem key={category.id} category={category}/>
    })
    return (
      <div>
        <List className={classes.root}>
          {eventCategoryItems}
        </List>
        <NavLink to={'/admin/event-categories/add-new'} className={classes.buttons}>
          <Button variant="contained" color="primary" className={classes.button}>Add New Event Category</Button>
        </NavLink>
      </div>
    )
  }
}

EventCategories.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = ({eventCategory}) => {
  return {
    eventCategories: eventCategory.allEventCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEventCategories: () => dispatch(eventCategoryOperations.getAllEventCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventCategories))
