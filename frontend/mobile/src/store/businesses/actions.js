import * as TYPES from './types'

export const getBusinessesByCategory = (business) => ({
  type: TYPES.GET_BUSINESSES_BY_CATEGORY,
  payload: business
})

export const getBusinessById = (business) => ({
  type: TYPES.GET_BUSINESS_BY_ID,
  payload: {currentBusiness: business}
})

export const businessIsLoading = (isLoading) => ({
  type: TYPES.BUSINESS_IS_LOADING,
  payload: isLoading
})

export const getBusinessesByPlace = businesses => ({
  type: TYPES.GET_BUSINESSES_BY_PLACE,
  payload: businesses
})