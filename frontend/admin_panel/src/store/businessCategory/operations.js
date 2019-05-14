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
  uploadFile(image).then(uploadResult => {
    category.imageKey = uploadResult.fileKey
    updateBusinessCategory(category).then( () => dispatch( getAllBusinessCategories()) )
  })
}

const uploadIcon = (category, icon) => dispatch => {
  if (icon && !icon.imageKey) {
    uploadFile(icon).then(uploadResult => {
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
    updateBusinessCategory(category).then( () => dispatch(getAllBusinessCategories()) )
  }
}

const updateExistingCategory = (category, image, icon) => dispatch => {
  if (image && !image.imageKey) {
    dispatch(uploadImage(category, image))
  }
  if (icon && !icon.imageKey) {
    dispatch(uploadIcon(category, icon))
  }
  dispatch(removeDeletedImages(category, image, icon))
}

const createNewCategory = (category, image, icon) => dispatch => {
  if (image || icon) {
    createBusinessCategory(category).then(createResponse => {
      const {...createdCategory} = createResponse
      if (image) {
        dispatch(uploadImage(createdCategory, image))
      }
      if (icon) {
        dispatch(uploadIcon(createdCategory, icon))
      }
    })
  } else {
    createBusinessCategory(category).then( () => dispatch(getAllBusinessCategories()) )
  }
}

export const saveCategory = (category, image, icon) => dispatch => {
  dispatch(ACTIONS.isBusinessCategoryDataLoading(true))
  if (category.id) {
    dispatch(updateExistingCategory(category, image, icon))
  } else {
    dispatch(createNewCategory(category, image, icon))
  }
}
