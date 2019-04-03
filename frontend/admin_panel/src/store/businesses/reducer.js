import * as TYPES from './types'

const initialState = {
  businesses: null,

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
        businesses: action.payload.businesses,
        totalElements: action.payload.businesses.length
      }
    default:
      return state
  }
}

export default businessReducer
