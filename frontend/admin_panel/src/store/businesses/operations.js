import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'
import {placesOperations} from '../../store/places'
import {businessCategoryOperations} from '../../store/businessCategory'

export const fetchBusinessFormData = (searchParam, page = 0, size = 5) => dispatch => {
  dispatch(ACTIONS.isBusinessFormDataLoading(true))
  Promise.all([
    dispatch(placesOperations.getAllPlaces()),
    dispatch(businessCategoryOperations.getAllBusinessCategories()),
    dispatch(getBusinessesByTitle(searchParam, page, size))
  ]).then(() => dispatch(ACTIONS.isBusinessFormDataLoading(false)))

}

export const getBusinessesByTitle = (title = '', page = 0, size = 5) => dispatch => {
  dispatch(ACTIONS.isBusinessesLoading(true))
  dispatch(ACTIONS.setSearchParam(title))
  api.get(`/api/businesses?title=${title}&page=${page}&size=${size}`).then(res => {
    dispatch(ACTIONS.getAllBusinesses(res))
    dispatch(ACTIONS.isBusinessesLoading(false))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
    dispatch(ACTIONS.isBusinessesLoading(false))
  })
}

export const deleteBusiness = (businessId, searchParam, page, size) => dispatch => {
  dispatch(ACTIONS.isBusinessesLoading(true))
  api.deleteApi(`/api/businesses/${businessId}`).then(() => dispatch(getBusinessesByTitle(searchParam, page, size)))
}

export const saveBusiness = (business, images) => dispatch => {
  dispatch(ACTIONS.isBusinessFormDataLoading(true))
  const mainImageIndex = images.findIndex(image => image.isMainImage) === -1
    ? 0
    : images.findIndex(image => image.isMainImage)

  if (business.id) {
    const imagesToUpload = images.filter(image => !image.id)
    const existingImages = images.filter(image => image.id)
    return uploadImagesToS3(imagesToUpload)
      .then(uploadedImages => createBusinessPhotos(uploadedImages, business.id)
          .then(createdPhotos => updateBusiness(existingImages, business, createdPhotos, mainImageIndex)
            .then()
          )
      )
  } else {
    return createBusiness(business)
      .then(createdBusiness => uploadImagesToS3(images)
        .then(uploadedImages => createBusinessPhotos(uploadedImages, createdBusiness.id)
          .then(createdPhotos => updateBusiness(null, createdBusiness, createdPhotos, mainImageIndex)
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

const createBusinessPhotos = (s3UploadResponse, businessId) => {
  const array = []
  s3UploadResponse.forEach(file => array.push({imageKey: file.fileKey}))
  return api.post(`/api/businesses/${businessId}/photos`, array)
}

const updateBusiness = (existingImages, business, createdPhotos, mainImageIndex) => {
  business.photos = existingImages ? existingImages.concat(createdPhotos.photos) : createdPhotos.photos
  business.mainPhoto = business.photos[mainImageIndex]
  business.photos.splice(mainImageIndex, 1)
  return api.put(`/api/businesses/${business.id}`, business)
}

const createBusiness = (business) => {
  return api.post(`/api/businesses`, business)
}
