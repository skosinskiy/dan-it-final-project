import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { getPlacesCategories, saveNewPlace, updatePlace } from '../../../../actions/places'
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
  }
})

class PlaceForm extends React.Component {
  state = {
    place: {...this.props.currentPlaceById}
  }

  componentDidMount () {
    const {getPlaceCategories, currentPlaceById} = this.props
    getPlaceCategories()
    console.log(currentPlaceById)
  }

  savePlace = (placeId, place) => {
    if (placeId) {
      this.props.updatePlace(placeId, place)
    } else {
      this.props.saveNewPlace(place)
    }
  }

  handleChange = name => event => {
    this.setState({
      place: {...this.state.place, [name]: event.target.value}
    })
  };

  render () {
    const { classes, saveNewPlace, categories, placeId } = this.props
    const { place } = this.state
    return (
      <div className="edit-place-form">
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
            value={place.title}
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
            value={place.description}
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
            value={place.address}
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
            label="Select"
            className={classes.textField}
            value={place.placeCategory}
            onChange={this.handleChange('placeCategory')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your currency"
            margin="normal"
            variant="outlined"
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </form>
        <div className="place-buttons">
          <NavLink to={'/admin/places'}>
            <Button onClick={() => this.savePlace(placeId, place)} variant="contained" color="primary" className={classes.button}>
            Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/places'}>
            <Button variant="contained" color="secondary" className={classes.button}>
            Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

PlaceForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    categories: state.places.placeCategories,
    placeList: state.places.places,
    currentPlaceById: {...state.places.currentPlaceById}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewPlace: (place) => {
      dispatch(saveNewPlace(place))
    },
    getPlaceCategories: () => dispatch(getPlacesCategories()),
    updatePlace: (placeId, place) => dispatch(updatePlace(placeId, place)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceForm))
