import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllBusinessCategories = () => dispatch => {
  dispatch(ACTIONS.isBusinessCategoryDataLoading(true))
  dispatch(ACTIONS.isBusinessCategoryFormDataLoading(true))
  return api.get('/api/business-categories').then(res => {
    dispatch(ACTIONS.getAllBusinessCategories(res))
    dispatch(ACTIONS.isBusinessCategoryDataLoading(false))
    dispatch(ACTIONS.isBusinessCategoryFormDataLoading(false))
  })
}

export const deleteBusinessCategory = (categoryId) => dispatch => {
  dispatch(ACTIONS.isBusinessCategoryDataLoading(true))
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

const uploadImage = (category, image) => dispatch => {
  return uploadFile(image).then(uploadResult => {
    category.imageKey = uploadResult.fileKey
    updateBusinessCategory(category).then( () => dispatch( getAllBusinessCategories()) )
  })
}

const uploadIcon = (category, icon) => dispatch => {
  if (icon && !icon.imageKey) {
    return uploadFile(icon).then(uploadResult => {
      category.iconKey = uploadResult.fileKey
      updateBusinessCategory(category).then( () => dispatch( getAllBusinessCategories()) )
    })
  }
}

const removeDeletedImages = (category, image, icon) => dispatch => {
  if (!(image && !image.imageKey) || !(icon && !icon.imageKey)) {
    if (!image) {
      category.imageKey = null
    }
    if (!icon) {
      category.iconKey = null
    }
    return updateBusinessCategory(category).then( () => dispatch(getAllBusinessCategories()) )
  }
}

const updateExistingCategory = (category, image, icon) => dispatch => {
  const uploadFunctions = []
  if (image && !image.imageKey) {
    uploadFunctions.push(dispatch(uploadImage(category, image)))
  }
  if (icon && !icon.imageKey) {
    uploadFunctions.push(dispatch(uploadIcon(category, icon)))
  }

  return Promise.all(uploadFunctions).then(() => dispatch(removeDeletedImages(category, image, icon)))
}

const createNewCategory = (category, image, icon) => dispatch => {
  if (image || icon) {
    return createBusinessCategory(category).then(createResponse => {
      const {...createdCategory} = createResponse
      const uploadFunctions = []
      if (image) {
        uploadFunctions.push(dispatch(uploadImage(createdCategory, image)) )
      }
      if (icon) {
        uploadFunctions.push(dispatch(uploadIcon(createdCategory, icon)) )
      }
      return Promise.all(uploadFunctions).then()
    })
  } else {
    return createBusinessCategory(category).then( () => dispatch(getAllBusinessCategories()) )
  }
}

export const saveCategory = (category, image, icon) => dispatch => {
  dispatch(ACTIONS.isBusinessCategoryFormDataLoading(true))
  if (category.id) {
    return dispatch(updateExistingCategory(category, image, icon))
  } else {
    return dispatch(createNewCategory(category, image, icon))
  }
}
