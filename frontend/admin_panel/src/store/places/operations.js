import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const fetchPlaceFormData = (searchParam = '', page = 0, size = 5) => dispatch => {
  dispatch(ACTIONS.isPlaceFormDataLoading(true))
  Promise.all([
    dispatch(getAllPlaces(searchParam, page, size)),
    dispatch(getPlacesCategories())
  ]).then(() => dispatch(ACTIONS.isPlaceFormDataLoading(false)))
}

export const getAllPlaces = (searchParam = '', page = 0, size = 5) => dispatch => {
  dispatch(ACTIONS.isPlacesLoading(true))
  dispatch(ACTIONS.setSearchParam(searchParam))
  return api.get(`/api/places?searchParam=${searchParam}&page=${page}&size=${size}`).then(res => {
    dispatch(ACTIONS.getAllPlaces(res))
    dispatch(ACTIONS.isPlacesLoading(false))
  })
}

export const getPlacesCategories = () => dispatch => {
  return api.get(`/api/place-categories`).then(res => {
    dispatch(ACTIONS.getPlacesCategories(res))
  })
}

export const deletePlace = (placeId, searchParam, page, size) => dispatch => {
  dispatch(ACTIONS.isPlacesLoading(true))
  api.deleteApi(`/api/places/${placeId}`).then(res => {
    dispatch(getAllPlaces(searchParam, page, size))
  })
}

export const savePlace = (place, images) => dispatch => {
  dispatch(ACTIONS.isPlaceFormDataLoading(true))
  const mainImageIndex = images.findIndex(image => image.isMainImage) === -1
    ? 0
    : images.findIndex(image => image.isMainImage)
  if (place.id) {
    const imagesToUpload = images.filter(image => !image.id)
    const existingImages = images.filter(image => image.id)
    return uploadImagesToS3(imagesToUpload)
      .then(uploadedImages => createPlacePhotos(uploadedImages, place.id)
        .then(createdPhotos => updatePlace(existingImages, place, createdPhotos, mainImageIndex)
          .then()
        )
      )
  } else {
    return createPlace(place)
      .then(createdBusiness => uploadImagesToS3(images)
        .then(uploadedImages => createPlacePhotos(uploadedImages, createdBusiness.id)
          .then(createdPhotos => updatePlace(null, createdBusiness, createdPhotos, mainImageIndex)
            .then()
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

const updatePlace = (existingImages, place, createdPhotos, mainImageIndex) => {
  place.photos = existingImages ? existingImages.concat(createdPhotos.photos) : createdPhotos.photos
  place.mainPhoto = place.photos[mainImageIndex]
  place.photos.splice(mainImageIndex, 1)
  return api.put(`/api/places/${place.id}`, place)
}

const createPlace = (place) => {
  return api.post(`/api/places`, place)
}
