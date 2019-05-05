import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles/index'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

import {placesOperations} from 'store/places'
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import DeleteDialog from "../../../../../components/DeleteDialog";

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
    this.props.getAllPlaces(this.state.page, event.target.value)
  };

  render () {
    const {classes, placeList, totalElements, deletePlace} = this.props

    const {page, rowsPerPage} = this.state

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {placeList.map(place => {
              return (
                <TableRow key={place.id} hover>
                  <TableCell>{place.title}</TableCell>
                  <TableCell>{place.description}</TableCell>
                  <TableCell>{place.address}</TableCell>
                  <TableCell>{place.placeCategory ? place.placeCategory.title : ''}</TableCell>
                  <TableCell>
                    <div className={classes.buttonsWrapper}>
                      <NavLink to={`/admin/places/edit/${place.id}`} className={classes.button}>
                        <Button variant="outlined" color="primary">Edit</Button>
                      </NavLink>
                      <DeleteDialog onConfirm={() => deletePlace(place.id, page, rowsPerPage)}/>
                    </div>
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
  totalElements: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    placeList: state.places.places,
    totalElements: state.places.totalElements
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePlace: (placeId, page, size) => dispatch(placesOperations.deletePlace(placeId, page, size)),
    getAllPlaces: () => dispatch(placesOperations.getAllPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceTable))
