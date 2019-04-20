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

export const saveCategory = (category, image, icon) => dispatch => {
  if (category.id) {
    if ((image && !image.imageKey)) {
      uploadFile(image).then(uploadResult => {
        category.imageKey = uploadResult.fileKey
        updateBusinessCategory(category).then( () => dispatch( getAllBusinessCategories()) )
      })
    }
    if ((icon && !icon.imageKey)) {
      uploadFile(icon).then(uploadResult => {
        category.iconKey = uploadResult.fileKey
        updateBusinessCategory(category).then( () => dispatch( getAllBusinessCategories()) )
      })
    }
    if (!(image && !image.imageKey) && !(icon && !icon.imageKey)) {
      if (!image) {
        category.imageKey = null
      }
      if (!icon) {
        category.iconKey = null
      }
      updateBusinessCategory(category).then( () => dispatch(getAllBusinessCategories()) )
    }
  } else {
    if (image || icon) {
      createBusinessCategory(category).then(createResponse => {
        const {...createdCategory} = createResponse
        if (image) {
          uploadFile(image).then(uploadResult => {
            createdCategory.imageKey = uploadResult.fileKey
            updateBusinessCategory(createdCategory).then( () => dispatch(getAllBusinessCategories()))
          })
        }
        if (icon) {
          uploadFile(icon).then(uploadResult => {
            createdCategory.iconKey = uploadResult.fileKey
            updateBusinessCategory(createdCategory).then( () => dispatch(getAllBusinessCategories()))
          })
        }

      })
    } else {
      createBusinessCategory(category).then( () => dispatch(getAllBusinessCategories()) )
    }
  }
}
