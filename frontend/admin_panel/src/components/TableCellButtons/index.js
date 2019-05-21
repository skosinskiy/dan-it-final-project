import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import TableCell from "@material-ui/core/TableCell";
import DeleteDialog from "../DeleteDialog";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  cell: {
    padding: theme.spacing.unit,
    overflowWrap: 'break-word'
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

class TableCellButtons extends Component {

  render() {

    const {classes, editLink, deleteFunction} = this.props

    return (
    <TableCell className={classes.cell}>
      <div className={classes.buttonsWrapper}>
        <NavLink to={editLink} className={classes.button}>
          <Button variant="outlined" color="primary">Edit</Button>
        </NavLink>
        <DeleteDialog onConfirm={deleteFunction}/>
      </div>
    </TableCell>
    )
  }
}

TableCellButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  editLink: PropTypes.string.isRequired,
  deleteFunction: PropTypes.func.isRequired
}

export default withStyles(styles)(TableCellButtons)

