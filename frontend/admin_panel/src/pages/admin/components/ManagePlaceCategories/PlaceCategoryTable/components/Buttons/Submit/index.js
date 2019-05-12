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
    height: 56
  }
})

const SubmitButton = props => {
  const {classes, saveAllChanges, placeCategories} = props
  return (
    <div>
      <Button
      variant="contained"
      color="primary"
      className={classes.button}
      type="submit"
      onClick={() => saveAllChanges(placeCategories)}
      >
        SAVE
      </Button>
    </div>
  )
}

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired,
  saveAllChanges: PropTypes.func.isRequired,
  placeCategories: PropTypes.object.isRequired,
}

const mapStateToProps = ({placeCategories}) => ({
  placeCategories: placeCategories,
})

const mapDispatchToProps = dispatch => ({
  saveAllChanges: (placeCategories) => dispatch(placesCategoriesOperations.saveAllChanges(placeCategories)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubmitButton))