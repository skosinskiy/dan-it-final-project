import * as TYPES from './types'

const initialState = {
  places: [],
  placeCategories: [],
  totalElements: 0,
  isPlacesLoading: false,
  isPlaceFormDataLoading: false
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
    case TYPES.IS_PLACES_LOADING:
      return {
        ...state,
        isPlacesLoading: action.payload
      }
    case TYPES.IS_PLACE_FORM_DATA_LOADING:
      return {
        ...state,
        isPlaceFormDataLoading: action.payload
      }
    default:
      return {...state}
  }
}

export default placesReducer
