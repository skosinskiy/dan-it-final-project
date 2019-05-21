import * as TYPES from './types'

export const isHttpRequestPending = isPending => ({
  type: TYPES.IS_HTTP_REQUEST_PENDING,
  payload: isPending
})

export const isPlaceCategoryLoading = isLoading => ({
  type: TYPES.IS_PLACE_CATEGORY_LOADING,
  payload: isLoading
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