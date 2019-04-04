import * as TYPES from './types'

const initialState = {
  isLoading: true,
  placeCategories: [],
}

function placeCategories(state = initialState, action) {
  switch (action.type) {
    case TYPES.UPDATE_PLACE_CATEGORIES:
      return {
        ...state,
        placeCategories: action.payload
      }
    case TYPES.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return { ...state }
  }
}

export default placeCategories