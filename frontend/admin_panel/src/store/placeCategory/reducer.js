import * as TYPES from './types'

const initialState = {
  placeCategories: [],
  layoutItems: [],
  arePlaceCategoriesLoading: false,
  isPlaceCategoriesFormDataLoading: false
}

const placeCategories = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_PLACE_CATEGORIES:
      return {
        ...state,
        placeCategories: action.payload
      }
    case TYPES.ARE_PLACE_CATEGORIES_LOADING:
      return {
        ...state,
        arePlaceCategoriesLoading: action.payload
      }
    case TYPES.IS_PLACE_CATEGORIES_FORM_DATA_LOADING:
      return {
        ...state,
        isPlaceCategoriesFormDataLoading: action.payload
      }
    case TYPES.GET_LAYOUT_ITEMS:
      return {
        ...state,
        layoutItems: action.payload
      }
    default:
      return { ...state }
  }
}

export default placeCategories
