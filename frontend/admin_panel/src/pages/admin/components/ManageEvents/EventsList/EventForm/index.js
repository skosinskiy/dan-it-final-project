import React, {Component} from 'react'
import {toastr} from 'react-redux-toastr'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {placesOperations} from '../../../../../../store/places'
import {eventOperations} from "../../../../../../store/events";
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

const emptyEvent = {
  title: "",
  description: "",
  address: "",
  business: null,
  place: null
}

class EventForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editedEvent: props.event !== undefined ? props.event : emptyEvent,
      eventImages: props.event !== undefined ? props.event.photos : []
    }

  }

  componentDidMount() {
    const {getAllEvents} = this.props
    getAllEvents()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.event && nextProps.event !== this.props.event) {
      this.setState({editedEvent: nextProps.event})
    }
  }

  saveEvent = () => {
    const {saveNewEvent} = this.props
    const {eventImages} = this.state

    saveNewEvent({...this.state.editedEvent}, eventImages)
  }

  handleChange = (event, propName) => {
    if (propName === 'place'){
      this.setState({place: event.target.value})
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
    console.log(this.state)
    const {classes} = this.props
    const {editedEvent, eventImages} = this.state
    return (
      <div className={classes.container}>
        <TextField
          label='Event name'
          style={{margin: 8}}
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
          style={{margin: 8}}
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
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedEvent.address}
          onChange={(e) => this.handleChange(e, 'address')}
        />
        <TextField
          label='Business'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedEvent.business && editedEvent.business.title}
          onChange={(e) => this.handleChange(e, 'business')}
        />
        <TextField
          label='Place'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedEvent.place && editedEvent.place.title}
          onChange={(e) => this.handleChange(e, 'place')}
        />

        <ImageUploader  images={eventImages}
                        onFileChange={this.onFileChange}
                        onReset={this.onImageReset}
                        onMainPhotoSelect={this.onMainPhotoSelect} />

        <div className={classes.buttons}>
          <NavLink to={'/admin/events'} className={classes.buttonLink}>
            <Button
              onClick={this.saveEvent}
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Save
            </Button>
          </NavLink>
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
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  places: PropTypes.object.isRequired,
  saveNewEvent: PropTypes.func.isRequired,
  getPlaces: PropTypes.func.isRequired,
  getAllEvents: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const event = state.events.eventList.find(event => event.id.toString() === props.match.params.eventId)
  return {
    event: event
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEvents: () => dispatch(eventOperations.getAllEvents()),
    saveNewEvent: (event, images) => dispatch(eventOperations.saveNewEvent(event, images)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventForm))
