import * as TYPES from './types'

const initialState = {
  currentUser: null,
  email: '',
  isAuthenticated: true,
  isCurrentUserLoading: true,

  usersListByEmail: [],
  changedUsersList: [],
  page: 0,
  totalElements: 0,
  userRoles: [],

  isLoaded: false,
  isLoading: false,
  error: null
}

const usersReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case TYPES.GET_ROLES_LIST:
      return {
        ...state,
        userRoles: action.payload.userRoles
      }
    case TYPES.GET_USERS_BY_EMAIL:
      return {
        ...state,
        usersListByEmail: action.payload.users,
        page: action.payload.page,
        totalElements: action.payload.totalElements,
        email: action.payload.email
      }
    case TYPES.CHANGE_PAGINATION_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
    case TYPES.SET_USER_ROLES:
      return {
        ...state,
        usersListByEmail: action.payload.updatedUserList,
        changedUsersList: action.payload.changedUsersList
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
    default:
      return {...state}
  }
}

export default usersReducer
