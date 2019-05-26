import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import {placesCategoriesOperations} from 'store/placeCategory'
import {connect} from 'react-redux'

class OutlinedTextFields extends Component {

  handleBlur = (event) => {
    if (event.target.oldValue !== event.target.value) {
      this.props.updateName(event.target.value)
    }
  }

  render() {
    const {name} = this.props

    return (
      <TextField
        fullWidth
        label={'Name'}
        defaultValue={name}
        variant='outlined'
        onBlur={(event) => this.handleBlur(event)}
      />
    )
  }
}

OutlinedTextFields.propTypes = {
  name: PropTypes.string,
  updateName: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  updateName: name => dispatch(placesCategoriesOperations.updateName(name)),
})

export default connect(null, mapDispatchToProps)(OutlinedTextFields)
