import * as TYPES from './types'

const initialState = {
  isLoading: true,
  placeCategories: [],
  deletedIds: []
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
    case TYPES.UPDATE_DETETED_PLACE_CATEGORY_IDS:
      return {
        ...state,
        deletedIds: action.payload
      }
    default:
      return { ...state }
  }
}

export default placeCategories
