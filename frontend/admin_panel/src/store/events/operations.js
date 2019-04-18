import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'
import {getAllBusinesses} from "../businesses/operations";
import {getAllEventCategories} from "../eventCategory/actions";
import {getAllPlaces} from "../places/actions";

export const fetchEventFormData = () => dispatch => {
  // dispatch(startLoading)
  Promise.all([
    dispatch(getAllEvents()),
    dispatch(getAllEventCategories()),
    dispatch(getAllBusinesses()),
    // dispatch(getAllPlaces())
  ])
    .then(alert("fetched"))
}

export const getAllEvents = () => dispatch => {
  alert("allevents")
  api.get(`/api/events`).then(res => {
    dispatch(ACTIONS.getAllEvents({eventList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getEventsError(err))
  })
}

export const getEventsByPlaceID = (placeId) => dispatch => {
  // dispatch(ACTIONS.getEventsRequest())
  api.get(`/api/events?place=${placeId}`).then(res => {
    dispatch(ACTIONS.getEventsByPlaceID({eventList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getEventsError(err))
  })
}

export const getEventsByTitle = (title) => dispatch => {
  api.get(`/api/events?title=${title}`).then(res => {
    dispatch(ACTIONS.getAllEvents({eventList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getEventsError(err))
  })
}

export const deleteBusiness = (eventId) => dispatch => {
  api.deleteApi(`/api/events/${eventId}`).then(res => {
    api.get(`/api/events`).then(res => {
      dispatch(ACTIONS.getAllEvents({eventList: res}))
    }).catch(err => {
      dispatch(ACTIONS.getEventsError(err))
    })
  })
}

export const saveNewEvent = (event, images) => dispatch => {
  if (event.id) {
    const imagesToUpload = images.filter(image => !image.id)
    const existingImages = images.filter(image => image.id)
    uploadImagesToS3(imagesToUpload)
      .then(uploadedImages => createBusinessPhotos(uploadedImages, event.id)
          .then(createdPhotos => updateBusiness(existingImages, event, createdPhotos)
            .then(() => dispatch(getAllEvents()))
          )
      )
  } else {
    createBusiness(event)
      .then(createdBusiness => uploadImagesToS3(images)
        .then(uploadedImages => createBusinessPhotos(uploadedImages, createdBusiness.id)
          .then(createdPhotos => updateBusiness(null, createdBusiness, createdPhotos)
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

const createBusinessPhotos = (s3UploadResponse, eventId) => {
  const array = []
  s3UploadResponse.forEach(file => array.push({imageKey: file.fileKey}))
  return api.post(`/api/events/${eventId}/photos`, array)
}

const updateBusiness = (existingImages, event, createdPhotos) => {
  event.photos = existingImages ? existingImages.concat(createdPhotos.photos) : createdPhotos.photos
  return api.put(`/api/events/${event.id}`, event)
}

const createBusiness = (event) => {
  return api.post(`/api/events`, event)
}
