import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import {businessOperations} from '../../../../../store/businesses'

import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Preloader from '../../../../../components/Preloader'
import TableCellButtons from '../../../../../components/TableCellButtons'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },

  table: {
    tableLayout: 'fixed'
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
    this.props.getAllBusinesses(0, event.target.value)
  };

  render() {

    const {classes, businessList, deleteBusiness, isBusinessesLoading, totalElements} = this.props
    const {page, rowsPerPage} = this.state

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
            <col style={{width: '12%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '17%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '13%'}}/>
            <col style={{width: '13%'}}/>
            <col style={{width: '9%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Place</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessList.map(business => {
              return (
                <TableRow key={business.id} hover>
                  <TableCell>{business.title}</TableCell>
                  <TableCell>{business.description}</TableCell>
                  <TableCell>{business.categories.map(category => category.name).join(', ')}</TableCell>
                  <TableCell>{business.address}</TableCell>
                  <TableCell>{business.webSite}</TableCell>
                  <TableCell>{business.phoneNumber}</TableCell>
                  <TableCell>{business.place ? business.place.title : ''}</TableCell>
                  <TableCellButtons
                    editLink={`/admin/businesses/edit/${business.id}`}
                    deleteFunction={() => deleteBusiness(business.id, page, rowsPerPage)}
                  />
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
    deleteBusiness: (businessId, page, size) => dispatch(businessOperations.deleteBusiness(businessId, page, size)),
    getAllBusinesses: (page, size) => dispatch(businessOperations.getAllBusinesses(page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessTable))
