import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink, Redirect} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {eventOperations} from "../../../../../../store/events";
import ImageUploader from '../../../../../../components/ImageUploader'
import MenuItem from '@material-ui/core/MenuItem'
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Preloader from "../../../../../../components/Preloader";
import Grid from "@material-ui/core/Grid";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker} from 'material-ui-pickers';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },

  buttonLink: {
    textDecoration: 'none'
  },

  buttons: {
    textAlign: 'center',
    margin: theme.spacing.unit,
    textDecoration: 'none',
  },

  button: {
    margin: theme.spacing.unit
  },

  inputField: {
    margin: theme.spacing.unit
  }

})

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
    const {fetchEventFormData} = this.props
    fetchEventFormData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event && nextProps.event !== this.props.event) {
      this.setState({
        editedEvent: nextProps.event,
        eventImages: nextProps.event.photos
      })
    }
  }

  updateEvent = (event) => {
    event.preventDefault()
    const {saveEvent} = this.props
    const {eventImages} = this.state

    saveEvent({...this.state.editedEvent}, eventImages).then(() => {
      this.setState({isDataSubmitted: true})
    })
  }

  handleChange = (event, propName) => {
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
      this.setState({editedEvent: {...this.state.editedEvent, [propName]: event.target.value}})
    }
  }

  onFileChange = (images) => {
    const newEventImages = images.map((file) => Object.assign(file, {
      imageUrl: URL.createObjectURL(file),
      imageKey: null
    }))

    this.setState((state) => {
      return {
        eventImages: [...state.eventImages, ...newEventImages]
      }
    })
  }

  onMainPhotoSelect = (selectedImage) => {
    const newEventImages = this.state.eventImages.map(image => {
      image.isMainImage = image === selectedImage
      return image
    })

    this.setState(() => {
      return {
        eventImages: newEventImages
      }
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

    const {classes, match, businesses, places, eventCategories, isLoading} = this.props
    const {editedEvent, eventImages, isDataSubmitted} = this.state

    const eventCategoriesValue = eventCategories.filter(category => editedEvent.categories.some(currentCategory => category.id === currentCategory.id))

    if (isDataSubmitted) {
      return <Redirect to={'/admin/events'}/>
    }

    if (isLoading || (editedEvent === emptyEvent && match.path !== '/admin/events/add-new')) {
      return <Preloader/>
    }

    const businessOptions = businesses
      .concat([{}])
      .map(business => (
        <MenuItem key={0 && business.id} value={business.id}>
          {business.title}
        </MenuItem>
      ))

    const placeOptions = places
      .concat([{}])
      .map(place => (
        <MenuItem key={0 && place.id} value={place.id}>
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
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Event name'
              fullWidth
              variant='outlined'
              value={editedEvent.title}
              onChange={(e) => this.handleChange(e, 'title')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Description'
              fullWidth
              variant='outlined'
              value={editedEvent.description}
              onChange={(e) => this.handleChange(e, 'description')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Address'
              fullWidth
              variant='outlined'
              value={editedEvent.address}
              onChange={(e) => this.handleChange(e, 'address')}
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
                onChange={(e) => this.handleChange(e, 'categories')}
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
              onChange={(e) => this.handleChange(e, 'business')}
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
              onChange={(e) => this.handleChange(e, 'place')}
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
                onChange={(e) => this.handleChange(e, 'startDate')} />
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
                onChange={(e) => this.handleChange(e, 'endDate')} />
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

        </Grid>


        <div className={classes.buttons}>
          <Button
            onClick={(e) => this.updateEvent(e)}
            variant='outlined'
            color='primary'
            className={classes.button}
          >
            Save
          </Button>
          <NavLink to={'/admin/events'} className={classes.buttonLink}>
            <Button variant='outlined' color='secondary' className={classes.button}>
              Cancel
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

EventForm.propTypes = {
  classes: PropTypes.object,
  match: PropTypes.object.isRequired,
  businesses: PropTypes.array.isRequired,
  eventCategories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  event: PropTypes.object,
  places: PropTypes.array,
  saveEvent: PropTypes.func,
  fetchEventFormData: PropTypes.func
}

const mapStateToProps = (state, props) => {
  const event = state.events.eventList.find(event => event.id.toString() === props.match.params.eventId)
  return {
    businesses: state.businesses.businessList,
    places: state.places.places,
    eventCategories: state.eventCategory.allEventCategories,
    event: event,
    isLoading: state.events.isEventFormDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveEvent: (event, images) => dispatch(eventOperations.saveEvent(event, images)),
    fetchEventFormData: () => dispatch(eventOperations.fetchEventFormData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventForm))
