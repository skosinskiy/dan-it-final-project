import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {placesOperations} from 'store/places'
import ImageUploader from '../../../../../components/ImageUploader'

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
  placeCategory: null
}

class PlaceForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      place: {...emptyPLace},
      placeImages: props.place !== undefined ? props.place.photos : []
    }
  }

  componentDidMount () {
    const {getPlaceCategories, match, getAllPlaces, place} = this.props
    const newPLace = !match.params.placeId
    getPlaceCategories()
    if (!newPLace && !place) {
      getAllPlaces()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.place) {
      this.setState({place: {...nextProps.place}})
    }
  }

  savePlace = (placeId, place) => {
    const {savePlace} = this.props
    const {placeImages} = this.state
    savePlace(place, placeImages)
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

  onFileChange = (images) => {
    const newPlaceImage = images.map((file) => Object.assign(file, {
      imageUrl: URL.createObjectURL(file),
      imageKey: null
    }))

    this.setState((state) => {
      return {
        placeImages: [...state.placeImages, ...newPlaceImage]
      }
    })
  }

  onMainPhotoSelect = (selectedImage) => {
    const newPlaceImages = this.state.placeImages.map(image => {
      image.isMainImage = image === selectedImage
      return image
    })

    this.setState(() => {
      return {
        placeImages: newPlaceImages
      }
    })
  }

  onImageReset = (image) => {
    const newPlaceImages = this.state.placeImages.filter(elem => elem !== image)
    this.setState({
      ...this.state,
      placeImages: newPlaceImages,
    })
  }

  render () {
    const {classes, categories, placeId} = this.props
    const {place, placeImages} = this.state

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
            id="outlined-select-currency"
            select
            className={classes.textField}
            value={place.placeCategory && place.placeCategory.id}
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
        </form>
        <div style={{width: '50%'}}>
          <ImageUploader  images={placeImages}
                          onFileChange={this.onFileChange}
                          onReset={this.onImageReset}
                          onMainPhotoSelect={this.onMainPhotoSelect} />
        </div>


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
  classes: PropTypes.object.isRequired,
  place: PropTypes.object.isRequired,
  getPlaceCategories: PropTypes.func.isRequired,
  savePlace: PropTypes.func.isRequired,
  getAllPlaces: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  placeId: PropTypes.number.isRequired,
  match:  PropTypes.bool.isRequired,
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
    getPlaceCategories: () => dispatch(placesOperations.getPlacesCategories()),
    savePlace: (placeId, place) => dispatch(placesOperations.savePlace(placeId, place)),
    getAllPlaces: () => dispatch(placesOperations.getPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceForm))
