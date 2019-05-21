import * as TYPES from './types'

export const getAllEventCategories = (eventCategories) => ({
  type: TYPES.GET_ALL_CATEGORIES,
  payload: eventCategories
})

export const isEventCategoriesLoading = (isLoading) => ({
  type: TYPES.EVENT_CATEGORIES_IS_LOADING,
  payload: isLoading
})
