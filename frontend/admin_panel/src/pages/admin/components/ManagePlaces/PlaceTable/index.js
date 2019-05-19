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

class PlaceTable extends Component {

  componentDidMount() {
    const {getAllPlaces, searchParam, page, size} = this.props
    getAllPlaces(searchParam, page, size)
  }

  handleChangePage = (event, page) => {
    const {getAllPlaces, searchParam, size} = this.props
    getAllPlaces(searchParam, page, size)
  }

  handleChangeRowsPerPage = event => {
    const {getAllPlaces, searchParam} = this.props
    getAllPlaces(searchParam, 0, event.target.value)
  };

  render () {
    const {classes, placeList, totalElements, deletePlace, isPlacesLoading, page, size, searchParam} = this.props

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
              <TableCell className={classes.firstCell}>Title</TableCell>
              <TableCell className={classes.cell}>Description</TableCell>
              <TableCell className={classes.cell}>Address</TableCell>
              <TableCell className={classes.cell}>Category</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {placeList.map(place => {
              return (
                <TableRow key={place.id} hover>
                  <TableCell className={classes.firstCell}>{place.title}</TableCell>
                  <TableCell className={classes.cell}>{place.description}</TableCell>
                  <TableCell className={classes.cell}>{place.address}</TableCell>
                  <TableCell className={classes.cell}>{place.placeCategory ? place.placeCategory.name : ''}</TableCell>
                  <TableCellButtons
                    editLink={`/admin/places/edit/${place.id}`}
                    deleteFunction={() => deletePlace(place.id, searchParam, page, size)}
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

PlaceTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllPlaces: PropTypes.func.isRequired,
  deletePlace: PropTypes.func.isRequired,
  placeList: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired,
  isPlacesLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  searchParam: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    placeList: state.places.places,
    totalElements: state.places.totalElements,
    isPlacesLoading: state.places.isPlacesLoading,
    page: state.places.page,
    size: state.places.size,
    searchParam: state.places.searchParam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePlace: (placeId, searchParam, page, size) => dispatch(placesOperations.deletePlace(placeId, searchParam, page, size)),
    getAllPlaces: (searchParam, page, size) => dispatch(placesOperations.getAllPlaces(searchParam, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceTable))
