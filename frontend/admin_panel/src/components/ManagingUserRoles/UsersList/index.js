import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import UserItem from './UserItem/index'
import './userList.scss'

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

const names = [
  'Role 1',
  'Role 2',
  'Role 3',
  'Role 4',
  'Role 5',
  'Role 6',
  'Role 7'
]

class UsersList extends React.Component {
  componentDidMount () {

  }

  saveUsersRoles = () => {
    console.log(this.props.usersListByEmail)
  }

  render () {
    const { classes } = this.props
    const usersListByEmail = this.props.usersListByEmail.map((item) => {
      return <UserItem user={item} roles={names} key={item.id}/>
    })

    return (
      <>
        <div className={classes.root}>
          <ul className="user-list">
            {usersListByEmail}
          </ul>
        </div>
        <div className="user-list-buttons">
          <Button onClick={this.saveUsersRoles} variant="contained" color="primary" className={classes.button}>
            Save
          </Button>
          <NavLink to={'/admin'}>
            <Button variant="contained" color="secondary" className={classes.button}>
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
    usersListByEmail: state.users.usersListByEmail
  }
}

const mapDispatchToProps = (dispatch) => {

}

UsersList.propTypes = {
  classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(UsersList))