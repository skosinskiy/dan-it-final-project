import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import Actions from '../../../../actions/Actions'
import './userItem.scss'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
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

function getStyles (name, that) {
  return {
    fontWeight:
      that.props.user.roles.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  }
}

class UserItem extends React.Component {
  handleChange = event => {
    const {user, usersListByEmail, changedUsersList, updateUsersList} = this.props
    updateUsersList(user, event.target.value, usersListByEmail, changedUsersList)
  }

  render () {
    const { classes, user, userRoles } = this.props
    const roles = userRoles.filter(role => user.roles.some(userRole => role.id === userRole.id))

    return (
      <li className="user-item">
        <h4>{user.email}</h4>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Select Roles</InputLabel>
          <Select
            multiple
            value={roles}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value.id} label={value.name} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {userRoles.map(role => (
              <MenuItem key={role.id} value={role} style={getStyles(role, this)}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </li>
    )
  }
}

UserItem.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    usersListByEmail: state.users.usersListByEmail,
    userRoles: state.users.userRoles,
    changedUsersList: state.users.changedUsersList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsersList: (user, selectedRoles, userList, chengedUsers) => {
      user.roles = [...selectedRoles]
      let updatedUserList = userList.map((item) => {
        if (item.id === user.id) {
          return user
        }
        return item
      })

      let changedUsersList = chengedUsers
      changedUsersList.add(user.id)
      dispatch({type: Actions.Users.SET_USER_ROLES, payload: {updatedUserList, changedUsersList}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(UserItem))