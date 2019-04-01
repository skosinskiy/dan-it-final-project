import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = () => ({
  button: {
    marginTop: 12,
    marginLeft: 26,
    width: 142,
    height: 56
  }
})

const SubmitButton = props => {
  const {classes} = props
  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button} type="submit">
        SAVE
      </Button>
    </div>
  )
}

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SubmitButton)
