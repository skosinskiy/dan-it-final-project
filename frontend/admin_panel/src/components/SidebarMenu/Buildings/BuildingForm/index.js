import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { getBuildingsCategories, saveNewBuilding, updateBuilding } from '../../../../actions/building/buildings'
import { connect } from 'react-redux'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },

  buttonLink: {
    textDecoration: 'none'
  }

})

const emptyBuilding = {
  title: '',
  description: '',
  address: '',
  buildingCategory: {}
}

class BuildingForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      building: typeof props.building !== 'undefined' ? props.building : emptyBuilding
    }
  }

  componentDidMount () {
    const {getBuildingCategories} = this.props
    getBuildingCategories()
  }

  saveBuilding = (buildingId, building) => {
    if (buildingId) {
      this.props.updateBuilding(buildingId, building)
    } else {
      this.props.saveNewBuilding(building)
    }
  }

  handleChange = name => event => {
    let value
    if (name === 'buildingCategory') {
      value = this.props.categories.find(category => {
        return category.id === event.target.value
      })
    } else {
      value = event.target.value
    }
    this.setState({
      building: {...this.state.building, [name]: value}
    })
  };

  render () {
    const { classes, categories, buildingId } = this.props
    const { building } = this.state
    return (
      <div className="edit-building-form">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="Title"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            value={building.title}
            onChange={this.handleChange('title')}
          />

          <TextField
            id="outlined-required"
            label="Description"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            value={building.description}
            onChange={this.handleChange('description')}
          />

          <TextField
            id="outlined-required"
            label="Address"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            value={building.address}
            onChange={this.handleChange('address')}
          />

          <TextField
            disabled
            id="outlined-disabled"
            label="Photo"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-select-currency"
            select
            className={classes.textField}
            value={building.buildingCategory.id}
            onChange={this.handleChange('buildingCategory')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="select building category"
            margin="normal"
            variant="filled"
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </form>
        <div className="building-buttons">
          <NavLink to={'/admin/buildings'} className={classes.buttonLink}>
            <Button onClick={() => this.saveBuilding(buildingId, building)} variant="contained" color="primary" className={classes.button}>
            Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/buildings'} className={classes.buttonLink}>
            <Button variant="contained" color="secondary" className={classes.button}>
            Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

BuildingForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    categories: [...state.buildings.buildingCategories],
    buildingList: [...state.buildings.buildings],
    building: state.buildings.buildings.find(building => building.id === +props.match.params.buildingId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewBuilding: (building) => {
      dispatch(saveNewBuilding(building))
    },
    getBuildingCategories: () => dispatch(getBuildingsCategories()),
    updateBuilding: (buildingId, building) => dispatch(updateBuilding(buildingId, building))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BuildingForm))
