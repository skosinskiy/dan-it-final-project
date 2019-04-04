import * as TYPES from './types'

const initialState = {
  businessList: [],

  businessListByTitle: [],
  changedBusinessList: [],
  page: 0,
  totalElements: 0,

  isLoaded: false,
  isLoading: false,
  error: null
}

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESSES_BY_PLACE_ID:
      return {
        ...state,
        businessList: action.payload.businessList,
        totalElements: action.payload.businessList.length
      }
    case TYPES.GET_ALL_BUSINESSES:
      return {
        ...state,
        businessList: action.payload.businessList,
        totalElements: action.payload.businessList.length
      }
    default:
      return state
  }
}

export default businessReducer
