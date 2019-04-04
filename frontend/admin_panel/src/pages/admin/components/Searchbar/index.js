import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import {usersOperations} from 'store/users'
import {businessOperations} from '../../../../store/businesses'

/*
* Search Types that should be passed as props:
*  - 'user_by_email'
*  - 'business_by_name'
*
* */

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

  findCompanyByName = (e) => {
    if (e.key === 'Enter'){
      this.props.getBusinessesByTile(this.state.input)
    }
  }

  setPlaceholder = (searchType) => {
    switch (searchType) {
      case 'user_by_email':
        return {placeholder: 'Search user by email', func: this.findUsersByEmail}
      case 'business_by_name':
        return {placeholder: 'Search by company name', func: this.findCompanyByName}
      default:
        return 'Search'
    }
  }

  render () {
    const {classes} = this.props
    const {placeholder, func} = this.setPlaceholder(this.props.searchtype)

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          onKeyPress={func}
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
  searchtype: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    usersListByEmail: state.users.usersListByEmail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersByEmail: (email, page, size) => dispatch(usersOperations.getUsersByEmail(email, page, size)),
    getBusinessesByTile: (title) => dispatch(businessOperations.getBusinessesByTitle(title)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBar))
