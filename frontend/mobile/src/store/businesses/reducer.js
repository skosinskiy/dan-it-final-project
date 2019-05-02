import * as TYPES from './types'

const initialState = {
  businessesByCategory: []
}

const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESSES_BY_CATEGORY:
      return {...state, businessesByCategory: action.payload.businesses}
    default:
      return {...state}
  }
}

export default businessesReducer