import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink, Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {placesOperations} from '../../../../../store/places'
import {businessOperations} from '../../../../../store/businesses'
import ImageUploader from '../../../../../components/ImageUploader'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Preloader from '../../../../../components/Preloader'

const emptyBusiness = {
  title: "",
  description: "",
  address: "",
  webSite: "",
  phoneNumber: "",
  mainPhoto: null,
  photos: null,
  place: null
}

class BusinessForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedBusiness: props.business !== undefined ? props.business : emptyBusiness,
      businessImages: props.business !== undefined ? props.business.photos : [],
      isDataSubmitted: false
    }
  }

  componentDidMount() {
    this.props.getPlaces()
    this.props.getBusinesses()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.business && nextProps.business !== this.props.business) {
      this.setState({
        editedBusiness: nextProps.business,
        businessImages: nextProps.business.photos
      })
    }
  }

  updateBusiness = (event) => {
    event.preventDefault()
    const {saveNewBusiness} = this.props
    const {businessImages} = this.state

    saveNewBusiness({...this.state.editedBusiness}, businessImages).then(() => {
      this.setState({isDataSubmitted: true})
    })
  }

  handleChange = (event, propName) => {
    if (propName === 'place') {
      const {places} = this.props
      this.setState({
        editedBusiness: {
          ...this.state.editedBusiness,
          place: places.find(place => place.id === event.target.value)
        }
      })
    } else {
      this.setState({editedBusiness: {...this.state.editedBusiness, [propName]: event.target.value}})
    }

  }

  onFileChange = (images) => {
    const newBusinessImages = images.map((file) => Object.assign(file, {
      imageUrl: URL.createObjectURL(file),
      imageKey: null
    }))

    this.setState((state) => {
      return {
        businessImages: [...state.businessImages, ...newBusinessImages]
      }
    })
  }

  onMainPhotoSelect = (selectedImage) => {
    const newBusinessImages = this.state.businessImages.map(image => {
      image.isMainImage = image === selectedImage
      return image
    })

    this.setState(() => {
      return {
        businessImages: newBusinessImages
      }
    })
  }

  onImageReset = (image) => {
    const newBusinessImages = this.state.businessImages.filter(elem => elem !== image)
    this.setState({
      ...this.state,
      businessImages: newBusinessImages,
    })
  }

  render() {
    const {places, isBusinessesLoading} = this.props

    const {editedBusiness, businessImages, isDataSubmitted} = this.state

    if (isDataSubmitted) {
      return <Redirect to={'/admin/businesses'}/>
    }

    if (isBusinessesLoading) {
      return <Preloader/>
    }

    const placeOptions = places
      .concat([{}])
      .map(place => (
        <MenuItem key={place.id ? place.id : 0} value={place.id}>
          {place.title}
        </MenuItem>
      ))

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Business name'
            fullWidth
            variant='outlined'
            value={editedBusiness.title}
            onChange={(e) => this.handleChange(e, 'title')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Description'
            fullWidth
            variant='outlined'
            value={editedBusiness.description}
            onChange={(e) => this.handleChange(e, 'description')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Address'
            fullWidth
            variant='outlined'
            value={editedBusiness.address}
            onChange={(e) => this.handleChange(e, 'address')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Website'
            fullWidth
            variant='outlined'
            value={editedBusiness.webSite}
            onChange={(e) => this.handleChange(e, 'webSite')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Phone Number'
            fullWidth
            variant='outlined'
            value={editedBusiness.phoneNumber}
            onChange={(e) => this.handleChange(e, 'phoneNumber')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label='Place'
            fullWidth
            variant='outlined'
            value={editedBusiness.place ? editedBusiness.place.id : ''}
            onChange={(e) => this.handleChange(e, 'place')}
          >
            {placeOptions}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <ImageUploader images={businessImages}
                         onFileChange={this.onFileChange}
                         onReset={this.onImageReset}
                         onMainPhotoSelect={this.onMainPhotoSelect}
                         multiple={true}
          />
        </Grid>
        <Grid container justify="center" spacing={8}>
          <Grid item>
            <Button onClick={this.updateBusiness} variant='outlined' color='primary'>
              Save
            </Button>
          </Grid>
          <Grid item>
            <NavLink style={{textDecoration: 'none'}} to={'/admin/businesses'}>
              <Button variant='outlined' color='secondary'>
                Cancel
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

BusinessForm.propTypes = {
  business: PropTypes.object,
  places: PropTypes.array.isRequired,
  isBusinessesLoading: PropTypes.bool.isRequired,
  saveNewBusiness: PropTypes.func.isRequired,
  getPlaces: PropTypes.func.isRequired,
  getBusinesses: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const business = state.businesses.businessList.find(business => business.id.toString() === props.match.params.businessId)

  return {
    places: state.places.places,
    business: business,
    isBusinessesLoading: state.businesses.isBusinessesLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaces: () => dispatch(placesOperations.getAllPlaces()),
    saveNewBusiness: (business, images) => dispatch(businessOperations.saveBusiness(business, images)),
    getBusinesses: (page, size) => dispatch(businessOperations.getAllBusinesses(page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessForm)
