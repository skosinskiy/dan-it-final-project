import * as TYPES from './types'

export const getUsersByEmail = ({users, page, totalElements, email}) => ({
  type: TYPES.GET_USERS_BY_EMAIL,
  payload: {
    users,
    page,
    totalElements,
    email
  }
})

export const isUsersLoading = isLoading => ({
  type: TYPES.IS_USERS_LOADING,
  payload: isLoading
})

export const isUserFormDataLoading = isLoading => ({
  type: TYPES.IS_USER_FORM_DATA_LOADING,
  payload: isLoading
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
