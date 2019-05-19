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

import {eventOperations} from '../../../../../store/events'
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

class EventTable extends React.Component {

  componentDidMount() {
    const {getAllEventsByParams, searchParam, page, size} = this.props
    getAllEventsByParams(searchParam, page, size)
  }

  handleChangePage = (event, page) => {
    const {getAllEventsByParams, searchParam, size} = this.props
    getAllEventsByParams(searchParam, page, size)
  }

  handleChangeRowsPerPage = event => {
    const {getAllEventsByParams, searchParam} = this.props
    getAllEventsByParams(searchParam, 0, event.target.value)
  }

  render() {
    const {classes, eventList, deleteEvent, isEventDataLoading, totalElements, page, size, searchParam} = this.props

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
            <col style={{width: '14%'}}/>
            <col style={{width: '14%'}}/>
            <col style={{width: '14%'}}/>
            <col style={{width: '14%'}}/>
            <col style={{width: '14%'}}/>
            <col style={{width: '14%'}}/>
            <col style={{width: '16%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell className={classes.firstCell}>Title</TableCell>
              <TableCell className={classes.cell}>Description</TableCell>
              <TableCell className={classes.cell}>Address</TableCell>
              <TableCell className={classes.cell}>Event Categories</TableCell>
              <TableCell className={classes.cell}>Business</TableCell>
              <TableCell className={classes.cell}>Place</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventList.map(event => {
              return (
                <TableRow hover key={event.id}>
                  <TableCell className={classes.firstCell}>{event.title}</TableCell>
                  <TableCell className={classes.cell}>{event.description}</TableCell>
                  <TableCell className={classes.cell}>{event.address}</TableCell>
                  <TableCell className={classes.cell}>
                    {event.categories.map(category => category.name).join(", ")}
                  </TableCell>
                  <TableCell className={classes.cell}>{event.business && event.business.title}</TableCell>
                  <TableCell className={classes.cell}>{event.place && event.place.title}</TableCell>
                  <TableCellButtons
                    editLink={`/admin/events/edit/${event.id}`}
                    deleteFunction={() => deleteEvent(event.id, searchParam, page, size)}
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

EventTable.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  eventList: PropTypes.array.isRequired,
  totalElements: PropTypes.number.isRequired,
  isEventDataLoading: PropTypes.bool.isRequired,
  getAllEventsByParams: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  searchParam: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    eventList: state.events.eventList,
    totalElements: state.events.totalElements,
    isEventDataLoading: state.events.isEventDataLoading,
    page: state.events.page,
    size: state.events.size,
    searchParam: state.events.searchParam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (eventId, searchParam, page, size) => dispatch(eventOperations.deleteEvent(eventId, searchParam, page, size)),
    getAllEventsByParams: (page, size) => dispatch(eventOperations.getAllEventsByParams(page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventTable))
