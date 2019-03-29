import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ImageIcon from '@material-ui/icons/Image'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'

import { usersOperations, usersActions } from 'store/users'

import UserItem from './UserItem/index'

import './userList.scss'

const rows = [
  { id: 'photo', numeric: false, disablePadding: false, label: 'Photo' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
  { id: 'roles', numeric: true, disablePadding: false, label: 'Roles' }
]

class EnhancedTableHead extends React.Component {
  render () {
    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.id === 'roles' ? 'right' : 'left'}
                padding='none'
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    tableLayout: 'fixed'
  },
  tableWrapper: {
    padding: '0 20px',
    overflowX: 'auto'
  },
  roles: {
    maxWidth: '100px'
  },
  buttons: {
    textDecoration: 'none',
    margin: '10px'
  },
  userListButtons: {
    marginTop: '20px',
    textAlign: 'center'
  },
  tableCell: {

  }
})

class UsersList extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    page: 0,
    rowsPerPage: 25
  };

  componentDidMount () {
    const {page, rowsPerPage} = this.state
    this.props.getAllUsers('', page, rowsPerPage)
  }

  saveUsersRoles = () => {
    const {changedUsersList, saveUserRoles} = this.props
    changedUsersList.forEach((user) => {
      let roles = user.roles
      saveUserRoles(user.id, roles)
    })
    this.props.updateUsersList()
  }

  handleChangePage = (event, page) => {
    this.props.updatePaginationPage(page)
    this.props.getAllUsers(this.props.email, page, this.state.rowsPerPage)
  };

  render () {
    const { classes, usersListByEmail, totalElements, page } = this.props
    const { rowsPerPage } = this.state
    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                rowCount={usersListByEmail.length}
              />
              <TableBody>
                {usersListByEmail.map(user => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user.id}
                    >
                      <TableCell className={classes.tableCell} component="th" scope="row" padding="none">
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </TableCell>
                      <TableCell padding="none" align="left" className='text-overflow-ellipsis' title={user.email}>{user.email}</TableCell>
                      <TableCell padding="none" align="left">{user.firstName}</TableCell>
                      <TableCell padding="none" align="left">{user.age}</TableCell>
                      <TableCell padding="none" align="right" className={classes.roles}><UserItem user={user} key={user.id}/></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[25]}
            labelRowsPerPage=''
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}

          />
        </Paper>
        <div className={classes.userListButtons}>
          <NavLink className={classes.buttons} to={'/admin'}><Button onClick={this.saveUsersRoles} variant="contained" color="primary" className={classes.button}>
            Save
          </Button>
          </NavLink>
          <NavLink className={classes.buttons} to={'/admin'}>
            <Button onClick={() => this.props.updateUsersList()} variant="contained" color="secondary" className={classes.button}>
              Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

UsersList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    usersListByEmail: state.users.usersListByEmail,
    changedUsersList: state.users.changedUsersList,
    userRoles: state.users.userRoles,
    page: state.users.page,
    totalElements: state.users.totalElements,
    email: state.users.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsersList: () => {
      dispatch(usersActions.setUserRoles({
        updatedUserList: [],
        changedUsersList: []
      }))
    },

    saveUserRoles: (userId, roles) => dispatch(usersOperations.saveUserRoles(userId, roles)),
    getAllUsers: (email, page, size) => dispatch(usersOperations.getUsersByEmail(email, page, size)),
    updatePaginationPage: (page) => dispatch(usersActions.changePaginationPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersList))
