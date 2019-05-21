import * as TYPES from './types'

const initialState = {
  allEventCategories: [],
  isEventCategoriesLoading: false
}

export const EventCategory = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_CATEGORIES:
      return {
        ...state,
        allEventCategories: action.payload
      }
    case TYPES.EVENT_CATEGORIES_IS_LOADING:
      return {
        ...state,
        isEventCategoriesLoading: action.payload
      }
    default:
      return {...state}
  }
}

export default EventCategory
