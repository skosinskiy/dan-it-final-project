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

export const saveCategory = (category, file) => dispatch => {
  if (category.id) {
    if (file) {
      const formData = new FormData()
      formData.append("imageFile", file)
      api.post('/api/s3/upload/image', formData).then(uploadResult => {
        category.imageKey = uploadResult.fileKey
        api.put(`/api/business-categories/${category.id}`, category).then(() => {
          dispatch(getAllBusinessCategories())
        })
      })
    } else {
      category.imageKey = null
      api.put(`/api/business-categories/${category.id}`, category).then(() => {
        dispatch(getAllBusinessCategories())
      })
    }
  } else {
    if (file) {
      api.post('/api/business-categories', category).then(createResponse => {
        const formData = new FormData()
        formData.append("imageFile", file)
        api.post('/api/s3/upload/image', formData).then(uploadResult => {
          const {...createdCategory} = createResponse
          createdCategory.imageKey = uploadResult.fileKey
          api.put(`/api/business-categories/${createdCategory.id}`, createdCategory).then(() => {
            dispatch(getAllBusinessCategories())
          })
        })
      })
    } else {
      api.post('/api/business-categories', category).then(res => {
        dispatch(getAllBusinessCategories())
      })
    }
  }
}
