import React, {Component} from 'react'
import {default as FullWidthTextField} from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {placesCategoriesOperations} from 'store/placeCategory'

class Desciption extends Component {

  handleClickDescription = (event) => {
    event.target.oldValue = event.target.value
  }

  handleChangedDescription = (event, key) => {
    if (event.target.oldValue !== event.target.value) {
      this.props.updateDescription(event.target.value)
    }
  }

  render() {
    const {_Key: key, description} = this.props
    return (
      <FullWidthTextField
        label="Description"
        defaultValue={description}
        fullWidth
        onClick={(event) => this.handleClickDescription(event)}
        onBlur={(event) => this.handleChangedDescription(event, key)}
        variant="outlined"
        autoComplete="off"
      />
    )
  }
}

Desciption.propTypes = {
  _Key: PropTypes.number.isRequired,
  description: PropTypes.string,
  updateDescription: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateDescription: value => dispatch(placesCategoriesOperations.updateDescription(value))
})

export default connect(null, mapDispatchToProps)(Desciption)
