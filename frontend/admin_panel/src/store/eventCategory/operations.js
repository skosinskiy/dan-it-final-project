import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllEventCategories = () => dispatch => {
  dispatch(ACTIONS.isEventCategoriesLoading(true))
  return api.get('/api/event-categories').then(res => {
    dispatch(ACTIONS.getAllEventCategories(res))
    dispatch(ACTIONS.isEventCategoriesLoading(false))
  })
}

export const deleteEventCategory = (categoryId) => dispatch => {
  dispatch(ACTIONS.isEventCategoriesLoading(true))
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
  dispatch(ACTIONS.isEventCategoriesLoading(true))
  if (category.id) {
    if (file && !file.imageKey) {
      return uploadFile(file).then(uploadResult => {
        category.imageKey = uploadResult.fileKey
        updateBusinessCategory(category)
      })
    } else {
      if (!file) {
        category.imageKey = null
      }
      return updateBusinessCategory(category)
    }
  } else {
    if (file) {
      return createBusinessCategory(category).then(createResponse => {
        uploadFile(file).then(uploadResult => {
          const {...createdCategory} = createResponse
          createdCategory.imageKey = uploadResult.fileKey
          updateBusinessCategory(createdCategory)
        })
      })
    } else {
      return createBusinessCategory(category)
    }
  }
}
