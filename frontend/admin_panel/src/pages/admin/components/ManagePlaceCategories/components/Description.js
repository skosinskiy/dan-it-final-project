import React, { Component } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { default as FullWidthTextField } from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { placesCategoriesOperations } from 'store/placeCategory'

class Desciption extends Component {

  handleClickDescription = (event) => {
    event.target.oldValue = event.target.value
  }
  
  handleChangedDescription = (event, key) => {
    if (event.target.oldValue !== event.target.value){
      const {updateChanged, placeCategories, updateDescription} = this.props
      updateChanged(key, placeCategories)
      updateDescription(key, placeCategories, event.target.value)
    }
  }

  render() {
    const {_Key: key, description} = this.props
    return (
      <TableRow key={key * Math.random()}>
        <TableCell colSpan={4} scope="row" padding="none">
          <FullWidthTextField
            id="outlined-full-width"
            label="Desciption"
            style={{ margin: 0, marginTop: 10 }}
            placeholder={ description }
            helperText=" "
            fullWidth
            onClick={(event) => this.handleClickDescription(event)}
            onBlur={(event) => this.handleChangedDescription(event, key)}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TableCell>
      </TableRow>
    )
  }
}

Desciption.propTypes = {
  _Key: PropTypes.number.isRequired,
  description: PropTypes.string,
  updateChanged: PropTypes.func.isRequired,
  placeCategories: PropTypes.array.isRequired,
  updateDescription: PropTypes.func.isRequired,
}

const mapStateToProps = ({ placeCategories, menuItems }) => ({
  placeCategories: placeCategories.placeCategories,
})

const mapDispatchToProps = dispatch => ({
  updateChanged: (key, placeCategories) => dispatch(placesCategoriesOperations.updateChanged(key, placeCategories)),
  updateDescription: (key, placeCategories, value) =>
    dispatch(placesCategoriesOperations.updateDescription(key, placeCategories, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Desciption)