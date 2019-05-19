import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {eventOperations} from '../../../../../store/events'
import ImageUploader from '../../../../../components/ImageUploader'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Preloader from '../../../../../components/Preloader'
import Grid from '@material-ui/core/Grid'
import MomentUtils from '@date-io/moment'
import {MuiPickersUtilsProvider, DateTimePicker} from 'material-ui-pickers'
import FormButtons from "../../../../../components/FormButtons";

const emptyEvent = {
  title: "",
  description: "",
  address: "",
  categories: [],
  business: null,
  place: null,
  startDate: null,
  endDate: null
}

class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedEvent: props.event !== undefined ? props.event : emptyEvent,
      eventImages: props.event !== undefined ? props.event.photos : [],
      isDataSubmitted: false
    }

  }

  componentDidMount() {
    const {fetchEventFormData, searchParam, page, size} = this.props
    fetchEventFormData(searchParam, page, size)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event && nextProps.event !== this.props.event) {
      this.setState({
        editedEvent: nextProps.event,
        eventImages: nextProps.event.photos
      })
    }
  }

  updateEvent = () => {
    const {saveEvent} = this.props
    const {editedEvent, eventImages} = this.state

    saveEvent(editedEvent, eventImages).then(() => {
      this.setState({
        isDataSubmitted: true
      })
    })
  }

  handleChange = propName => event => {
    const {businesses, places} = this.props
    if (propName === 'business') {
      this.setState({
        editedEvent: {
          ...this.state.editedEvent,
          business: businesses.find(business => business.id === event.target.value)
        }
      })
    } else if (propName === 'place') {
      this.setState({
        editedEvent: {
          ...this.state.editedEvent,
          place: places.find(place => place.id === event.target.value)
        }
      })
    } else if (propName === 'startDate' || propName === 'endDate') {
      this.setState({
        editedEvent: {
          ...this.state.editedEvent,
          [propName]: event
        }
      })
    } else {
      this.setState({
        editedEvent: {
          ...this.state.editedEvent,
          [propName]: event.target.value}})
    }
  }

  onFileChange = (images) => {
    const newEventImages = images.map((file) => Object.assign(file, {
      imageUrl: URL.createObjectURL(file),
      imageKey: null
    }))

    this.setState({
      ...this.state,
      eventImages: [...this.state.eventImages, ...newEventImages]
    })

  }

  onMainPhotoSelect = (selectedImage) => {
    const newEventImages = this.state.eventImages.map(image => {
      image.isMainImage = image === selectedImage
      return image
    })
    this.setState({
      ...this.state,
      eventImages: newEventImages
    })
  }

  onImageReset = (image) => {
    const newEventImages = this.state.eventImages.filter(elem => elem !== image)
    this.setState({
      ...this.state,
      eventImages: newEventImages,
    })
  }

  render() {

    const {businesses, places, eventCategories, isLoading} = this.props
    const {editedEvent, eventImages, isDataSubmitted} = this.state

    const eventCategoriesValue = eventCategories
      .filter(category => editedEvent.categories.some(currentCategory => category.id === currentCategory.id))

    if (isDataSubmitted) {
      return <Redirect to={'/admin/events'}/>
    }

    if (isLoading) {
      return <Preloader/>
    }

    const businessOptions = businesses
      .concat([{}])
      .map(business => (
        <MenuItem key={business.id ? business.id : 0} value={business.id}>
          {business.title}
        </MenuItem>
      ))

    const placeOptions = places
      .concat([{}])
      .map(place => (
        <MenuItem key={place.id ? place.id : 0} value={place.id}>
          {place.title}
        </MenuItem>
      ))

    const eventCategoriesOptions = eventCategories
      .map(category => (
        <MenuItem key={category.id} value={category}>
          {category.name}
        </MenuItem>
      ))

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Event name'
            fullWidth
            variant='outlined'
            value={editedEvent.title}
            onChange={this.handleChange('title')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Description'
            fullWidth
            variant='outlined'
            value={editedEvent.description}
            onChange={this.handleChange('description')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Address'
            fullWidth
            variant='outlined'
            value={editedEvent.address}
            onChange={this.handleChange('address')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>
              Event Categories
            </InputLabel>
            <Select
              multiple
              value={eventCategoriesValue}
              onChange={this.handleChange('categories')}
              input={
                <OutlinedInput
                  labelWidth={125}
                  name="age"
                  id="outlined"
                />
              }
            >
              {eventCategoriesOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Business'
            select
            fullWidth
            variant='outlined'
            value={editedEvent.business ? editedEvent.business.id : ''}
            onChange={this.handleChange('business')}
          >
            {businessOptions}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Place'
            select
            fullWidth
            variant='outlined'
            value={editedEvent.place ? editedEvent.place.id : ''}
            onChange={this.handleChange('place')}
          >
            {placeOptions}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              ampm={false}
              variant='outlined'
              label="Start date"
              fullWidth
              disablePast
              value={editedEvent.startDate}
              onChange={this.handleChange('startDate')}/>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              ampm={false}
              variant='outlined'
              fullWidth
              label="End date"
              disablePast
              value={editedEvent.endDate}
              onChange={this.handleChange('endDate')}/>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <ImageUploader
            images={eventImages}
            onFileChange={this.onFileChange}
            onReset={this.onImageReset}
            onMainPhotoSelect={this.onMainPhotoSelect}
            multiple={true}/>
        </Grid>
        <Grid item xs={12}>
          <FormButtons
            saveFunction={(e) => this.updateEvent(e)}
            cancelLink={'/admin/events'}
          />
        </Grid>
      </Grid>
    )
  }
}

EventForm.propTypes = {
  match: PropTypes.object.isRequired,
  businesses: PropTypes.array.isRequired,
  eventCategories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  event: PropTypes.object,
  places: PropTypes.array,
  saveEvent: PropTypes.func,
  fetchEventFormData: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  searchParam: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => {
  const event = state.events.eventList.find(event => event.id.toString() === props.match.params.eventId)
  return {
    businesses: state.businesses.businessList,
    places: state.places.places,
    eventCategories: state.eventCategory.allEventCategories,
    event: event,
    isLoading: state.events.isEventFormDataLoading,
    page: state.events.page,
    size: state.events.size,
    searchParam: state.events.searchParam,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveEvent: (event, images) => dispatch(eventOperations.saveEvent(event, images)),
    fetchEventFormData: (searchParam, page, size) => dispatch(eventOperations.fetchEventFormData(searchParam, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)
