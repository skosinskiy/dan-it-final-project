import * as TYPES from './types'

export const currentPlaceLoading = () => ({
  type: TYPES.CURRENT_PLACE_LOADING
})

export const currentPlaceById = (place) => ({
  type: TYPES.GET_PLACE_BY_ID,
  payload: {currentPlaceById: place}
})

export const isBusinessesEventsDataLoading = isLoading => ({
  type: TYPES.IS_BUSINESSES_EVENTS_DATA_LOADING,
  payload: isLoading
})

export const getPlaceMessagesByPlaceId = placeMessages => ({
  type: TYPES.GET_PLACE_MESSAGES_BY_PLACE_ID,
  payload: placeMessages
})