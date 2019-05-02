import * as TYPES from './types'

export const getBusinessesRequest = () => ({
  type: TYPES.BUSINESS_REQUEST
})

export const getAllBusinesses = ({businessList}) => ({
  type: TYPES.GET_ALL_BUSINESSES,
  payload: {
    businessList
  }
})
export const getBusinessByAmount = ({businessList, totalItems, currentItems}) => ({
  type: TYPES.GET_BUSINESSES_BY_AMOUNT,
  payload: {
    businessList,
    totalItems,
    currentItems
  }
})

export const getBusinessesByID = ({businessItem}) => ({
  type: TYPES.GET_ALL_BUSINESS_BY_ID,
  payload: {
    businessItem
  }
})

export const getBusinessesByPlaceID = ({businessList}) => ({
  type: TYPES.GET_BUSINESSES_BY_PLACE_ID,
  payload: {
    businessList
  }
})

export const getBusinessesError = error => ({
  type: TYPES.BUSINESS_ERROR,
  payload: error
})

export const getAllBusinessesByCategory = ({businesses}) => ({
  type: TYPES.GET_ALL_BUSINESS_BY_CATEGORY,
  payload: {businessesByCategory: businesses}
})
