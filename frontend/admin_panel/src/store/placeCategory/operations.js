import api from 'helpers/FetchData'
import * as ACTIONS from './actions'
import {getAllParentBusinessCategories} from "../businessCategory/operations";

export const fetchPlaceCategoriesFormData = () => dispatch => {
  dispatch(ACTIONS.isPlaceCategoriesFormDataLoading(true))
  Promise.all([
    dispatch(getAllPlaceCategories()),
    dispatch(getAllParentBusinessCategories()),
    dispatch(getAllLayoutItems())
  ]).then()
    .finally(() => dispatch(ACTIONS.isPlaceCategoriesFormDataLoading(false)))
}

export const getAllPlaceCategories = () => dispatch => {
  dispatch(ACTIONS.arePlaceCategoriesLoading(true))
  return api.get('/api/place-categories').then(res => {
    dispatch(ACTIONS.getPlacesCategories(res))
  })
    .finally(() => dispatch(ACTIONS.arePlaceCategoriesLoading(false)))
}

export const deletePlaceCategory = placeCategoryId => dispatch => {
  dispatch(ACTIONS.arePlaceCategoriesLoading(true))
  return api.deleteApi(`/api/place-categories/${placeCategoryId}`).then(() => {
    dispatch(getAllPlaceCategories())
  })
}

export const getAllLayoutItems = () => dispatch => {
  return api.get('/api/layout-items').then(res => {
    dispatch(ACTIONS.getLayoutItems(res))
  })
}

const removeDeletedImages = (category, icon) => dispatch => {
  if (!(icon && !icon.imageKey)) {
    if (!icon) {
      category.iconKey = null
    }
    return updatePlaceCategory(category).then()
  }
}

const createPlaceCategory = (category) => {
  return api.post('/api/place-categories', category)
}

const updatePlaceCategory = (category) => {
  return api.put(`/api/place-categories/${category.id}`, category)
}

const uploadFile = (file) => {
  const formData = new FormData()
  formData.append("imageFile", file)
  return api.post('/api/s3/upload/image', formData)
}

const uploadIcon = (category, icon) => dispatch => {
  if (icon && !icon.imageKey) {
    return uploadFile(icon).then(uploadResult => {
      category.iconKey = uploadResult.fileKey
      updatePlaceCategory(category).then()
    })
  }
}

const createNewCategory = (category, icon) => dispatch => {
  if (icon) {
    return createPlaceCategory(category).then(createResponse => {
      const {...createdCategory} = createResponse
      const uploadFunctions = []
      if (icon) {
        uploadFunctions.push(dispatch(uploadIcon(createdCategory, icon)) )
      }
      return Promise.all(uploadFunctions).then()
    })
  } else {
    return createPlaceCategory(category).then()
  }
}

const updateExistingCategory = (category, icon) => dispatch => {
  const uploadFunctions = []
  if (icon && !icon.imageKey) {
    uploadFunctions.push(dispatch(uploadIcon(category, icon)))
  }
  return Promise.all(uploadFunctions).then(() => dispatch(removeDeletedImages(category, icon)))

}

export const savePlaceCategory = (placeCategory, icon) => dispatch => {
  dispatch(ACTIONS.isPlaceCategoriesFormDataLoading(true))
  if (placeCategory.id) {
    return dispatch(updateExistingCategory(placeCategory, icon))
  } else {
    return dispatch(createNewCategory(placeCategory, icon))
  }
}
