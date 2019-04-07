import * as TYPES from './types'

export const isLoading = isLoading => ({
  type: TYPES.IS_LOADING,
  payload: isLoading
})

export const updatePlaceCategories = placePategories => ({
  type: TYPES.UPDATE_PLACE_CATEGORIES,
  payload: placePategories
})

export const updateDeletedPlaceCategoryIds = deletedIds => ({
  type: TYPES.UPDATE_DETETED_PLACE_CATEGORY_IDS,
  payload: deletedIds
})