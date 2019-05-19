import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'

import {eventCategoryOperations} from 'store/eventCategory'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {Table} from '@material-ui/core'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
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

class EventCategoryTable extends Component {
  render () {
    const {classes, deleteEventCategory, eventCategories} = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <colgroup>
            <col style={{width:'25%'}}/>
            <col style={{width:'25%'}}/>
            <col style={{width:'25%'}}/>
            <col style={{width:'25%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell className={classes.firstCell}>Name</TableCell>
              <TableCell className={classes.cell}>Description</TableCell>
              <TableCell className={classes.cell}>Parent Category</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventCategories.map(eventCategory => (
              <TableRow key={eventCategory.id} hover>
                <TableCell className={classes.firstCell}>{eventCategory.name}</TableCell>
                <TableCell className={classes.cell}>{eventCategory.description}</TableCell>
                <TableCell className={classes.cell}>{eventCategory.parentCategory ? eventCategory.parentCategory.name : ''}</TableCell>
                <TableCellButtons
                  editLink={`/admin/event-categories/${eventCategory.id}`}
                  deleteFunction={() => deleteEventCategory(eventCategory.id)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

EventCategoryTable.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteEventCategory: PropTypes.func.isRequired,
  eventCategories: PropTypes.array.isRequired
}

const mapStateToProps = ({eventCategory}) => {
  return {
    eventCategories: eventCategory.allEventCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEventCategory: (categoryId) => dispatch(eventCategoryOperations.deleteEventCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventCategoryTable))
