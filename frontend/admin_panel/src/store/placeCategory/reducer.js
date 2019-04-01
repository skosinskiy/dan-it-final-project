import * as TYPES from './types'

const initialState = {
  isLoading: true,
  order: 'asc',
  orderBy: 'name',
  selected: [],
  placeCategories: [],
  page: 0,
  rowsPerPage: 5,
  changedPlaceCategoriesIds: []
}

function placeCategories(state = initialState, action) {
  switch (action.type) {
    case TYPES.CREATE_DATA:
      return {
        ...state,
        placeCategories: [...action.payload]
      }
    case TYPES.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case TYPES.UPDATE_SELECTED:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return { ...state }
  }
}

export default placeCategories