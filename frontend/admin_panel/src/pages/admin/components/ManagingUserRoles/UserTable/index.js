import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import {usersOperations} from 'store/users'

import TableHead from '@material-ui/core/TableHead'
import TableFooter from '@material-ui/core/TableFooter'
import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Preloader from '../../../../../components/Preloader'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },

  table: {
    tableLayout: 'fixed'
  },

  button: {
    textDecoration: 'none'
  }
})

class UserTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
  }

  componentDidMount() {
    const {page, rowsPerPage} = this.state
    this.props.getAllUsers('', page, rowsPerPage)
  }

  handleChangePage = (event, page) => {
    this.setState({page})
    this.props.getAllUsers('', page, this.state.rowsPerPage)
  }

  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: event.target.value});
    this.props.getAllUsers('', 0, event.target.value)
  }

  render() {
    const {classes, usersListByEmail, totalElements, isUsersLoading} = this.props
    const {rowsPerPage, page} = this.state

    if (isUsersLoading) {
      return (
        <div style={{height: 'calc(100vh - 200px)'}}>
          <Preloader/>
        </div>
      )
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <colgroup>
            <col style={{width: '25%'}}/>
            <col style={{width: '25%'}}/>
            <col style={{width: '15%'}}/>
            <col style={{width: '25%'}}/>
            <col style={{width: '10%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersListByEmail.map(user => {
              return (
                <TableRow hover key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.roles.map(role => role.name).join(', ')}</TableCell>
                  <TableCell>
                    <NavLink to={`/admin/users/edit/${user.id}`} className={classes.button}>
                      <Button variant="outlined" color="primary">Edit</Button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalElements}
                page={page}
                onChangePage={this.handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 15]}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                SelectProps={{
                  native: true,
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    )
  }
}

UserTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  usersListByEmail: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired,
  isUsersLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    usersListByEmail: state.users.usersListByEmail,
    totalElements: state.users.totalElements,
    isUsersLoading: state.users.isUsersLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (email, page, size) => dispatch(usersOperations.getUsersByEmail(email, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserTable))
