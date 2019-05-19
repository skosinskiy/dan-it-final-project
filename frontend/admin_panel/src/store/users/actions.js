import * as TYPES from './types'

export const getUsersByEmail = (res) => ({
  type: TYPES.GET_USERS_BY_EMAIL,
  payload: res
})

export const isUsersLoading = isLoading => ({
  type: TYPES.IS_USERS_LOADING,
  payload: isLoading
})

export const isUserFormDataLoading = isLoading => ({
  type: TYPES.IS_USER_FORM_DATA_LOADING,
  payload: isLoading
})

export const currentUserLoading = (isLoading) => ({
  type: TYPES.CURRENT_USER_LOADING,
  payload: isLoading
})

export const currentUserFetched = (currentUser) => ({
  type: TYPES.CURRENT_USER_FETCHED,
  payload: {currentUser}
})

export const setSearchParam = (param) => ({
  type: TYPES.SET_USER_SEARCH_PARAM,
  payload: param
})
