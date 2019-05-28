import * as TYPES from './types'

export const getPlacesCategories = placeCategories => ({
  type: TYPES.GET_PLACE_CATEGORIES,
  payload: placeCategories
})

export const arePlaceCategoriesLoading = areLoading => ({
  type: TYPES.ARE_PLACE_CATEGORIES_LOADING,
  payload: areLoading
})

export const isPlaceCategoriesFormDataLoading = areLoading => ({
  type: TYPES.IS_PLACE_CATEGORIES_FORM_DATA_LOADING,
  payload: areLoading
})

export const getLayoutItems = items => ({
  type: TYPES.GET_LAYOUT_ITEMS,
  payload: items
})
