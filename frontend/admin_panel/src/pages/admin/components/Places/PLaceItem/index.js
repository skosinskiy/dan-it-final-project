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

import {placesOperations} from 'store/places'

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

class Places extends Component {
  render () {
    const {classes, place, deletePlace} = this.props
    return (
      <ListItem>
        <Avatar>
          <ImageIcon/>
        </Avatar>
        <ListItemText primary={place.title} secondary={place.address}/>
        <NavLink to={`/admin/places/${place.id}`} className={classes.buttons}>
          <Button variant="contained" color="primary" className={classes.button}>Edit</Button>
        </NavLink>
        <Button
          onClick={() => deletePlace(place.id)}
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

Places.propTypes = {
  classes: PropTypes.object.isRequired,
  deletePlace: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    placeList: state.places.places
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePlace: (placeId) => dispatch(placesOperations.deletePlace(placeId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Places))
