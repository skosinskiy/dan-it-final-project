import * as TYPES from './types'

const initialState = {
  eventItem: {},
  eventsByPlace: [],
  isLoaded: false,
  isLoading: false,
  error: null,
  eventsByPlaceIsLoading: true
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_EVENTS:
      return {
        ...state,
        eventsList: action.payload.eventList
      }
    case TYPES.GET_ALL_EVENT_BY_ID:
      return {
        ...state,
        eventItem: action.payload.eventItem
      }
    case TYPES.GET_ALL_EVENTS_BY_PLACE:
      return {...state, eventsByPlace: action.payload.eventsByPlace}
    case TYPES.EVENTS_BY_PLACE_LOADIND:
      return {...state, eventsByPlaceIsLoading: action.payload}
    default:
      return state
  }
}

export default eventReducer
