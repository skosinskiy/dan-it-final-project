import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllBusinesses = (page = 0, size = 5) => dispatch => {
  dispatch(ACTIONS.isBusinessesLoading(true))
  return api.get(`/api/businesses?page=${page}&size=${size}`).then(res => {
    dispatch(ACTIONS.getAllBusinesses(res))
    dispatch(ACTIONS.isBusinessesLoading(false))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
    dispatch(ACTIONS.isBusinessesLoading(false))
  })
}

export const getBusinessesByPlaceID = (placeId) => dispatch => {
  api.get(`/api/businesses?placeId=${placeId}`).then(res => {
    dispatch(ACTIONS.getBusinessesByPlaceID({businessList: res.content}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

export const getBusinessesByTitle = (title) => dispatch => {
  api.get(`/api/businesses?title=${title}`).then(res => {
    dispatch(ACTIONS.getAllBusinesses(res))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

export const deleteBusiness = (businessId) => dispatch => {
  dispatch(ACTIONS.isBusinessesLoading(true))
  api.deleteApi(`/api/businesses/${businessId}`).then(res => {
      dispatch(getAllBusinesses())
  })
}

export const saveBusiness = (business, images) => dispatch => {
  dispatch(ACTIONS.isBusinessesLoading(true))
  if (business.id) {
    const imagesToUpload = images.filter(image => !image.id)
    const existingImages = images.filter(image => image.id)
    return uploadImagesToS3(imagesToUpload)
      .then(uploadedImages => createBusinessPhotos(uploadedImages, business.id)
          .then(createdPhotos => updateBusiness(existingImages, business, createdPhotos)
            .then(() => dispatch(getAllBusinesses()))
          )
      )
  } else {
    return createBusiness(business)
      .then(createdBusiness => uploadImagesToS3(images)
        .then(uploadedImages => createBusinessPhotos(uploadedImages, createdBusiness.id)
          .then(createdPhotos => updateBusiness(null, createdBusiness, createdPhotos)
            .then(() => dispatch(getAllBusinesses()))
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

const createBusinessPhotos = (s3UploadResponse, businessId) => {
  const array = []
  s3UploadResponse.forEach(file => array.push({imageKey: file.fileKey}))
  return api.post(`/api/businesses/${businessId}/photos`, array)
}

const updateBusiness = (existingImages, business, createdPhotos) => {
  business.photos = existingImages ? existingImages.concat(createdPhotos.photos) : createdPhotos.photos
  return api.put(`/api/businesses/${business.id}`, business)
}

const createBusiness = (business) => {
  return api.post(`/api/businesses`, business)
}
