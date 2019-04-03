import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'

import {roleOperations} from '../../../../store/roles'
import RoleItem from './RoleItem'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },

  buttons: {
    textDecoration: 'none',
    marginRight: '10px'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '50px'
  }
})

class Roles extends Component {
  componentDidMount () {
    const {getAllRoles} = this.props
    getAllRoles()
  }

  render () {
    const {classes, roles} = this.props
    const rolesList = roles.map((role) => {
      return <RoleItem key={role.id} role={role}/>
    })
    return (
      <div className="placeList">
        <List className={classes.root}>
          {rolesList}
        </List>
        <div className={classes.buttonContainer}>
          <NavLink to={'/admin/roles/add-new'} className={classes.buttons}>
            <Button variant="contained" color="primary" className={classes.button}>Add New Role</Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

Roles.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    roles: [...state.roles.roles]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRoles: () => dispatch(roleOperations.getRoles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Roles))
