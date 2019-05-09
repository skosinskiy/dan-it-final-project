import PropTypes from 'prop-types'
import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import {roleOperations} from 'store/roles'
import {usersOperations} from 'store/users'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormButtons from '../../../../../components/FormButtons'
import TextField from '@material-ui/core/TextField'
import Preloader from "../../../../../components/Preloader";
import {Redirect} from "react-router-dom";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '90vh'
    }
  }
}

const emptyUser = {
  email: '',
  roles: []
}

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {...emptyUser},
      isDataSubmitted: false
    }
  }

  componentDidMount() {
    const {fetchUserFormData, email, page, size} = this.props
    fetchUserFormData(email, page, size)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({user: {...nextProps.user}})
    }
  }

  handleChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        roles: event.target.value
      }
    })
  }

  saveUserRoles = () => {
    const {user} = this.state
    this.props.saveUserRoles(user.id, user.roles).then(this.setState({
      isDataSubmitted: true
    }))
  }

  render() {

    const {user, isDataSubmitted} = this.state
    const {roles, isUserFormDataLoading} = this.props

    if (isDataSubmitted) {
      return <Redirect to={'/admin/users'}/>
    }

    if (isUserFormDataLoading) {
      return <Preloader/>
    }

    const rolesValue = roles.filter(role => user.roles.some(userRole => role.id === userRole.id))

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            disabled
            variant="outlined"
            value={user.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>
              Roles
            </InputLabel>
            <Select
              multiple
              value={rolesValue}
              onChange={this.handleChange}
              input={
                <OutlinedInput labelWidth={45}/>
              }
              renderValue={selected => selected.map(item => item.name).join(', ')}
              MenuProps={MenuProps}
            >
              {roles.map(role => (
                <MenuItem key={role.id} value={role}>
                  <Checkbox checked={user.roles.find(item => item.id === role.id) }/>
                  <ListItemText primary={role.name}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormButtons
            cancelLink={'/admin/users'}
            saveFunction={this.saveUserRoles}
          />
        </Grid>
      </Grid>
    )
  }

}

UserForm.propTypes = {
  user: PropTypes.object,
  getAllRoles: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  fetchUserFormData: PropTypes.func.isRequired,
  saveUserRoles: PropTypes.func.isRequired,
  isUserFormDataLoading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  page: PropTypes.number,
  size: PropTypes.number
}

const mapStateToProps = (state, props) => {
  return {
    user: state.users.usersListByEmail.find(user => user.id.toString() === props.match.params.userId),
    roles: state.roles.roles,
    page: state.users.page,
    size: state.users.size,
    email: state.users.email,
    isUserFormDataLoading: state.users.isUserFormDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFormData: (email, page, size) => dispatch(usersOperations.fetchUserFormData(email, page, size)),
    getAllRoles: () => dispatch(roleOperations.getAllRoles()),
    saveUserRoles: (userId, roles) => dispatch(usersOperations.saveUserRoles(userId, roles))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
