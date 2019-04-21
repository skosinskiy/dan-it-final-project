import * as TYPES from './types'

export const currentUserLoading = (isLoading) => ({
  type: TYPES.CURRENT_USER_LOADING,
  payload: isLoading
})
  
export const currentUserFetched = (currentUser) => ({
  type: TYPES.CURRENT_USER_FETCHED,
  payload: {currentUser}
})