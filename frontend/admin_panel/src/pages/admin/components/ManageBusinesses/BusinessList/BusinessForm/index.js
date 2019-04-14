import React, {Component} from 'react'
import {toastr} from 'react-redux-toastr'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {placesOperations} from '../../../../../../store/places'
import {businessOperations} from "../../../../../../store/businesses";
import ImageUploader from '../../../../../../components/ImageUploader'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '45%'
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
    marginRight: '10px',
    textDecoration: 'none'
  },

  buttons: {
    margin: '8px',
    textDecoration: 'none',
  }

})

const emptyBusiness = {
  title: "",
  description: "",
  address: "",
  webSite: "",
  phoneNumber: "",
  mainPhoto: null,
  photos: null,
  place: undefined,
}

class BusinessForm extends Component {
  constructor (props) {
    super(props)

    // const imageUrl = props.business !== undefined ? props.business.imageUrl : null
    // const imageKey = props.business !== undefined ? props.business.imageKey : null
    // const imageUrl = null
    // const imageKey = null

    this.state = {
      editedBusiness: props.business !== undefined ? props.business : emptyBusiness,
      place: undefined,
      businessImages: props.business !== undefined ? props.business.photos : []
    }

  }

  componentDidMount() {
    this.props.getPlaces()
    if(this.props.business !== undefined){
      this.setState({place: this.props.business.place.id})
    }
  }

  getSpecificPlace = (placeID) => {
    const {places} = this.props
    for (const place of places){
      if (place.id === parseInt(placeID)){
        return place
      }
    }
    return null
  }

  saveBusiness = () => {
    const {saveNewBusiness} = this.props
    const {place, businessImages} = this.state
    const placeObject = this.getSpecificPlace(place)
    const toastrOptions = {timeoOut: 6000}

    placeObject !== null
      ? saveNewBusiness({...this.state.editedBusiness, place: placeObject}, businessImages)
      : toastr.error('Error', 'Provided PlaceID does not exist in DB. Please create a new place first', toastrOptions)
  }

  handleChange = (event, propName) => {
    if (propName === 'place'){
      this.setState({place: event.target.value})
    } else {
      this.setState({editedBusiness: {...this.state.editedBusiness, [propName]: event.target.value}})
    }
  }

  onFileChange = (images) => {
    const newBusinessCategoryImage = images.map((file) => Object.assign(file, {
      imageUrl: URL.createObjectURL(file),
      imageKey: null
    }))

    this.setState((state) => {
      return {
        businessImages: [...state.businessImages, ...newBusinessCategoryImage]
      }
    })
  }

  onMainPhotoSelect = (selectedImage) => {
    const newBusinessCategoryImages = this.state.businessImages.map(image => {
      image.isMainImage = image === selectedImage
      return image
    })

    this.setState(() => {
      return {
        businessImages: newBusinessCategoryImages
      }
    })
  }

  onImageReset = (image) => {
    const newBusinessCategoryImages = this.state.businessImages.filter(elem => elem !== image)
    this.setState({
      ...this.state,
      businessImages: newBusinessCategoryImages,
    })
  }

  render () {
    const {classes} = this.props
    const {editedBusiness, place, businessImages} = this.state
    return (
      <div className={classes.container}>
        <TextField
          label='Business name'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.title}
          onChange={(e) => this.handleChange(e, 'title')}
        />
        <TextField
          label='Description'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.description}
          onChange={(e) => this.handleChange(e, 'description')}
        />
        <TextField
          label='Address'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.address}
          onChange={(e) => this.handleChange(e, 'address')}
        />
        <TextField
          label='Website'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.webSite}
          onChange={(e) => this.handleChange(e, 'webSite')}
        />
        <TextField
          label='Phone Number'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.phoneNumber}
          onChange={(e) => this.handleChange(e, 'phoneNumber')}
        />
        <TextField
          label='Place ID'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={place}
          onChange={(e) => this.handleChange(e, 'place')}
        />

        <ImageUploader  images={businessImages}
                        onFileChange={this.onFileChange}
                        onReset={this.onImageReset}
                        onMainPhotoSelect={this.onMainPhotoSelect} />

        <div className={classes.buttons}>
          <NavLink to={'/admin/businesses'} className={classes.buttonLink}>
            <Button
              onClick={this.saveBusiness}
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/businesses'} className={classes.buttonLink}>
            <Button variant='contained' color='secondary' className={classes.button}>
              Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

BusinessForm.propTypes = {
  classes: PropTypes.object.isRequired
  // business: PropTypes.object.isRequired,
  // places: PropTypes.object.isRequired,
  // saveNewBusiness: PropTypes.func.isRequired,
  // getPlaces: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const business = state.businesses.businessList.find(business => business.title === props.match.params.title)

  return {
    places: state.places.places,
    business
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaces: () => dispatch(placesOperations.getPlaces()),
    saveNewBusiness: (business, images) => dispatch(businessOperations.saveNewBusiness(business, images)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessForm))
