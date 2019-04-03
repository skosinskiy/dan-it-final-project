import * as TYPES from './types'

export const getAllEventCategories = (eventCategories) => ({
  type: TYPES.GET_ALL_CATEGORIES,
  payload: eventCategories
})
