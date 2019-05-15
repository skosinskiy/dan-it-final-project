import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {businessOperations} from '../../../../../store/businesses'
import ImageUploader from '../../../../../components/ImageUploader'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Preloader from '../../../../../components/Preloader'
import FormButtons from '../../../../../components/FormButtons'

import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Select from '@material-ui/core/Select/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput/OutlinedInput'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import FormControl from '@material-ui/core/FormControl/FormControl'

const emptyBusiness = {
  title: "",
  description: "",
  categories: [],
  address: "",
  webSite: "",
  phoneNumber: "",
  mainPhoto: null,
  photos: null,
  place: null
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '90vh'
    }
  }
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
    const {fetchBusinessFormData, page, size} = this.props
    fetchBusinessFormData(page, size)
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
    const {places} = this.props
    if (propName === 'place') {

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
    const {places, isBusinessFormDataLoading, businessCategories} = this.props

    const {editedBusiness, businessImages, isDataSubmitted} = this.state

    if (isDataSubmitted) {
      return <Redirect to={'/admin/businesses'}/>
    }

    if (isBusinessFormDataLoading) {
      return <Preloader/>
    }

    const placeOptions = places
      .concat([{}])
      .map(place => (
        <MenuItem key={place.id ? place.id : 0} value={place.id}>
          {place.title}
        </MenuItem>
      ))

    const businessCategoriesValue = businessCategories.filter(category => editedBusiness.categories.some(businessCategory => category.id === businessCategory.id))

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
          <FormControl fullWidth variant="outlined">
            <InputLabel>
              Categories
            </InputLabel>
            <Select
              multiple
              value={businessCategoriesValue}
              onChange={(e) => this.handleChange(e, 'categories')}
              input={
                <OutlinedInput labelWidth={78}/>
              }
              renderValue={selected => selected.map(item => item.name).join(', ')}
              MenuProps={MenuProps}
            >
              {businessCategories.map(category => (
                <MenuItem key={category.id} value={category}>
                  <Checkbox checked={!!editedBusiness.categories.find(item => item.id === category.id)}/>
                  <ListItemText primary={category.name}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        <Grid item xs={12}>
          <FormButtons
            saveFunction={this.updateBusiness}
            cancelLink={'/admin/businesses'}
          />
        </Grid>
      </Grid>
    )
  }
}

BusinessForm.propTypes = {
  business: PropTypes.object,
  places: PropTypes.array.isRequired,
  isBusinessFormDataLoading: PropTypes.bool.isRequired,
  saveNewBusiness: PropTypes.func.isRequired,
  fetchBusinessFormData: PropTypes.func.isRequired,
  businessCategories: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
}

const mapStateToProps = (state, props) => {
  const business = state.businesses.businessList.find(business => business.id.toString() === props.match.params.businessId)

  return {
    places: state.places.places,
    business: business,
    businessCategories: state.businessCategory.allBusinessCategories,
    isBusinessFormDataLoading: state.businesses.isBusinessFormDataLoading,
    page: state.businesses.page,
    size: state.businesses.size
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessFormData: (page, size) => dispatch(businessOperations.fetchBusinessFormData(page, size)),
    saveNewBusiness: (business, images) => dispatch(businessOperations.saveBusiness(business, images)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessForm)
