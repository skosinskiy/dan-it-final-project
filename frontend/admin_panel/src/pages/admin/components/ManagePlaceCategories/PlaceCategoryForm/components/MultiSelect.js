import React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {placesCategoriesOperations} from 'store/placeCategory'
import {connect} from 'react-redux'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

class MultipleSelect extends React.Component {

  state = {
    name: [],
    namesToCategories: {}
  }

  handleChange = event => {
    this.setState({name: event.target.value})
    const {updateCategories, type} = this.props
    const newCategories =
      event.target.value.map(categoryName => this.state.namesToCategories[categoryName])
    updateCategories(type, newCategories)
  }

  componentDidMount() {
    const {selectedCategories, availableCategories} = this.props
    const namesToCategories = availableCategories.reduce((accum, category) =>
      Object.assign(accum, {
        [category.name]: category
      }), {})
    const newState = {
      name: selectedCategories.map(category => category.name || category),
      namesToCategories,
    }
    this.setState(newState)
  }

  render() {
    const {availableCategories, type, label, width} = this.props
    return (
      <FormControl fullWidth variant="outlined">
        <InputLabel>
          {label}
        </InputLabel>
        <Select
          multiple
          value={this.state.name}
          onChange={this.handleChange}
          input={
            <OutlinedInput labelWidth={width}/>
          }
          MenuProps={MenuProps}
        >
          {availableCategories.map(category => category.name)
            .map((name, i) =>
              (
                <MenuItem key={i + type} value={name}>
                  {name}
                </MenuItem>
              )
            )
          }
        </Select>
      </FormControl>
    )
  }
}

MultipleSelect.propTypes = {
  selectedCategories: PropTypes.array.isRequired,
  updateCategories: PropTypes.func.isRequired,
  availableCategories: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}

const mapDispatchToProps = dispatch => ({
  updateCategories: (type, selectedCategories) =>
    dispatch(placesCategoriesOperations.updateCategories(type, selectedCategories)),
})

export default connect(null, mapDispatchToProps)(MultipleSelect)
