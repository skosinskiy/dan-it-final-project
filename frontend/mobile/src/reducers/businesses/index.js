import * as TYPES from '../../actions/businesses/types'

const initialState = {
  businessesByPlace: [],
  defaultBusinesses: []
}

const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESSES_BY_PLACE:
      return {...state, businessesByPlace: action.payload.businesses}
    default:
      return {...state}
  }
}

export default businessesReducer