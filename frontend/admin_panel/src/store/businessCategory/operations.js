import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllBusinessCategories = () => dispatch => {
  api.get('/api/business-categories').then(res => {
    dispatch(ACTIONS.getAllBusinessCategories(res))
  })
}

export const deleteBusinessCategory = (categoryId) => dispatch => {
  api.deleteApi(`/api/business-categories/${categoryId}`).then(() => {
    dispatch(getAllBusinessCategories())
  })
}

const uploadFile = (file) => {
  const formData = new FormData()
  formData.append("imageFile", file)
  return api.post('/api/s3/upload/image', formData)
}

const createBusinessCategory = (category) => {
  return api.post('/api/business-categories', category)
}

const updateBusinessCategory = (category) => {
  return api.put(`/api/business-categories/${category.id}`, category)
}

export const saveCategory = (category, file) => dispatch => {
  if (category.id) {
    if (file && !file.imageKey) {
      uploadFile(file).then(uploadResult => {
        category.imageKey = uploadResult.fileKey
        updateBusinessCategory(category).then( () => dispatch( getAllBusinessCategories()) )
      })
    } else {
      if (!file) {
        category.imageKey = null
      }
      updateBusinessCategory(category).then( () => dispatch(getAllBusinessCategories()) )
    }
  } else {
    if (file) {
      createBusinessCategory(category).then(createResponse => {
        uploadFile(file).then(uploadResult => {
          const {...createdCategory} = createResponse
          createdCategory.imageKey = uploadResult.fileKey
          updateBusinessCategory(createdCategory).then( () => dispatch(getAllBusinessCategories()))
        })
      })
    } else {
      createBusinessCategory(category).then( () => dispatch(getAllBusinessCategories()) )
    }
  }
}