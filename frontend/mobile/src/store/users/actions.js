import * as TYPES from './types'

export const currentUserLoading = (isLoading) => ({
  type: TYPES.CURRENT_USER_LOADING,
  payload: isLoading
})
  
export const currentUserFetched = (currentUser) => ({
  type: TYPES.CURRENT_USER_FETCHED,
  payload: {currentUser}
})

export const usersListByPlaceLoading = (usersListByPLaceIsLoading) => ({
  type: TYPES.USERS_BY_PLACE_LOADING,
  payload: usersListByPLaceIsLoading
})

export const getUsersByPlace = (usersListByPLace) => ({
  type: TYPES.GET_USERS_BY_PLACE,
  payload: usersListByPLace
})