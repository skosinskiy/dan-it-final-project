import * as TYPES from './types'

export const getRolesList = (userRoles) => ({
  type: TYPES.GET_ROLES_LIST,
  payload: {userRoles}
})

export const setUserRoles = ({updatedUserList, changedUsersList}) => ({
  type: TYPES.SET_USER_ROLES,
  payload: {updatedUserList, changedUsersList}
})

export const getUsersRequest = () => ({
  type: TYPES.USERS_REQUEST,
})

export const getUsersByEmail = ({users, page, totalElements, email}) => ({
  type: TYPES.GET_USERS_BY_EMAIL,
  payload: {
    users,
    page,
    totalElements,
    email
  }
})

export const getUsersError = error => ({
  type: TYPES.USERS_ERROR,
  payload: error
})

export const currentUserLoading = (isLoading) => ({
  type: TYPES.CURRENT_USER_LOADING,
  payload: isLoading
})

export const currentUserFetched = (currentUser) => ({
  type: TYPES.CURRENT_USER_FETCHED,
  payload: {currentUser}
})

export const changePaginationPage = (page) => ({
  type: TYPES.CHANGE_PAGINATION_PAGE,
  payload: {page}
})
