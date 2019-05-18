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

class LayoutMultipleSelect extends React.Component {

  state = {
    name: [],
    namesToBusinessCategories: {}
  }

  handleChange = event => {
    this.setState({name: event.target.value})
    const newBusinessCategories =
      event.target.value.map(businessCategoryName => this.state.namesToBusinessCategories[businessCategoryName])
    this.props.updateBusinessCategories(newBusinessCategories)
  }

  componentDidMount(){
    const {selectedBusinessCategories, availableBusinessCategories} = this.props
    const namesToBusinessCategories = availableBusinessCategories.reduce((accum, businessCategory) =>
      Object.assign(accum, {
        [businessCategory.name]: businessCategory
      }), {})
    const newState = {
      name: selectedBusinessCategories.map(category => category.name),
      namesToBusinessCategories: namesToBusinessCategories,
    }
    this.setState(newState)
  }

  render () {
    const {classes, availableBusinessCategories} = this.props
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
            {availableBusinessCategories.map(category => category.name)
              .map(name =>
                (
                <MenuItem
                  key={name}
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

LayoutMultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedBusinessCategories: PropTypes.array.isRequired,
  updateBusinessCategories: PropTypes.func.isRequired,
  availableBusinessCategories: PropTypes.array.isRequired,
}

const mapStateToProps = ({placeCategories}) => ({
  availableBusinessCategories: placeCategories.availableBusinessCategories,
})

const mapDispatchToProps = dispatch => ({
  updateBusinessCategories: selectedBusinessCategories => dispatch(
    placesCategoriesOperations.updateCategories(selectedBusinessCategories)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(LayoutMultipleSelect))
