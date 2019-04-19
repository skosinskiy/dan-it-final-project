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


import {roleOperations} from 'store/roles'

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

class RoleItem extends Component {
  render () {
    const {classes, role, deleteRole} = this.props
    return (
      <ListItem>
        <Avatar>
          <ImageIcon/>
        </Avatar>
        <ListItemText primary={role.name}/>
        <NavLink to={`/admin/roles/${role.id}`} className={classes.buttons}>
          <Button variant="contained" color="primary" className={classes.button}>Edit</Button>
        </NavLink>
        <Button
          onClick={() => deleteRole(role.id)}
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

RoleItem.propTypes = {
  classes: PropTypes.object.isRequired,
  propTypes: PropTypes.array.isRequired,
  role: PropTypes.object.isRequired,
  deleteRole: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRole: (roleId) => dispatch(roleOperations.deleteRole(roleId)),
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(RoleItem))
