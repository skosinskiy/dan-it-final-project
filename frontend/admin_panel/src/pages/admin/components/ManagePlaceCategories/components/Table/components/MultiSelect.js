import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {placesCategoriesOperations} from 'store/placeCategory'
import {menuItemsOperations} from 'store/menuItems'
import {connect} from 'react-redux'
import Preloader from 'components/Preloader';

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

  componentDidMount () {
    debugger
    this.props.fetchNames()
  }
  
  state = {
    name: []
  }

  handleChange = event => {
    this.setState({name: event.target.value})
    const {placeCategoryId, changed, updateChanged} = this.props
    updateChanged(placeCategoryId, changed)
  }

  render () {
    const {classes, names, isLoading} = this.props
    if (isLoading) {
      return <Preloader />
    }
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel htmlFor="select-multiple-chip"></InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip"/>}
            // renderValue={selected => (
            //   <div className={classes.chips}>
            //     {selected.map(value => (
            //       <Chip key={value} label={value} className={classes.chip}/>
            //     ))}
            //   </div>
            // )}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, this)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  names: PropTypes.array.isRequired,
  placeCategoryId: PropTypes.number.isRequired,
  updateChanged: PropTypes.func.isRequired,
  changed: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchNames: PropTypes.func.isRequired,
  selectedNames: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  changed: state.placeCategories.changed,
  names: state.menuItems.names,
  isLoading: state.menuItems.isLoading
})

const mapDispatchToProps = dispatch => ({
  updateChanged: (id, changed) => dispatch(placesCategoriesOperations.updateChanged(id, changed)),
  fetchNames: () => dispatch(menuItemsOperations.fetchNames())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MultipleSelect))
