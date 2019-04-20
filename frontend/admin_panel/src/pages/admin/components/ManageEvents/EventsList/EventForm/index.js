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
  constructor (props) {
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

  componentWillReceiveProps (nextProps) {
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
    if (propName === 'business'){
      this.setState({editedEvent:{...this.state.editedEvent, business: businesses.find(business => business.id === event.target.value)}})
    } else if (propName === 'place') {
      this.setState({editedEvent:{...this.state.editedEvent, place: places.find(place => place.id === event.target.value)}})
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

  render () {

    const {classes, match, businesses, places, eventCategories, isLoading} = this.props
    const {editedEvent, eventImages, isDataSubmitted} = this.state

    const eventCategoriesValue = eventCategories.filter(category => editedEvent.categories.some(currentCategory => category.id === currentCategory.id))

    console.log(editedEvent)

    if (isDataSubmitted) {
      return <Redirect to={'/admin/events'} />
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
      <div className={classes.container}>
        <TextField
          label='Event name'
          className={classes.inputField}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedEvent.title}
          onChange={(e) => this.handleChange(e, 'title')}
        />
        <TextField
          label='Description'
          className={classes.inputField}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedEvent.description}
          onChange={(e) => this.handleChange(e, 'description')}
        />
        <TextField
          label='Address'
          className={classes.inputField}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedEvent.address}
          onChange={(e) => this.handleChange(e, 'address')}
        />

        <FormControl variant="outlined" className={classes.inputField}>
          <InputLabel
            htmlFor="outlined"
          >
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
        <TextField
          select
          label='Business'
          className={classes.inputField}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedEvent.business ? editedEvent.business.id : ''}
          onChange={(e) => this.handleChange(e, 'business')}
        >
          {businessOptions}
        </TextField>
        <TextField
          select
          label='Place'
          className={classes.inputField}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedEvent.place ? editedEvent.place.id : ''}
          onChange={(e) => this.handleChange(e, 'place')}
        >
          {placeOptions}
        </TextField>
        <TextField
          variant='outlined'
          label="Start date"
          type="datetime-local"
          className={classes.textField}
          value={editedEvent.startDate && editedEvent.startDate.substring(0, 16)}
          onChange={(e) => this.handleChange(e, 'startDate')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          variant='outlined'
          label="End date"
          type="datetime-local"
          className={classes.textField}
          value={editedEvent.endDate && editedEvent.endDate.substring(0, 16)}
          onChange={(e) => this.handleChange(e, 'endDate')}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className={classes.textField}>
          <ImageUploader
            images={eventImages}
            onFileChange={this.onFileChange}
            onReset={this.onImageReset}
            onMainPhotoSelect={this.onMainPhotoSelect}
            multiple={true}
          />
        </div>

        <div className={classes.buttons}>
          <Button
            onClick={(e) => this.updateEvent(e)}
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Save
          </Button>
          <NavLink to={'/admin/events'} className={classes.buttonLink}>
            <Button variant='contained' color='secondary' className={classes.button}>
              Exit
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
