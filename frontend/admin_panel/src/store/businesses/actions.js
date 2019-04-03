import * as TYPES from './types'

export const getBusinessesRequest = () => ({
  type: TYPES.BUSINESS_REQUEST
})

export const getBusinessesByPlaceID = ({businesses}) => ({
  type: TYPES.GET_BUSINESSES_BY_PLACE_ID,
  payload: {
    businesses
    // page,
    // totalElements,
    // title
  }
})

export const getBusinessesError = error => ({
  type: TYPES.BUSINESS_ERROR,
  payload: error
})
