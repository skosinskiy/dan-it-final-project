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

import {eventOperations} from '../../../../../store/events'
import DeleteDialog from "../../../../../components/DeleteDialog";
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

class EventList extends React.Component {

  state = {
    page: 0,
    rowsPerPage: 5
  }

  componentDidMount() {
    this.props.getAllEvents(this.state.page, this.state.rowsPerPage)
  }

  handleChangePage = (event, page) => {
    this.setState({page})
    this.props.getAllEvents(page, this.state.rowsPerPage)
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
    this.props.getAllEvents(this.state.page, event.target.value)
  };

  render() {
    const {classes, eventList, deleteEvent, isEventDataLoading, totalElements} = this.props
    const {page, rowsPerPage} = this.state

    if (isEventDataLoading) {
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
              <TableCell>Event Categories</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Place</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventList.map(event => {
              return (
                <TableRow
                  hover
                  key={event.id}
                >

                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.address}</TableCell>
                  <TableCell>
                    {event.categories.map(category => category.name).join(", ")}
                  </TableCell>
                  <TableCell>{event.business && event.business.title}</TableCell>
                  <TableCell>{event.place && event.place.title}</TableCell>

                  <TableCell>
                    <div className={classes.buttonsWrapper}>
                      <NavLink to={`/admin/events/edit/${event.id}`} className={classes.button}>
                        <Button variant="outlined" color="primary">Edit</Button>
                      </NavLink>
                      <DeleteDialog onConfirm={() => deleteEvent(event.id, page, rowsPerPage)}/>
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

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  eventList: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired,
  isEventDataLoading: PropTypes.bool.isRequired,
  getAllEvents: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    eventList: state.events.eventList,
    totalElements: state.events.totalElements,
    isEventDataLoading: state.events.isEventDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (eventId, page, size) => dispatch(eventOperations.deleteEvent(eventId, page, size)),
    getAllEvents: (page, size) => dispatch(eventOperations.getAllEvents(page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventList))
