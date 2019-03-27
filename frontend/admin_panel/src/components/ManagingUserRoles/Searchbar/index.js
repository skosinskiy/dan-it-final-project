import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import {getUsersByEmail} from '../../../actions/users/index'

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
      this.props.getUsersByEmail(this.state.email, 0, 25)
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
    getUsersByEmail: (email, page, size) => dispatch(getUsersByEmail(email, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserEmailSearchBar))