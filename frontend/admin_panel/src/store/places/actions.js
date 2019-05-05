import * as TYPES from './types'

export const getAllPlaces = (res) => ({
  type: TYPES.GET_ALL_PLACES,
  payload: res
})

export const getPlacesCategories = (placeCategories) => ({
  type: TYPES.GET_PLACES_CATEGORIES,
  payload: {placeCategories}
})


