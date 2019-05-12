import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {Grant} from '../../../../../constants/permissions'

import {roleOperations} from 'store/roles'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormButtons from '../../../../../components/FormButtons'
import Preloader from "../../../../../components/Preloader";
import {Redirect} from "react-router-dom";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '90vh'
    }
  }
}

const permissions = Object.values(Grant).sort()

const emptyRole = {
  name: '',
  permissions: []
}

class RoleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      role: {...emptyRole},
      isDataSubmitted: false
    }
  }

  componentDidMount() {
    const {getAllRoles} = this.props
    getAllRoles()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.role) {
      this.setState({role: {...nextProps.role}})
    }
  }

  saveRole = (roleId, role) => {
    if (roleId) {
      this.props.updateRole(roleId, role).then(this.setState({
        isDataSubmitted: true
      }))
    } else {
      this.props.saveNewRole(role).then(this.setState({
        isDataSubmitted: true
      }))
    }
  }

  handleChange = name => event => {
    const value = event.target.value
    this.setState({
      role: {...this.state.role, [name]: value}
    })
  }

  render() {
    const {role, isDataSubmitted} = this.state
    const {isRolesLoading} = this.props

    if (isDataSubmitted) {
      return <Redirect to={'/admin/roles'}/>
    }

    if (isRolesLoading) {
      return <Preloader/>
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            value={role.name}
            onChange={this.handleChange('name')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>
              Permissions
            </InputLabel>
            <Select
              multiple
              value={role.permissions}
              onChange={this.handleChange('permissions')}
              input={
                <OutlinedInput labelWidth={85}/>
              }
              renderValue={selected => selected.sort().join(', ')}
              MenuProps={MenuProps}
            >
              {permissions.map(permission => (
                <MenuItem key={permission} value={permission}>
                  <Checkbox checked={this.state.role.permissions.indexOf(permission) > -1}/>
                  <ListItemText primary={permission}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormButtons
            saveFunction={() => this.saveRole(role.id, role)}
            cancelLink={'/admin/roles'}
          />
        </Grid>
      </Grid>
    )
  }
}

RoleForm.propTypes = {
  getAllRoles: PropTypes.func.isRequired,
  role: PropTypes.object,
  updateRole: PropTypes.func.isRequired,
  saveNewRole: PropTypes.func.isRequired,
  isRolesLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    role: state.roles.roles.find(role => role.id.toString() === props.match.params.roleId),
    isRolesLoading: state.roles.isRolesLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewRole: (role) => dispatch(roleOperations.saveNewRole(role)),
    updateRole: (roleId, role) => dispatch(roleOperations.updateRole(roleId, role)),
    getAllRoles: () => dispatch(roleOperations.getAllRoles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleForm)
