import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles/index'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import {deleteBuilding} from '../../../../actions/building/buildings'

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

class Buildings extends Component {
  render () {
    const {classes, building, deleteBuilding} = this.props
    return (
      <ListItem>
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText primary={building.title} secondary={building.address} />
        <NavLink to={`/admin/buildings/${building.id}`} className={classes.buttons}>
          <Button variant="contained" color="primary" className={classes.button}>Edit</Button>
        </NavLink>
        <Button onClick={() => deleteBuilding(building.id)} variant="contained" color="secondary" className={classes.button}>Delete</Button>
      </ListItem>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    buildingList: state.pbuildings.buildings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBuilding: (buildingId) => dispatch(deleteBuilding(buildingId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Buildings))