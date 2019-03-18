import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import { SET_BUILDING_TYPES } from '../../../../actions/buildings'
import './buildingItem.scss'

const styles = theme => ({
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
      that.props.building.roles.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  }
}

class BuildingItem extends React.Component {
  handleChange = event => {
    this.props.updateBuildingsList(this.props.building, event.target.value, this.props.buildingsListByName, this.props.changedBuildingsList)
  }

  render () {
    const { classes, building } = this.props
    const types = this.props.buildingTypes.filter(type => building.types.some(buildingType => type.id === buildingType.id))
    console.log(this.props.buildingTypes)
    return (
      <li className="building-item">
        <h4>{building.name}</h4>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Select Types</InputLabel>
          <Select
            multiple
            value={types}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value.id} label={value.name} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.props.buildingTypes.map(type => (
              <MenuItem key={type.id} value={type} style={getStyles(type, this)}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </li>
    )
  }
}

BuildingItem.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    buildingsListByName: state.buildings.buildingsListByName,
    buildingTypes: state.buildings.buildingTypes,
    changedBuildingsList: state.buildings.changedBuildingsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBuildingsList: (building, selectedTypes, buildingList, changedBuildings) => {
      building.types = [...selectedTypes]
      let updatedBuildingList = buildingList.map((item) => {
        if (item.id === building.id) {
          return building
        }
        return item
      })

      let changedBuildingsList = changedBuildings
      changedBuildingsList.add(building.id)
      dispatch({type: SET_BUILDING_TYPES, payload: {updatedBuildingList, changedBuildingsList}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(BuildingItem))