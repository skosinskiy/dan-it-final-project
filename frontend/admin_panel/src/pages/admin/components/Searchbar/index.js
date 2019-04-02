import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import {usersOperations} from 'store/users'

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

class SearchBar extends React.Component {
  state = {
    input: ''
  }

  handleChange = event => {
    this.setState({input: event.target.value})
  }

  findUsersByEmail = (e) => {
    if (e.key === 'Enter') {
      this.props.getUsersByEmail(this.state.input, 0, 25)
    }
  }

  setPlaceholder = (searchType) => {
    switch (searchType) {
      case 'user_by_email':
        return 'Search user by email'
      case 'business_by_name':
        return 'Search by company name'
      default:
        return 'Search'
    }
  }

  //TODO: add find company by name function; Add it conditionally 'onKeyPress'

  render () {
    const {classes} = this.props
    const placeholder = this.setPlaceholder(this.props.searchtype)

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          onKeyPress={this.findUsersByEmail}
          value={this.state.input}
          onChange={this.handleChange}
          className={classes.input}
          placeholder={placeholder}
        />
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon/>
        </IconButton>
      </Paper>
    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    usersListByEmail: state.users.usersListByEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersByEmail: (email, page, size) => dispatch(usersOperations.getUsersByEmail(email, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBar))
