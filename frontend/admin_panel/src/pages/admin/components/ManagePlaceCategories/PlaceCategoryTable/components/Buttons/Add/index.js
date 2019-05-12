import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {placesCategoriesOperations} from 'store/placeCategory'
import {connect} from 'react-redux'


const styles = () => ({
  button: {
    marginTop: 12,
    marginLeft: 26,
    width: 142,
    height: 56
  }
})

const AddButton = props => {
  const {classes, addNewCategory, placeCategories} = props
  return (
    <div>
      <Button
      variant="contained"
      color="primary"
      className={classes.button}
      type="submit"
      onClick={() => addNewCategory(placeCategories)}
      >
        ADD
      </Button>
    </div>
  )
}

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  addNewCategory: PropTypes.func.isRequired,
  placeCategories:PropTypes.array.isRequired,
}

const mapStateToProps = ({placeCategories}) => ({
  placeCategories: placeCategories.placeCategories,
})

const mapDispatchToProps = dispatch => ({
  updateChanged: (key, placeCategories) => dispatch(placesCategoriesOperations.updateChanged(key, placeCategories)),
  addNewCategory: (placeCategories) => dispatch(placesCategoriesOperations.addNew(placeCategories))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddButton))