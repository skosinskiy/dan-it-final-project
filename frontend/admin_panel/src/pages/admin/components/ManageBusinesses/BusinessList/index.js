import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import Button from '@material-ui/core/Button'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'

import {businessOperations} from '../../../../../store/businesses'

import './businessList.scss'

const rows = [
  {id: 'title', numeric: true, disablePadding: false, label: 'Title'},
  {id: 'description', numeric: true, disablePadding: false, label: 'Description'},
  {id: 'address', numeric: true, disablePadding: false, label: 'Address'},
  {id: 'website', numeric: true, disablePadding: false, label: 'Website'},
  {id: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone Number'},
  {id: 'paceId', numeric: true, disablePadding: false, label: 'Place Id'},
  {id: 'editBtn', numeric: false, disablePadding: false, label: ' '},
  {id: 'deleteBtn', numeric: false, disablePadding: false, label: ' '},
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

class BusinessList extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    page: 0,
    rowsPerPage: 25
  }

  componentDidMount () {
    this.props.getAllBusinesses()
  }

  handleChangePage = (event, page) => {
    this.props.updatePaginationPage(page)
    this.props.getAllBusinesses()
  }

  render () {
    const {classes, businessList, deleteBusiness} = this.props

    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                rowCount={businessList.length}
              />
              <TableBody>
                {businessList.map(business => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={business.id}
                    >

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
                      <TableCell padding="none" align="left">{business.webSite}</TableCell>
                      <TableCell padding="none" align="left">{business.phoneNumber}</TableCell>
                      <TableCell padding="none" align="left">{business.place.id}</TableCell>

                      <TableCell padding="none" align="right">
                        <NavLink to={`/admin/businesses/edit/${business.title}`} className={classes.buttons} >
                          <Button variant="contained" color="primary" className={classes.button}>Edit</Button>
                        </NavLink>
                      </TableCell>
                      <TableCell padding="none" align="left">
                        <Button
                          onClick={() => deleteBusiness(business.id)}
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                        >
                          Delete
                        </Button>
                      </TableCell>

                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    )
  }
}

BusinessList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    businessList: state.businesses.businessList,
    totalElements: state.businesses.totalElements,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBusiness: (businessId) => dispatch(businessOperations.deleteBusiness(businessId)),
    getBusinessesByPlaceID: (placeId) => dispatch(businessOperations.getBusinessesByPlaceID(placeId)),
    getAllBusinesses: () => dispatch(businessOperations.getAllBusinesses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessList))
