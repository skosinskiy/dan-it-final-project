import * as TYPES from './types'

const initialState = {
  currentUser: null,
  isCurrentUserLoading: true,
  isUsersLoading: false,
  isUserFormDataLoading: false,
  usersListByEmail: [],
  page: 0,
  size: 5,
  totalElements: 0,
  searchParam: ''
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case TYPES.GET_USERS_BY_EMAIL:
      return {
        ...state,
        usersListByEmail: action.payload.content,
        page: action.payload.pageable.pageNumber,
        size: action.payload.pageable.pageSize,
        totalElements: action.payload.totalElements
      }
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
    case TYPES.IS_USERS_LOADING:
      return {
        ...state,
        isUsersLoading: action.payload
      }
    case TYPES.IS_USER_FORM_DATA_LOADING:
      return {
        ...state,
        isUserFormDataLoading: action.payload
      }
    case TYPES.SET_USER_SEARCH_PARAM:
      return {
        ...state,
        searchParam: action.payload
      }
    default:
      return {...state}
  }
}

export default usersReducer
