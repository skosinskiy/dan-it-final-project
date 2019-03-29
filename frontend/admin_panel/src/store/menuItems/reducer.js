import * as TYPES from './types'

const initialState = {
  availableMenuItemNames: [],
  isMenuItemNamesLoading: true
}

function menuItems (state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_AVAILABLE:
      return {
        ...state,
        availableMenuItemNames: [...action.payload]
      }
    case TYPES.IS_LOADING:
      return {
        ...state,
        isMenuItemNamesLoading: action.payload
      }
    default:
      return {...state}
  }
}

export default menuItems
