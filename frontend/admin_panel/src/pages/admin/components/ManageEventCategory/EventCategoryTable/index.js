import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'

import {eventCategoryOperations} from 'store/eventCategory'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
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

class Events extends Component {
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
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Parent Category</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventCategories.map(eventCategory => (
              <TableRow key={eventCategory.id} hover>
                <TableCell component="th" scope="row">
                  {eventCategory.name}
                </TableCell>
                <TableCell>{eventCategory.description}</TableCell>
                <TableCell>{eventCategory.parentCategory ? eventCategory.parentCategory.name : ''}</TableCell>
                <TableCell>
                  <div className={classes.buttonsWrapper}>
                    <NavLink className={classes.button} to={`/admin/event-categories/${eventCategory.id}`}>
                      <Button variant="outlined" color="primary">Edit</Button>
                    </NavLink>
                    <DeleteDialog onConfirm={() => deleteEventCategory(eventCategory.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

Events.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Events))
