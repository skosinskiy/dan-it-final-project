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

import {eventOperations} from '../../../../../store/events'

const rows = [
  {id: 'title', numeric: true, disablePadding: false, label: 'Title'},
  {id: 'description', numeric: true, disablePadding: false, label: 'Description'},
  {id: 'address', numeric: true, disablePadding: false, label: 'Address'},
  {id: 'category', numeric: true, disablePadding: false, label: 'Event Categories'},
  {id: 'business', numeric: true, disablePadding: false, label: 'Business'},
  {id: 'place', numeric: true, disablePadding: false, label: 'Place'},
  {id: 'editBtn', numeric: false, disablePadding: false, label: ' '},
  {id: 'deleteBtn', numeric: false, disablePadding: false, label: ' '},
]

class EnhancedTableHead extends React.Component {
  render () {
    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => {
              return (
              <TableCell
                key={row.id}
                align={row.id === 'roles' ? 'right' : 'left'}
                padding='none'
              >
                  <TableSortLabel>
                    {row.label}
                  </TableSortLabel>

              </TableCell>
            )},
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

class EventList extends React.Component {

  render () {
    const {classes, eventList, deleteEvent} = this.props

    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <colgroup>
                <col style={{width:'6%'}}/>
                <col style={{width:'6%'}}/>
                <col style={{width:'6%'}}/>
                <col style={{width:'12%'}}/>
                <col style={{width:'6%'}}/>
                <col style={{width:'6%'}}/>
                <col style={{width:'5%'}}/>
                <col style={{width:'5%'}}/>
              </colgroup>
              <EnhancedTableHead
                rowCount={eventList.length}
              />
              <TableBody>
                {eventList.map(event => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={event.id}
                    >

                      <TableCell
                        padding="none"
                        align="left"
                        className='text-overflow-ellipsis'
                        title={event.email}
                      >
                        {event.title}
                      </TableCell>
                      <TableCell padding="none" align="left">{event.description}</TableCell>
                      <TableCell padding="none" align="left">{event.address}</TableCell>
                      <TableCell padding="none" align="left">
                        {event.categories.map(category => category.name).join(", ")}
                      </TableCell>
                      <TableCell padding="none" align="left">{event.business && event.business.title}</TableCell>
                      <TableCell padding="none" align="left">{event.place && event.place.title}</TableCell>

                      <TableCell padding="none" align="right">
                        <NavLink to={`/admin/events/edit/${event.id}`} className={classes.buttons} >
                          <Button variant="contained" color="primary" className={classes.button}>Edit</Button>
                        </NavLink>
                      </TableCell>
                      <TableCell padding="none" align="left">
                        <Button
                          onClick={() => deleteEvent(event.id)}
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

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  eventList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    eventList: state.events.eventList,
    totalElements: state.events.totalElements
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (eventId) => dispatch(eventOperations.deleteEvent(eventId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventList))
