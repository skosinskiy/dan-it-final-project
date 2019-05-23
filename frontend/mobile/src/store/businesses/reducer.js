import * as TYPES from './types'

const initialState = {
  businessesByCategory: [],
  currentBusiness: {},
  businessIsLoading: true
}

const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESSES_BY_CATEGORY:
      return {...state, businessesByCategory: action.payload.businesses}
    case TYPES.GET_BUSINESS_BY_ID:
      return {...state, currentBusiness: action.payload.currentBusiness}
    case TYPES.BUSINESS_IS_LOADING:
      return {...state, businessIsLoading: action.payload}
    default:
      return {...state}
  }
}

export default businessesReducer