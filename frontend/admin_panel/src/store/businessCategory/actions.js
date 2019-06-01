import * as TYPES from './types'

export const getAllBusinessCategories = (businessCategories) => ({
  type: TYPES.GET_ALL_CATEGORIES,
  payload: businessCategories
})

export const isBusinessCategoryFormDataLoading = (isLoading) => ({
  type: TYPES.BUSINESS_CATEGORY_FORM_DATA_LOADING,
  payload: isLoading
})

export const isBusinessCategoryDataLoading = (isLoading) => ({
  type: TYPES.BUSINESS_CATEGORY_DATA_LOADING,
  payload: isLoading
})

export const getAllParentBusinessCategories = businessCategories => ({
  type: TYPES.GET_ALL_PARENT_CATEGORIES,
  payload: businessCategories
})
