import * as TYPES from './types'

const initialState = {
  arePlaceCategoriesLoading: true,
  placeCategories: [],
  editedPlaceCategory: {},
  placeCategoryFormIsLoading: true,
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
        arePlaceCategoriesLoading: action.payload
      }
    case TYPES.UPDATE_EDITED_PLACE_CATEGORY:
      return {
        ...state,
        editedPlaceCategory: action.payload
      }
    case TYPES.PLACE_CATEGORY_FORM_IS_LOADING:
      return {
        ...state,
        placeCategoryFormIsLoading: action.payload
      }
    default:
      return { ...state }
  }
}

export default placeCategories
