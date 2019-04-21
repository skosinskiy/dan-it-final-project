import * as TYPES from './types'

const initialState = {
  currentUser: null,
  email: '',
  isAuthenticated: true,
  isCurrentUserLoading: true,
  
  isLoaded: false,
  isLoading: false
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CURRENT_USER_FETCHED:
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    case TYPES.CURRENT_USER_LOADING:
      return {
        ...state,
        isCurrentUserLoading: action.payload
      }
    default:
      return {...state}
  }
}
  
export default usersReducer