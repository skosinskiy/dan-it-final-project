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
import { SET_USER_ROLES } from '../../../../actions/users'
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
    this.props.updateUsersList(this.props.user.id, event.target.value, this.props.usersListByEmail)
  }

  render () {
    const { classes } = this.props
    const user = this.props.user

    return (
      <li className="user-item">
        <h3>{user.name}</h3>
        <h4>{user.email}</h4>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Select Roles</InputLabel>
          <Select
            multiple
            value={user.roles}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.props.roles.map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, this)}>
                {name}
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
    usersListByEmail: state.users.usersListByEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsersList: (id, roles, userList) => {
      let updatedUserList = userList.map((item) => {
        if (item.id == id) {
          item.roles = roles
          return item
        }
        return item
      })
      dispatch({type: SET_USER_ROLES, payload: {updatedUserList}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(UserItem))