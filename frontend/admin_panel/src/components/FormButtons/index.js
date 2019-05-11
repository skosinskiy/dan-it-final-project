import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  buttons: {
    textAlign: 'center',
    margin: theme.spacing.unit,
    textDecoration: 'none',
  },

  button: {
    margin: theme.spacing.unit
  },

  buttonLink: {
    textDecoration: 'none'
  }
})

class FormButtons extends Component {

  render() {

    const {classes, saveFunction, cancelLink} = this.props

    return (
      <div className={classes.buttons}>
        <Button
          onClick={saveFunction}
          variant='outlined'
          color='primary'
          className={classes.button}
        >
          Save
        </Button>
        <NavLink to={cancelLink} className={classes.buttonLink}>
          <Button
            variant='outlined'
            color='secondary'
            className={classes.button}>
            Cancel
          </Button>
        </NavLink>
      </div>
    )

  }
}

FormButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  saveFunction: PropTypes.func.isRequired,
  cancelLink: PropTypes.string.isRequired
}

export default withStyles(styles)(FormButtons)
