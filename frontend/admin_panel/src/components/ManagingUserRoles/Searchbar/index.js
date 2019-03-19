import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { GET_USERS_BY_EMAIL } from '../../../actions/users'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
}

class UserEmailSearchBar extends React.Component {
  state = {
    email: ''
  }

  handleChange = event => {
    this.setState({email: event.target.value})
  }

  findUsersByEmail = (e) => {
    if (e.key === 'Enter') {
      axios.get(`/api/users?email=${this.state.email}`)
        .then(res => {
          this.props.getUsersByEmail(res.data)
        })
    }
  }

  render () {
    console.log()
    const { classes } = this.props
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase onKeyPress={this.findUsersByEmail} value={this.state.email}
          onChange={this.handleChange} className={classes.input} placeholder="Search User By email"/>
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon/>
        </IconButton>
      </Paper>
    )
  }
}

UserEmailSearchBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    usersListByEmail: state.users.usersListByEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersByEmail: (users) => {
      dispatch({type: GET_USERS_BY_EMAIL, payload: {users: users}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserEmailSearchBar))