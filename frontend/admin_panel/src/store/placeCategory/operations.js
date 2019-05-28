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

export const savePlaceCategory = placeCategory => dispatch => {
  dispatch(ACTIONS.isPlaceCategoriesFormDataLoading(true))
  if (placeCategory.id) {
    return api.put(`/api/place-categories/${placeCategory.id}`, placeCategory)
  } else {
    return api.post('/api/place-categories', placeCategory)
  }
}
