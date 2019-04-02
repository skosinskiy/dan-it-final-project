import * as TYPES from './types'

export const isLoading = isLoading => ({
  type: TYPES.IS_LOADING,
  payload: isLoading
})

export const createData = placePategories => ({
  type: TYPES.CREATE_DATA,
  payload: placePategories
})

export const updateSelected = placePategories => ({
  type: TYPES.UPDATE_SELECTED,
  payload: placePategories
})