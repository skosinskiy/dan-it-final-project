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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
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

  render() {
    const {classes, eventList, deleteEvent} = this.props

    return (
      <Paper className={classes.root}>
        <Table>
          <colgroup>
            <col style={{width: '6%'}}/>
            <col style={{width: '6%'}}/>
            <col style={{width: '6%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '6%'}}/>
            <col style={{width: '6%'}}/>
            <col style={{width: '4%'}}/>
            <col style={{width: '4%'}}/>
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
                      <DeleteDialog onConfirm={() => deleteEvent(event.id)}/>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
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
