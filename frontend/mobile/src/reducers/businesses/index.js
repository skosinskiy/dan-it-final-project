import * as TYPES from '../../actions/businesses/types'

const initialState = {
  businessesByCategory: []
}

const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESSES_BY_CATEGORY:
      return {...state, initialState: [...action.payload.businesses]}
    default:
      return {...state}
  }
}

export default businessesReducer