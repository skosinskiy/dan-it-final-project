import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './userList.scss'
import Actions from '../../../actions/Actions'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'

const rows = [
  { id: 'placeCategory', numeric: false, disablePadding: false, label: 'Place Category' },
  { id: 'menuItems', numeric: true, disablePadding: false, label: 'Menu Items' }
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

class PlaceCategories extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    page: 0,
    rowsPerPage: 25
  };

  componentDidMount () {
    this.props.getAllCategories() // ToDo: implement getAllCategories
  }

  savePlaceCategories = () => {
    const {changedPlaceCategories, savePlaceCategories} = this.props // TODO: implement savePlaceCategories
    changedPlaceCategories.forEach(category => savePlaceCategories(category.id, category.menuItems))
    this.props.resetListChanges() // TODO: implement resetListChanges
  }

  handleChangePage = () => this.props.getAllCategories()
  
  render () {
    const {classes, placeCategoriesList} = this.props
    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                rowCount={placeCategoriesList.length}
              />
              <TableBody>
                {placeCategoriesList.map(category => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={category.id}
                    >
                      <TableCell className={classes.tableCell} component="th" scope="row" padding="none">
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </TableCell>
                      <TableCell padding="none" align="left">{category.placeCategory}</TableCell>
                      <TableCell padding="none" align="left">{category.menuItems}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
        <div className={classes.userListButtons}>
          <NavLink className={classes.buttons} to={'/admin'}>
            <Button
              onClick={this.savePlaceCategories}
              variant="contained" color="primary"
              className={classes.button}
            >
              Save
            </Button>
          </NavLink>
          <NavLink className={classes.buttons} to={'/admin'}>
            <Button
              onClick={() => this.props.resetListChanges()}
              variant="contained" color="secondary"
              className={classes.button}
            >
              Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

PlaceCategories.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = store => {
  return {
    placeCategoriesList: store.placeCategories.placeCategoriesList,
    changedPlaceCategories: store.placeCategories.changedPlaceCategories,
    menuItems: store.placeCategories.menuItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetListChanges: () => {
      dispatch({type: Actions.PlaceCategories.SET_MENU_ITEMS, payload: {updatedUserList: [], changedUsersList: []}})
    },
    saveUserRoles: (id, menuItems) => {}, // dispatch(savePlaceCategories(id, menuItems)),
    getAllCategories: () => {}// dispatch(getAllCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceCategories))