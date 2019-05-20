import * as TYPES from './types'

export const arePlaceCategoriesLoading = areLoading => ({
  type: TYPES.ARE_PLACE_CATEGORIES_LOADING,
  payload: areLoading
})

export const updatePlaceCategories = placeCategories => ({
  type: TYPES.UPDATE_PLACE_CATEGORIES,
  payload: placeCategories
})

export const updateBusinessCategories = parentBusinessCategories => ({
  type: TYPES.UPDATE_BUSINESS_CATEGORIES,
  payload: parentBusinessCategories
})

export const updateLayoutItems = parentLayoutItems => ({
  type: TYPES.UPDATE_LAYOUT_ITEMS,
  payload: parentLayoutItems
})

export const updateEditedPlaceCategory = placeCategory => ({
  type: TYPES.UPDATE_EDITED_PLACE_CATEGORY,
  payload: placeCategory
})