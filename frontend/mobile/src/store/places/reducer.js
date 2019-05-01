import * as TYPES from './types'

const initialState = {
  currentPlaceById: {},
  isLoaded: false
}

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_PLACE_BY_ID:
      return {
        ...state,
        currentPlaceById: action.payload.currentPlaceById,
        isLoaded: true
      }
    case TYPES.CURRENT_PLACE_LOADING:
      return {
        ...state,
        isLoaded: false
      }
    default:
      return {...state}
  }
}
  
export default placeReducer