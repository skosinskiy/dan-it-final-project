import * as TYPES from './types'

const initialState = {
  allEventCategories: []
}

export const EventCategory = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_CATEGORIES:
      return {
        ...state,
        allEventCategories: action.payload
      }
    default:
      return {...state}
  }
}

export default EventCategory
