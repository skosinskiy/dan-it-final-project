import * as TYPES from './types'

export const fetchAvailable = (menuItems) => ({
  type: TYPES.FETCH_AVAILABLE,
  payload: menuItems
})

export const isLoading = isLoading => ({
  type: TYPES.IS_LOADING,
  payload: isLoading
})