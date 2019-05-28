import * as TYPES from './types'

const initialState = {
  allBusinessCategories: [],
  allParentBusinessCategories: [],
  isBusinessCategoryDataLoading: false,
  isBusinessCategoryFormDataLoading: false
}

export const businessCategory = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_CATEGORIES:
      return {
        ...state,
        allBusinessCategories: action.payload
      }
    case TYPES.BUSINESS_CATEGORY_DATA_LOADING:
      return {
        ...state,
        isBusinessCategoryDataLoading: action.payload
      }
    case TYPES.BUSINESS_CATEGORY_FORM_DATA_LOADING:
      return {
        ...state,
        isBusinessCategoryFormDataLoading: action.payload
      }
    case TYPES.GET_ALL_PARENT_CATEGORIES:
      return {
        ...state,
        allParentBusinessCategories: action.payload
      }
    default:
      return {...state}
  }
}

export default businessCategory
