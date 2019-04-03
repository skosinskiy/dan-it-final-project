import * as TYPES from './types'

export const getBusinessesRequest = () => ({
  type: TYPES.BUSINESS_REQUEST
})

export const getAllBusinesses = ({businesses}) => ({
  type: TYPES.GET_ALL_BUSINESSES,
  payload: {
    businesses
    // page,
    // totalElements,
  }
})

export const getBusinessesByPlaceID = ({businesses}) => ({
  type: TYPES.GET_BUSINESSES_BY_PLACE_ID,
  payload: {
    businesses
    // page,
    // totalElements,
  }
})

export const getBusinessesError = error => ({
  type: TYPES.BUSINESS_ERROR,
  payload: error
})
