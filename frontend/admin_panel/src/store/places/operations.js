import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllPlaces = (page, size) => dispatch => {
  return api.get(`/api/places?page=${page}&size=${size}`).then(res => {
    dispatch(ACTIONS.getAllPlaces(res))
  })
}

export const getPlacesCategories = () => dispatch => {
  api.get(`/api/place-categories`).then(res => {
    dispatch(ACTIONS.getPlacesCategories(res))
  })
}

export const deletePlace = (placeId) => dispatch => {
  api.deleteApi(`/api/places/${placeId}`).then(res => {
    api.get(`/api/places`).then(res => {
      dispatch(ACTIONS.getAllPlaces(res))
    })
  })
}

export const savePlace = (place, images) => dispatch => {
  if (place.id) {
    const imagesToUpload = images.filter(image => !image.id)
    const existingImages = images.filter(image => image.id)
    uploadImagesToS3(imagesToUpload)
      .then(uploadedImages => createPlacePhotos(uploadedImages, place.id)
        .then(createdPhotos => updatePlace(existingImages, place, createdPhotos)
          .then(() => dispatch(getAllPlaces()))
        )
      )
  } else {
    createPlace(place)
      .then(createdBusiness => uploadImagesToS3(images)
        .then(uploadedImages => createPlacePhotos(uploadedImages, createdBusiness.id)
          .then(createdPhotos => updatePlace(null, createdBusiness, createdPhotos)
            .then(() => dispatch(getAllPlaces()))
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

const createPlacePhotos = (s3UploadResponse, placeId) => {
  const array = []
  s3UploadResponse.forEach(file => array.push({imageKey: file.fileKey}))
  return api.post(`/api/places/${placeId}/photos`, array)
}

const updatePlace = (existingImages, place, createdPhotos) => {
  place.photos = existingImages ? existingImages.concat(createdPhotos.photos) : createdPhotos.photos
  return api.put(`/api/places/${place.id}`, place)
}

const createPlace = (place) => {
  return api.post(`/api/places`, place)
}
