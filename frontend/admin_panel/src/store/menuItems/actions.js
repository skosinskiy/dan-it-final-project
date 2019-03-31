import * as TYPES from './types'

export const fetchAvailable = (buildings) => ({
  type: TYPES.FETCH_AVAILABLE,
  payload: {buildings}
})

export const isLoading = (buildingCategories) => ({
  type: TYPES.IS_LOADING,
  payload: {buildingCategories}
})
