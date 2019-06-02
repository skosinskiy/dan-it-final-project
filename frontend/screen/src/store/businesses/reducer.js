import * as TYPES from './types'

const initialState = {
  businessList: [],
  businessesByCategory: [],
  isLoaded: false,
  isLoading: false,
  error: null,
  currentCategory: {},
  categoryIsLoading: true
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
    case TYPES.GET_BUSINESSES_BY_AMOUNT:
      return {
        ...state,
        ...action.payload
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
    case TYPES.BUSINESSES_LOADING:
      return {...state, isLoading: action.payload}
    case TYPES.GET_CATEGORY_BY_ID:
      return {...state, currentCategory: action.payload.currentCategory}
    case TYPES.BUSINESS_CATEGORY_LOADED:
      return {...state, categoryIsLoading: action.payload}
    default:
      return state
  }
}

export default businessReducer
