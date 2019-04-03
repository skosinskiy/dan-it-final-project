import * as TYPES from './types'

export const getBusinessesRequest = () => ({
  type: TYPES.BUSINESS_REQUEST
})

export const getBusinessesByTitle = ({business}) => ({
  type: TYPES.GET_BUSINESSES_BY_TITLE,
  payload: {
    business
    // page,
    // totalElements,
    // title
  }
})

export const getBusinessesError = error => ({
  type: TYPES.BUSINESS_ERROR,
  payload: error
})
