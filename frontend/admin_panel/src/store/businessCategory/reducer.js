import * as TYPES from './types'

const initialState = {
  allBusinessCategories: []
}

export const businessCategory = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_CATEGORIES:
      return {
        ...state,
        allBusinessCategories: action.payload
      }
    default:
      return {...state}
  }
}

export default businessCategory
