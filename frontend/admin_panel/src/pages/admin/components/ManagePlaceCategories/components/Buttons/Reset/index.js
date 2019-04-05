import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {placesCategoriesOperations} from 'store/placeCategory'

const styles = () => ({
  button: {
    marginTop: 12,
    marginLeft: 26,
    width: 142,
    height: 56,
  }
})

const ResetButton = props => {
  const {classes, realoadData} = props
  return (
    <div>
      <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      type="reset"
      onClick={() => realoadData()}
      >
        RESET
      </Button>
    </div>
  )
}

ResetButton.propTypes = {
  classes: PropTypes.object.isRequired,
  realoadData: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  realoadData: () => dispatch(placesCategoriesOperations.realoadData()),
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(ResetButton))