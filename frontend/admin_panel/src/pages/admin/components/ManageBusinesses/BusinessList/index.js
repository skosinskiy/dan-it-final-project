import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
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

import {businessOperations, businessActions} from '../../../../../store/businesses'

import BusinessItem from './BusinessItem/index'

import './businessList.scss'

const rows = [
  {id: 'photo', numeric: false, disablePadding: false, label: 'Photo'},
  {id: 'title', numeric: true, disablePadding: false, label: 'Title'},
  {id: 'description', numeric: true, disablePadding: false, label: 'Description'},
  {id: 'address', numeric: true, disablePadding: false, label: 'Address'},
  {id: 'website', numeric: true, disablePadding: false, label: 'Website'},
  {id: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone Number'},
  {id: 'paceId', numeric: true, disablePadding: false, label: 'Place Id'},
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
  tableCell: {}
})

const tempBusinessArr = [
  {id: 1,  title:'SpaceX', description: 'Rockets and stuff', address:'address1', website: 'site1.com.ua', phoneNumber: '023-23-31', placeId: 1},
  {id: 2,  title:'Umbrella', description: 'Viruses', address:'address2', website: 'site2.com.ua', phoneNumber: '023-23-32', placeId: 2}
]

class BusinessList extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    page: 0,
    rowsPerPage: 25
  }

  componentDidMount () {
    const {page, rowsPerPage} = this.state
    this.props.getBusinessesByPlaceID( 1)
  }

/*  saveUsersRoles = () => {
    const {changedUsersList, saveUserRoles} = this.props
    changedUsersList.forEach((user) => {
      let roles = user.roles
      saveUserRoles(user.id, roles)
    })
    this.props.updateUsersList()
  }*/

  handleChangePage = (event, page) => {
    this.props.updatePaginationPage(page)
    this.props.getBusinessesByPlaceID(1)
  }

  render () {
    const {classes, businessListByTitle, totalElements, page} = this.props
    const {rowsPerPage} = this.state
    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                // businessListByTitle.length
                rowCount={10}
              />
              <TableBody>
                {/* businessListByTitle*/}
                {tempBusinessArr.map(business => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={business.id}
                    >

                      <TableCell className={classes.tableCell} component="th" scope="row" padding="none">
                        <Avatar>
                          <ImageIcon/>
                        </Avatar>
                      </TableCell>
                      <TableCell
                        padding="none"
                        align="left"
                        className='text-overflow-ellipsis'
                        title={business.email}
                      >
                        {business.title}
                      </TableCell>
                      <TableCell padding="none" align="left">{business.description}</TableCell>
                      <TableCell padding="none" align="left">{business.address}</TableCell>
                      <TableCell padding="none" align="left">{business.website}</TableCell>
                      <TableCell padding="none" align="left">{business.phoneNumber}</TableCell>
                      <TableCell padding="none" align="left">{business.placeId}</TableCell>

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
          <NavLink className={classes.buttons} to={'/admin'}><Button onClick={this.saveUsersRoles} variant="contained"
                                                                     color="primary" className={classes.button}>
            Save
          </Button>
          </NavLink>
          <NavLink className={classes.buttons} to={'/admin'}>
            <Button onClick={() => this.props.updateUsersList()} variant="contained" color="secondary"
                    className={classes.button}>
              Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

BusinessList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    businessListByTitle: state.businesses.businessListByTitle,
    changedBusinessList: state.businesses.changedBusinessList,
    page: state.businesses.page,
    totalElements: state.businesses.totalElements,
    title: state.businesses.title
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //updateUsersList: () => dispatch(usersActions.setUserRoles({updatedUserList: [], changedUsersList: []})),
    //saveUserRoles: (userId, roles) => dispatch(usersOperations.saveUserRoles(userId, roles)),
    getBusinessesByPlaceID: (placeId) => dispatch(businessOperations.getBusinessesByPlaceID(placeId)),
    //updatePaginationPage: (page) => dispatch(usersActions.changePaginationPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessList))
