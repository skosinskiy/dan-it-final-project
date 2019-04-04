import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = () => ({
  button: {
    margin: 5,
    width: 115,
    height: 40,
  }
})

const DeleteButton = props => {
  const {classes} = props
  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} type="reset">
        DELETE
      </Button>
    </div>
  )
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DeleteButton)