import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {placesCategoriesOperations} from 'store/placeCategory'
import {connect} from 'react-redux'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
})

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

function getStyles (name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
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

  componentDidMount(){
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

  render () {
    const {classes, availableCategories, type} = this.props
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel htmlFor="select-multiple-chip"></InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip"/>}
            MenuProps={MenuProps}
          >
            {availableCategories.map(category => category.name)
              .map((name, i) =>
                (
                <MenuItem
                  key={i + type}
                  value={name}
                  style={getStyles(name, this)}
                >
                  {name}
                </MenuItem>
                )
              )
            }
          </Select>
        </FormControl>
      </div>
    )
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  updateCategories: PropTypes.func.isRequired,
  availableCategories: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateCategories: (type, selectedCategories) => dispatch(
    placesCategoriesOperations.updateCategories(type, selectedCategories)),
})

export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MultipleSelect))
