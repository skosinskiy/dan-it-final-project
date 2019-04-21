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
  const {classes, reloadData} = props
  return (
    <div>
      <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      type="reset"
      onClick={() => reloadData()}
      >
        RESET
      </Button>
    </div>
  )
}

ResetButton.propTypes = {
  classes: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  reloadData: () => dispatch(placesCategoriesOperations.reloadData()),
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(ResetButton))