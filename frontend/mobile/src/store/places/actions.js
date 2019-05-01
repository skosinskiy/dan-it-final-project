import * as TYPES from './types'

export const currentPlaceLoading = () => ({
  type: TYPES.CURRENT_PLACE_LOADING
})
  
export const currentPlaceById = (place) => ({
  type: TYPES.GET_PLACE_BY_ID,
  payload: {currentPlaceById: place}
})