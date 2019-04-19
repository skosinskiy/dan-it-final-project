import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'
import {getAllBusinesses} from "../businesses/operations";
import {getAllEventCategories} from "../eventCategory/operations";
import {getPlaces} from "../places/operations";

export const fetchEventFormData = () => dispatch => {
  dispatch(ACTIONS.isEventFormDataLoading(true))
  Promise.all([
    dispatch(getAllEvents()),
    dispatch(getAllEventCategories()),
    dispatch(getAllBusinesses()),
    dispatch(getPlaces())
  ]).then(() => dispatch(ACTIONS.isEventFormDataLoading(false)))
}

export const getAllEvents = () => dispatch => {
  dispatch(ACTIONS.isEventDataLoading(true))
  return api.get(`/api/events`).then(res => {
    dispatch(ACTIONS.getAllEvents({eventList: res}))
    dispatch(ACTIONS.isEventDataLoading(false))
  }).catch(err => {
    dispatch(ACTIONS.getEventsError(err))
  })
}

export const getEventsByParam = (param) => dispatch => {
  api.get(`/api/events?searchParam=${param}`).then(res => {
    dispatch(ACTIONS.getEventsByParam({eventList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getEventsError(err))
  })
}

export const deleteEvent = (eventId) => dispatch => {
  dispatch(ACTIONS.isEventDataLoading(true))
  api.deleteApi(`/api/events/${eventId}`).then(res => {
    api.get(`/api/events`).then(res => {
      dispatch(ACTIONS.getAllEvents({eventList: res}))
      dispatch(ACTIONS.isEventDataLoading(false))
    }).catch(err => {
      dispatch(ACTIONS.getEventsError(err))
    })
  })
}

export const saveEvent = (event, images) => dispatch => {
  dispatch(ACTIONS.isEventFormDataLoading(true))
  if (event.id) {
    const imagesToUpload = images.filter(image => !image.id)
    const existingImages = images.filter(image => image.id)
    return uploadImagesToS3(imagesToUpload)
      .then(uploadedImages => createEventPhotos(uploadedImages, event.id)
          .then(createdPhotos => updateEvent(existingImages, event, createdPhotos)
            .then(() => dispatch(getAllEvents()))
          )
      )
  } else {
    return createEvent(event)
      .then(createdBusiness => uploadImagesToS3(images)
        .then(uploadedImages => createEventPhotos(uploadedImages, createdBusiness.id)
          .then(createdPhotos => updateEvent(null, createdBusiness, createdPhotos)
            .then(() => dispatch(getAllEvents()))
          )
        )
      )
  }
}

const uploadImagesToS3 = (imagesToUpload) => {
  return Promise.all(
    imagesToUpload.map(image => {
      const formData = new FormData()
      formData.append("imageFile", image)
      return api.post('/api/s3/upload/image', formData)
    }))
}

const createEventPhotos = (s3UploadResponse, eventId) => {
  const array = []
  s3UploadResponse.forEach(file => array.push({imageKey: file.fileKey}))
  return api.post(`/api/events/${eventId}/photos`, array)
}

const updateEvent = (existingImages, event, createdPhotos) => {
  event.photos = existingImages ? existingImages.concat(createdPhotos.photos) : createdPhotos.photos
  return api.put(`/api/events/${event.id}`, event)
}

const createEvent = (event) => {
  return api.post(`/api/events`, event)
}
