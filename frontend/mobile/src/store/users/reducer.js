import * as TYPES from './types'

const initialState = {
  currentUser: null,
  email: '',
  isAuthenticated: true,
  isCurrentUserLoading: true,
  usersListByPLace: [],
  usersListByPLaceIsLoading: true
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
    case TYPES.GET_USERS_BY_PLACE:
      return {
        ...state,
        usersListByPLace: action.payload
      }
    case TYPES.USERS_BY_PLACE_LOADING:
      return {
        ...state,
        usersListByPLaceIsLoading: action.payload
      }
    default:
      return {...state}
  }
}

export default usersReducer