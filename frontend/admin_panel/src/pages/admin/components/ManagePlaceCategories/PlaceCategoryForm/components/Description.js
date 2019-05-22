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
      this.props.updateDescription(event.target.value)
    }
  }

  render() {
    const {_Key: key, description} = this.props
    return (
      <TableRow key={key * Math.random()}>
        <TableCell colSpan={6} scope="row" padding="none">
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
  updateDescription: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateDescription: value => dispatch(placesCategoriesOperations.updateDescription(value))
})

export default connect(null, mapDispatchToProps)(Desciption)