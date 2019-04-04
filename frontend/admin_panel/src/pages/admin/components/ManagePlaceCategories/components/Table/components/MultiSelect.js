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

  componentDidUpdate(prevProps) {
    console.log(this.state)
    if (prevProps.isMultisync !== this.props.isMultisync) {
      this.setState({name: []})
    }
  }
   
  state = {
    name: []
  }

  handleChange = event => {
    const value = event.target.value
    const state = typeof value === 'string' ? {name: value} : {name: [...event.target.value]}
    this.setState(state)
    const {placeCategoryId, changed, updateChanged} = this.props
    updateChanged(placeCategoryId, changed)
  }

  render () {
    const {classes, allNames, isMultisync} = this.props
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel htmlFor="select-multiple-chip"></InputLabel>
          <Select
            multiple={isMultisync}
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
            autoWidth
          >
            {allNames.map(name => (
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
  allNames: PropTypes.array.isRequired,
  placeCategoryId: PropTypes.number.isRequired,
  updateChanged: PropTypes.func.isRequired,
  changed: PropTypes.array.isRequired,
  selectedNames: PropTypes.array.isRequired,
  isMultisync:  PropTypes.bool.isRequired,
}

const mapStateToProps = ({placeCategories, menuItems}) => ({
  changed: placeCategories.changed,
  allNames: menuItems.names,
})

const mapDispatchToProps = dispatch => ({
  updateChanged: (id, changed) => dispatch(placesCategoriesOperations.updateChanged(id, changed)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(MultipleSelect))
