import * as TYPES from './types'

export const getEventsRequest = () => ({
  type: TYPES.EVENT_REQUEST
})

export const getAllEvents = ({eventList}) => ({
  type: TYPES.GET_ALL_EVENTS,
  payload: {
    eventList
    // page,
    // totalElements,
  }
})

export const getEventByID = ({eventItem}) => {
  return {
    type: TYPES.GET_ALL_EVENT_BY_ID,
    payload: {
      eventItem
    }
  }
}

export const getEventError = error => ({
  type: TYPES.EVENT_ERROR,
  payload: error
})

export const getEvantsByPlace = events => ({
  type: TYPES.GET_ALL_EVENTS_BY_PLACE,
  payload: {eventsByPlace: events}
})

export const eventsByPlaceIsLoading = isLoading => ({
  type: TYPES.EVENTS_BY_PLACE_LOADIND,
  payload: isLoading
})
