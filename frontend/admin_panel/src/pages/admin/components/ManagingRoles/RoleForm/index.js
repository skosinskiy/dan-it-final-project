/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import {Grant} from '../../../../../constants/permissions'

import { roleOperations } from 'store/roles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },

  buttonLink: {
    textDecoration: 'none'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 330,
    maxWidth: 500
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  roleButtons: {
    textAlign: 'center',
    marginTop: '50px'
}
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const permissions = Object.values(Grant)

const emptyRole = {
  name: '',
  permissions: []
}

class RoleForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      role: {...emptyRole}
    }
  }

  componentDidMount () {
    const {getAllRoles} = this.props
      getAllRoles()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.role) {
      this.setState({role: {...nextProps.role}})
    }
  }

  saveRole = (roleId, role) => {
    if (roleId) {
      this.props.updateRole(roleId, role)
    } else {
      this.props.saveNewRole(role)
    }
  }

  handleChange = name => event => {
      const value = event.target.value
      this.setState({
        role: {...this.state.role, [name]: value}
      })
    }

  render () {
    const {classes, roleId} = this.props
    const {role} = this.state

    return (
      <div className="edit-place-form">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="Title"
            style={{margin: 8}}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            value={role.name}
            onChange={this.handleChange('name')}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">Select Roles</InputLabel>
            <Select
              multiple
              value={role.permissions}
              onChange={this.handleChange('permissions')}
              input={<Input id="select-multiple-chip"/>}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip}/>
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {permissions.map(permission => (
                <MenuItem key={permission} value={permission}>
                  {permission}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
        <div className={classes.roleButtons}>
          <NavLink to={'/admin/roles'} className={classes.buttonLink}>
            <Button onClick={() => this.saveRole(roleId, role)} variant="contained" color="primary"
                    className={classes.button}>
              Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/roles'} className={classes.buttonLink}>
            <Button variant="contained" color="secondary" className={classes.button}>
              Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

RoleForm.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllRoles: PropTypes.func.isRequired,
  role: PropTypes.object.isRequired,
  updateRole: PropTypes.func.isRequired,
  saveNewRole: PropTypes.func.isRequired,
  roleId: PropTypes.number.isRequired,
}

const mapStateToProps = (state, props) => {
  return {
    role: state.roles.roles.find(role => role.id === +props.match.params.roleId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewRole: (role) => dispatch(roleOperations.saveNewRole(role)),
    updateRole: (roleId, role) => dispatch(roleOperations.updateRole(roleId, role)),
    getAllRoles: () => dispatch(roleOperations.getRoles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RoleForm))
