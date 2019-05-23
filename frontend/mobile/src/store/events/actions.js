import * as TYPES from './types'

export const getEventsByPlace = (events) => ({
  type: TYPES.GET_EVENTS_BY_PLACE,
  payload: events
})

export const getEventById = (event) => ({
  type: TYPES.GET_EVENT_BY_ID,
  payload: {currentEvent: event}
})

export const eventIsLoading = (isLoading) => ({
  type: TYPES.EVENT_IS_LOADING,
  payload: isLoading
})