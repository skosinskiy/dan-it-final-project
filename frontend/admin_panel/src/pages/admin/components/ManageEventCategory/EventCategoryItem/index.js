import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles/index'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import PropTypes from 'prop-types'

import {eventCategoryOperations} from 'store/eventCategory'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },

  buttons: {
    textDecoration: 'none',
    marginRight: '10px'
  }
})

class Events extends Component {
  render () {
    const {classes, category, deleteEventCategory} = this.props

    return (
      <ListItem>
        <Avatar>
          <ImageIcon/>
        </Avatar>
        <ListItemText primary={category.name} secondary={category.parentCategory && category.parentCategory.name}/>
        <NavLink to={`/admin/event-categories/${category.id}`} className={classes.buttons}>
          <Button variant="contained" color="primary" className={classes.button}>Edit</Button>
        </NavLink>
        <Button
          onClick={() => deleteEventCategory(category.id)}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Delete
        </Button>
      </ListItem>
    )
  }
}

Events.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  deleteEventCategory: PropTypes.func.isRequired,
}

const mapStateToProps = ({eventCategory}) => {
  return {
    eventCategories: eventCategory.allEventCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEventCategory: (categoryId) => dispatch(eventCategoryOperations.deleteEventCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Events))
