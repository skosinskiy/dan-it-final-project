import * as TYPES from './types'

export const getAllBusinessCategories = (businessCategories) => ({
  type: TYPES.GET_ALL_CATEGORIES,
  payload: businessCategories
})
