import * as TYPES from './types'

export const getBusinessesRequest = () => ({
  type: TYPES.BUSINESS_REQUEST
})

export const getAllBusinesses = response => ({
  type: TYPES.GET_ALL_BUSINESSES,
  payload: response
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

export const isBusinessesLoading = isLoading => ({
  type: TYPES.IS_BUSINESSES_LOADING,
  payload: isLoading
})

export const isBusinessFormDataLoading = isLoading => ({
  type: TYPES.IS_BUSINESS_FORM_DATA_LOADING,
  payload: isLoading
})
