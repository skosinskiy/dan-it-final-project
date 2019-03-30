/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {placesOperations} from 'store/places'

import ImageUploader from 'components/ImageUploader'

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

const emptyPLace = {
  title: '',
  description: '',
  address: '',
  placeCategory: {}
}

class PlaceForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      place: typeof props.place !== 'undefined' ? props.place : emptyPLace,
      imagePreviewUrl: '',
      placeImage: null
    }
  }

  componentDidMount () {
    const {getPlaceCategories} = this.props
    getPlaceCategories()
  }

  savePlace = (placeId, place) => {
    if (placeId) {
      this.props.updatePlace(placeId, place)
    } else {
      this.props.saveNewPlace(place)
    }
  }

  handleChange = name => event => {
    let value
    if (name === 'placeCategory') {
      value = this.props.categories.find(category => {
        return category.id === event.target.value
      })
    } else {
      value = event.target.value
    }
    this.setState({
      place: {...this.state.place, [name]: value}
    })
  }

  onFileChange = (event) => {
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = (e) => {
      this.setState({
        ...this.state,
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(file)
    this.setState({
      ...this.state,
      businessCategoryImage: file
    })
  }

  onImageReset = () => {
    this.setState({
      ...this.state,
      businessCategoryImage: null,
      imagePreviewUrl: ''
    })
  }

  render () {
    const {classes, categories, placeId} = this.props
    const {place, imagePreviewUrl} = this.state

    return (
      <div className="edit-place-form">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="Title"
            style={{margin: 8}}
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
            style={{margin: 8}}
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
            style={{margin: 8}}
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
            className={classes.textField}
            value={place.placeCategory.id}
            onChange={this.handleChange('placeCategory')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="select place category"
            margin="normal"
            variant="filled"
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <ImageUploader imagePreviewUrl={imagePreviewUrl}
          onFileChange={this.onFileChange} onReset={this.onImageReset} />

        </form>
        <div className="place-buttons">
          <NavLink to={'/admin/places'} className={classes.buttonLink}>
            <Button onClick={() => this.savePlace(placeId, place)} variant="contained" color="primary"
                    className={classes.button}>
              Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/places'} className={classes.buttonLink}>
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

const mapStateToProps = (state, props) => {
  return {
    categories: [...state.places.placeCategories],
    placeList: [...state.places.places],
    place: state.places.places.find(place => place.id === +props.match.params.placeId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewPlace: (place) => dispatch(placesOperations.saveNewPlace(place)),
    getPlaceCategories: () => dispatch(placesOperations.getPlacesCategories()),
    updatePlace: (placeId, place) => dispatch(placesOperations.updatePlace(placeId, place))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceForm))
