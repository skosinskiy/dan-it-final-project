import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'

import {placesOperations} from 'store/places'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableCellButtons from '../../../../../components/TableCellButtons'
import Preloader from "../../../../../components/Preloader";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },

  table: {
    tableLayout: 'fixed'
  }
})

class PlaceTable extends Component {

  state = {
    page: 0,
    rowsPerPage: 5
  }

  componentDidMount() {
    this.props.getAllPlaces(this.state.page, this.state.rowsPerPage)
  }

  handleChangePage = (event, page) => {
    this.setState({page})
    this.props.getAllPlaces(page, this.state.rowsPerPage)
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
    this.props.getAllPlaces(0, event.target.value)
  };

  render () {
    const {classes, placeList, totalElements, deletePlace} = this.props

    const {page, rowsPerPage} = this.state
    const {isPlacesLoading} = this.props

    if (isPlacesLoading) {
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
            <col style={{width: '23%'}}/>
            <col style={{width: '23%'}}/>
            <col style={{width: '23%'}}/>
            <col style={{width: '23%'}}/>
            <col style={{width: '8%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Category</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {placeList.map(place => {
              return (
                <TableRow key={place.id} hover>
                  <TableCell>{place.title}</TableCell>
                  <TableCell>{place.description}</TableCell>
                  <TableCell>{place.address}</TableCell>
                  <TableCell>{place.placeCategory ? place.placeCategory.name : ''}</TableCell>
                  <TableCellButtons
                    editLink={`/admin/places/edit/${place.id}`}
                    deleteFunction={() => deletePlace(place.id, page, rowsPerPage)}
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

PlaceTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllPlaces: PropTypes.func.isRequired,
  deletePlace: PropTypes.func.isRequired,
  placeList: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired,
  isPlacesLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    placeList: state.places.places,
    totalElements: state.places.totalElements,
    isPlacesLoading: state.places.isPlacesLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePlace: (placeId, page, size) => dispatch(placesOperations.deletePlace(placeId, page, size)),
    getAllPlaces: (page, size) => dispatch(placesOperations.getAllPlaces(page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceTable))
