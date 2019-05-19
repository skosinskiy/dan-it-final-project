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
  },

  firstCell: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingDown: theme.spacing.unit,
    overflowWrap: 'break-word'
  },

  cell: {
    padding: theme.spacing.unit,
    overflowWrap: 'break-word'
  }
})

class UserTable extends React.Component {

  componentDidMount() {
    const {getAllUsers, searchParam, page, size} = this.props
    getAllUsers(searchParam, page, size)
  }

  handleChangePage = (event, page) => {
    const {getAllUsers, searchParam, size} = this.props
    getAllUsers(searchParam, page, size)
  }

  handleChangeRowsPerPage = event => {
    const {getAllUsers, searchParam} = this.props
    getAllUsers(searchParam, 0, event.target.value)
  }

  render() {
    const {classes, usersListByEmail, totalElements, isUsersLoading, page, size} = this.props

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
              <TableCell className={classes.firstCell}>Email</TableCell>
              <TableCell className={classes.cell}>Name</TableCell>
              <TableCell className={classes.cell}>Age</TableCell>
              <TableCell className={classes.cell}>Roles</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersListByEmail.map(user => {
              return (
                <TableRow hover key={user.id}>
                  <TableCell className={classes.firstCell}>{user.email}</TableCell>
                  <TableCell className={classes.cell}>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell className={classes.cell}>{user.age}</TableCell>
                  <TableCell className={classes.cell}>{user.roles.map(role => role.name).join(', ')}</TableCell>
                  <TableCell className={classes.cell}>
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
                rowsPerPage={size}
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
  isUsersLoading: PropTypes.bool.isRequired,
  searchParam: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    usersListByEmail: state.users.usersListByEmail,
    totalElements: state.users.totalElements,
    isUsersLoading: state.users.isUsersLoading,
    page: state.users.page,
    size: state.users.size,
    searchParam: state.users.searchParam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (email, page, size) => dispatch(usersOperations.getUsersByEmail(email, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserTable))
