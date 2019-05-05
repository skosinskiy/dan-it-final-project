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
import Paper from '@material-ui/core/Paper'

import {businessOperations} from '../../../../../store/businesses'

import DeleteDialog from '../../../../../components/DeleteDialog'
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Preloader from "../../../../../components/Preloader";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },

  table: {
    tableLayout: 'fixed'
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  button: {
    marginRight: theme.spacing.unit,
    textDecoration: 'none'
  }
})

class BusinessTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
  }

  componentDidMount() {
    this.props.getAllBusinesses(this.state.page, this.state.rowsPerPage)
  }

  handleChangePage = (event, page) => {
    this.setState({page})
    this.props.getAllBusinesses(page, this.state.rowsPerPage)
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
    this.props.getAllBusinesses(this.state.page, event.target.value)
  };

  render() {

    const {classes, businessList, deleteBusiness, isBusinessesLoading} = this.props

    if (isBusinessesLoading) {
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
            <col style={{width: '15%'}}/>
            <col style={{width: '15%'}}/>
            <col style={{width: '15%'}}/>
            <col style={{width: '15%'}}/>
            <col style={{width: '15%'}}/>
            <col style={{width: '15%'}}/>
            <col style={{width: '10%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Place</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessList.map(business => {
              return (
                <TableRow key={business.id} hover>
                  <TableCell>{business.title}</TableCell>
                  <TableCell>{business.description}</TableCell>
                  <TableCell>{business.address}</TableCell>
                  <TableCell>{business.webSite}</TableCell>
                  <TableCell>{business.phoneNumber}</TableCell>
                  <TableCell>{business.place ? business.place.title : ''}</TableCell>
                  <TableCell>
                    <div className={classes.buttonsWrapper}>
                      <NavLink to={`/admin/businesses/edit/${business.id}`} className={classes.button}>
                        <Button variant="outlined" color="primary">Edit</Button>
                      </NavLink>
                      <DeleteDialog onConfirm={() => deleteBusiness(business.id)}/>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={this.props.totalElements}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                rowsPerPage={this.state.rowsPerPage}
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

BusinessTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  businessList: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired,
  isBusinessesLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    businessList: state.businesses.businessList,
    totalElements: state.businesses.totalElements,
    isBusinessesLoading: state.businesses.isBusinessesLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBusiness: (businessId) => dispatch(businessOperations.deleteBusiness(businessId)),
    getBusinessesByPlaceID: (placeId) => dispatch(businessOperations.getBusinessesByPlaceID(placeId)),
    getAllBusinesses: (page, size) => dispatch(businessOperations.getAllBusinesses(page, size)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessTable))
