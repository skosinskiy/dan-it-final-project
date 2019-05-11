import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import RolesTable from './RolesTable'

const styles = theme => ({
  button: {
    textDecoration: 'none',
  },

  searchbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

class Roles extends Component {

  render () {
    const {classes} = this.props
    return (
      <div>
        <div className={classes.searchbar}>
          <NavLink to={'/admin/roles/add-new'} className={classes.button}>
            <Button size="large" variant="outlined" color="primary">Add new role</Button>
          </NavLink>
        </div>
        <RolesTable/>
      </div>
    )
  }
}

Roles.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Roles)
