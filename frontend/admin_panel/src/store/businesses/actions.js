import * as TYPES from './types'

export const getBusinessesRequest = () => ({
  type: TYPES.BUSINESS_REQUEST
})

export const getAllBusinesses = ({businessList}) => ({
  type: TYPES.GET_ALL_BUSINESSES,
  payload: {
    businessList
    // page,
    // totalElements,
  }
})

export const getBusinessesByPlaceID = ({businessList}) => ({
  type: TYPES.GET_BUSINESSES_BY_PLACE_ID,
  payload: {
    businessList
    // page,
    // totalElements,
  }
})

export const getBusinessesError = error => ({
  type: TYPES.BUSINESS_ERROR,
  payload: error
})
