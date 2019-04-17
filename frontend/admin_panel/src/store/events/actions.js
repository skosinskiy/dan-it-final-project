import * as TYPES from './types'

export const getAllEvents = ({eventList}) => ({
  type: TYPES.GET_ALL_EVENTS,
  payload: {
    eventList
    // page,
    // totalElements,
  }
})

export const getEventsByPlaceID = ({eventList}) => ({
  type: TYPES.GET_EVENTS_BY_PLACE_ID,
  payload: {
    eventList
    // page,
    // totalElements,
  }
})

export const getEventsError = error => ({
  type: TYPES.EVENT_ERROR,
  payload: error
})
