import * as TYPES from './types'

export const isLoading = isLoading => ({
  type: TYPES.IS_LOADING,
  payload: isLoading
})

export const updatePlaceCategories = placePategories => ({
  type: TYPES.UPDATE_PLACE_CATEGORIES,
  payload: placePategories
})

export const updateChanged = changed => ({
  type: TYPES.UPDATE_CHANGED,
  payload: changed
})
