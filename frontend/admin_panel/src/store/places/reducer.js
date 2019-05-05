import * as TYPES from './types'

const initialState = {
  places: [],
  placeCategories: [],
  totalElements: 0
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_PLACES:
      return {
        ...state,
        places: action.payload.content,
        totalElements: action.payload.totalElements
      }
    case TYPES.GET_PLACES_CATEGORIES:
      return {
        ...state,
        placeCategories: [...action.payload.placeCategories]
      }
    default:
      return {...state}
  }
}

export default placesReducer
