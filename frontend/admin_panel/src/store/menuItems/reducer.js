import * as TYPES from './types'

const initialState = {
  names: [],
  isLoading: true
}

function menuItems (state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_AVAILABLE:
      return {
        ...state,
        names: action.payload
      }
    case TYPES.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return {...state}
  }
}

export default menuItems
