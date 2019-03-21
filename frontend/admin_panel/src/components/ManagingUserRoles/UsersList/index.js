import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import UserItem from './UserItem/index'
import './userList.scss'
import UserActions from '../../../actions/UserActions'
import { saveUserRoles } from '../../../actions/users'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
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
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  }
})

class UsersList extends React.Component {

  saveUsersRoles = () => {
    const {usersListByEmail, changedUsersList, saveUserRoles} = this.props
    usersListByEmail.forEach((user) => {
      if (changedUsersList.has(user.id)) {
        let roles = user.roles
        saveUserRoles(user.id, roles)
      }
    })
    this.props.updateUsersList()
  }

  render () {
    const { classes, usersListByEmail } = this.props
    const usersByEmail = usersListByEmail.map((item) => {
      return <UserItem user={item} key={item.id}/>
    })

    return (
      <>
        <div className={classes.root}>
          <ul className="user-list">
            {usersByEmail}
          </ul>
        </div>
        <div className="user-list-buttons">
          <NavLink to={'/admin'}><Button onClick={this.saveUsersRoles} variant="contained" color="primary" className={classes.button}>
            Save
          </Button>
          </NavLink>
          <NavLink to={'/admin'}>
            <Button onClick={() => this.props.updateUsersList()} variant="contained" color="secondary" className={classes.button}>
            Exit
            </Button>
          </NavLink>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersListByEmail: state.users.usersListByEmail,
    changedUsersList: state.users.changedUsersList,
    userRoles: state.users.userRoles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsersList: () => {
      let updatedUserList = []
      let changedUsersList = new Set()
      dispatch({type: UserActions.SET_USER_ROLES, payload: {updatedUserList, changedUsersList}})
    },

    saveUserRoles: (userId, roles) => dispatch(saveUserRoles(userId, roles))
  }
}

UsersList.propTypes = {
  classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(UsersList))