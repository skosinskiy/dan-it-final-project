import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getPlaces = () => dispatch => {
  api.get(`/api/places`).then(res => {
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

// export const savePlace = (placeId, place) => dispatch => {
//   if (placeId) {
//     api.put(`/api/places/${placeId}`, place).then(res => {
//       api.get(`/api/places`).then(res => {
//         dispatch(ACTIONS.getPlacesCategories(res))
//       })
//     })
//   } else {
//     api.post(`/api/places`, place).then(res => {
//       api.get(`/api/places`).then(res => {
//         dispatch(ACTIONS.getAllPlaces(res))
//       })
//       return res
//     })
//   }
// }

export const savePlace = (place, images) => dispatch => {
  if (place.id) {
    const imagesToUpload = images.filter(image => !image.id)
    const existingImages = images.filter(image => image.id)
    uploadImagesToS3(imagesToUpload)
      .then(uploadedImages => createBusinessPhotos(uploadedImages, place.id)
        .then(createdPhotos => updateBusiness(existingImages, place, createdPhotos)
          .then(() => dispatch(getPlaces()))
        )
      )
  } else {
    createBusiness(place)
      .then(createdBusiness => uploadImagesToS3(images)
        .then(uploadedImages => createBusinessPhotos(uploadedImages, createdBusiness.id)
          .then(createdPhotos => updateBusiness(null, createdBusiness, createdPhotos)
            .then(() => dispatch(getPlaces()))
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

const createBusinessPhotos = (s3UploadResponse, placeId) => {
  const array = []
  s3UploadResponse.forEach(file => array.push({imageKey: file.fileKey}))
  return api.post(`/api/places/${placeId}/photos`, array)
}

const updateBusiness = (existingImages, place, createdPhotos) => {
  place.photos = existingImages ? existingImages.concat(createdPhotos.photos) : createdPhotos.photos
  return api.put(`/api/places/${place.id}`, place)
}

const createBusiness = (place) => {
  return api.post(`/api/places`, place)
}
