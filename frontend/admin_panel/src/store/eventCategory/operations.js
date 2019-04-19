import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllEventCategories = () => dispatch => {
  return api.get('/api/event-categories').then(res => {
    dispatch(ACTIONS.getAllEventCategories(res))
  })
}

export const deleteEventCategory = (categoryId) => dispatch => {
  api.deleteApi(`/api/event-categories/${categoryId}`).then(() => {
    dispatch(getAllEventCategories())
  })
}

const uploadFile = (file) => {
  const formData = new FormData()
  formData.append("imageFile", file)
  return api.post('/api/s3/upload/image', formData)
}

const createBusinessCategory = (category) => {
  return api.post('/api/event-categories', category)
}

const updateBusinessCategory = (category) => {
  return api.put(`/api/event-categories/${category.id}`, category)
}

export const saveCategory = (category, file) => dispatch => {
  if (category.id) {
    if (file && !file.imageKey) {
      uploadFile(file).then(uploadResult => {
        category.imageKey = uploadResult.fileKey
        updateBusinessCategory(category).then( () => dispatch( getAllEventCategories()) )
      })
    } else {
      if (!file) {
        category.imageKey = null
      }
      updateBusinessCategory(category).then( () => dispatch(getAllEventCategories()) )
    }
  } else {
    if (file) {
      createBusinessCategory(category).then(createResponse => {
        uploadFile(file).then(uploadResult => {
          const {...createdCategory} = createResponse
          createdCategory.imageKey = uploadResult.fileKey
          updateBusinessCategory(createdCategory).then( () => dispatch(getAllEventCategories()))
        })
      })
    } else {
      createBusinessCategory(category).then( () => dispatch(getAllEventCategories()) )
    }
  }
}
