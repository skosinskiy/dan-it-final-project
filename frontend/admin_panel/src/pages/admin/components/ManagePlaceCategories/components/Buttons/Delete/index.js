import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {placesCategoriesOperations} from 'store/placeCategory'
import {connect} from 'react-redux'

const styles = () => ({
  button: {
    margin: 5,
    width: 115,
    height: 40,
  }
})

const DeleteButton = props => {
  const {classes, placeCategories, deleteItem, deletedIds, placeCategoryKey} = props
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        type="reset"
        onClick={() => deleteItem(placeCategoryKey, placeCategories, deletedIds)}
        >
        DELETE
      </Button>
    </div>
  )
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  placeCategories: PropTypes.array.isRequired,
  deletedIds: PropTypes.object.isRequired,
  placeCategoryKey: PropTypes.number.isRequired,
}

const mapStateToProps = ({placeCategories}) => ({
  placeCategories: placeCategories.placeCategories,
  deletedIds: placeCategories.deletedIds
})

const mapDispatchToProps = dispatch => ({
  deleteItem: (key, placeCategories, deletedIds) =>
    dispatch(placesCategoriesOperations.deleteItem(key, placeCategories, deletedIds)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteButton))