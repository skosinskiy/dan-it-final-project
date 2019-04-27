import * as TYPES from './types'

const initialState = {
  businessList: [],
  businessesByCategory: [],
  isLoaded: false,
  isLoading: false,
  error: null
}

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESSES_BY_PLACE_ID:
      return {
        ...state,
        businessList: action.payload.businessList
      }
    case TYPES.GET_ALL_BUSINESSES:
      return {
        ...state,
        businessList: action.payload.businessList
      }
    case TYPES.GET_ALL_BUSINESS_BY_ID:
      return {
        ...state,
        businessItem: action.payload.businessItem
      }
    case TYPES.GET_ALL_BUSINESS_BY_CATEGORY:
      return {
        ...state,
        businessesByCategory: action.payload.businessesByCategory
      }
    default:
      return state
  }
}

export default businessReducer
