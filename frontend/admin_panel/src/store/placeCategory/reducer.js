import * as TYPES from './types'

const initialState = {
  isLoading: true,
  placeCategories: [],
  editedPlaceCategory: {},
  availableBusinessCategories: [],
  availableLayoutItems: [],
}

function placeCategories(state = initialState, action) {
  switch (action.type) {
    case TYPES.UPDATE_PLACE_CATEGORIES:
      return {
        ...state,
        placeCategories: action.payload
      }
    case TYPES.UPDATE_BUSINESS_CATEGORIES:
      return {
        ...state,
        availableBusinessCategories: action.payload
      }
    case TYPES.UPDATE_LAYOUT_ITEMS:
      return {
        ...state,
        availableLayoutItems: action.payload
      }
    case TYPES.ARE_PLACE_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case TYPES.UPDATE_EDITED_PLACE_CATEGORY:
      return {
        ...state,
        editedPlaceCategory: action.payload
      }
    default:
      return { ...state }
  }
}

export default placeCategories
