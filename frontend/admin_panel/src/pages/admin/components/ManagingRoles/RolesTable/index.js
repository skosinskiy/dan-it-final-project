import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'

import {roleOperations} from 'store/roles'
import {Table} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableCellButtons from '../../../../../components/TableCellButtons'
import Preloader from "../../../../../components/Preloader";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },

  table: {
    tableLayout: 'fixed'
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

class RolesTable extends Component {

  componentDidMount() {
    const {getAllRoles} = this.props
    getAllRoles()
  }

  render() {

    const {classes, roles, deleteRole, isRolesLoading} = this.props

    if (isRolesLoading) {
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
            <col style={{width: '33%'}}/>
            <col style={{width: '33%'}}/>
            <col style={{width: '33%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell className={classes.firstCell}>Name</TableCell>
              <TableCell className={classes.cell}>Permissions</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map(role => (
              <TableRow key={role.id} hover>
                <TableCell className={classes.firstCell}>{role.name}</TableCell>
                <TableCell className={classes.cell}>{role.permissions.sort().join(', ')}</TableCell>
                <TableCellButtons
                  editLink={`/admin/roles/edit/${role.id}`}
                  deleteFunction={() => deleteRole(role.id)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

RolesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  deleteRole: PropTypes.func.isRequired,
  getAllRoles: PropTypes.func.isRequired,
  isRolesLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    roles: state.roles.roles,
    isRolesLoading: state.roles.isRolesLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRole: (roleId) => dispatch(roleOperations.deleteRole(roleId)),
    getAllRoles: () => dispatch(roleOperations.getAllRoles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RolesTable))
