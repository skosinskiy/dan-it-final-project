import * as TYPES from './types'

export const getAllPlaces = (places) => ({
  type: TYPES.GET_ALL_PLACES,
  payload: {places}
})

export const getPlacesCategories = (placeCategories) => ({
  type: TYPES.GET_PLACES_CATEGORIES,
  payload: {placeCategories}
})


